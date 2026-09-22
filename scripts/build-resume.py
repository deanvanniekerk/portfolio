"""Render the editable Markdown resume to PDF. Requires reportlab.

Usage: python3 scripts/build-resume.py
Set RESUME_FONT_DIR to a directory containing LiberationSans-{Regular,Bold,Italic}.ttf
if the bundled Codex font directory is unavailable.
"""
from pathlib import Path
import os
import re
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Flowable

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/pdf'
FONT_DIR = Path(os.environ.get('RESUME_FONT_DIR', str(Path.home() / '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdfjs-dist/standard_fonts')))
for name, suffix in [('Resume', 'Regular'), ('Resume-Bold', 'Bold'), ('Resume-Italic', 'Italic')]:
    pdfmetrics.registerFont(TTFont(name, str(FONT_DIR / f'LiberationSans-{suffix}.ttf')))
pdfmetrics.registerFontFamily('Resume', normal='Resume', bold='Resume-Bold', italic='Resume-Italic', boldItalic='Resume-Bold')
INK = colors.HexColor('#202b26')
MUTED = colors.HexColor('#506057')
GREEN = colors.HexColor('#245b40')
DARK = colors.HexColor('#142e23')
MINT = colors.HexColor('#b2e2bf')
LINE = colors.HexColor('#cbd9cf')
styles = {
    'name': ParagraphStyle('name', fontName='Resume-Bold', fontSize=32, leading=35, textColor=colors.white, spaceAfter=5),
    'title': ParagraphStyle('title', fontName='Resume', fontSize=14, leading=18, textColor=MINT, spaceAfter=12),
    'contact': ParagraphStyle('contact', fontName='Resume', fontSize=9, leading=13, textColor=colors.HexColor('#e0eae3'), spaceAfter=3),
    'body': ParagraphStyle('body', fontName='Resume', fontSize=10.6, leading=14.6, textColor=INK, spaceAfter=6),
    'bullet': ParagraphStyle('bullet', fontName='Resume', fontSize=10.6, leading=14.6, textColor=INK, leftIndent=12, bulletIndent=0, spaceAfter=6),
    'role': ParagraphStyle('role', fontName='Resume', fontSize=10.4, leading=14, textColor=MUTED),
    'skills': ParagraphStyle('skills', fontName='Resume', fontSize=10.2, leading=14, textColor=INK, spaceAfter=7),
}


def inline(text, link_color='#245b40'):
    text = escape(text)
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', rf'<a href="\2" color="{link_color}">\1</a>', text)
    return re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', text)


class SectionTitle(Flowable):
    """A compact section label with a rule that guides scanning."""
    def __init__(self, title):
        super().__init__()
        self.title = title.upper()
        self.height = 16
        self.spaceBefore = 15
        self.spaceAfter = 7
        self.keepWithNext = True

    def draw(self):
        c = self.canv
        c.setFillColor(GREEN)
        text = c.beginText(0, 4)
        text.setFont('Resume-Bold', 9)
        text.setCharSpace(1.2)
        text.textOut(self.title)
        c.drawText(text)
        start = pdfmetrics.stringWidth(self.title, 'Resume-Bold', 9) + len(self.title) * 1.2 + 15
        c.setStrokeColor(LINE)
        c.setLineWidth(.7)
        c.line(start, 7, self.width, 7)

    def wrap(self, width, height):
        self.width = width
        return width, self.height


class RoleHeading(Flowable):
    """Keep employer, role, and dates together, with dates on the right."""
    def __init__(self, title, meta):
        super().__init__()
        self.company, self.role = title.split(' | ', 1)
        self.dates, _, self.location = meta.partition(' | ')
        self.height = 39
        self.spaceBefore = 7
        self.spaceAfter = 4
        self.keepWithNext = True

    def wrap(self, width, height):
        self.width = width
        return width, self.height

    def draw(self):
        c = self.canv
        c.setFillColor(INK)
        c.setFont('Resume-Bold', 14)
        c.drawString(0, 25, self.company)
        role = self.role
        if self.location:
            role += '  |  ' + self.location
        p = Paragraph(inline(role), styles['role'])
        p.wrap(self.width, 30)
        p.drawOn(c, 0, 5)
        c.setFillColor(MUTED)
        c.setFont('Resume', 9.2)
        c.drawRightString(self.width, 26, self.dates)


class ContinuedHeader(Flowable):
    def __init__(self):
        super().__init__()
        self.height = 30

    def draw(self):
        c = self.canv
        c.setFont('Resume-Bold', 15)
        c.setFillColor(colors.white)
        c.drawString(0, 15, 'Dean van Niekerk')
        c.setFont('Resume', 9.5)
        c.setFillColor(MINT)
        c.drawRightString(self._available_width, 17, 'Senior Full-Stack Engineer')

    def wrap(self, width, height):
        self._available_width = width
        return width, self.height


def page_frame(canvas, doc):
    canvas.saveState()
    width, height = A4
    band_height = 153 if doc.page == 1 else 66
    canvas.setFillColor(DARK)
    canvas.rect(0, height - band_height, width, band_height, fill=1, stroke=0)
    canvas.setFillColor(MINT)
    canvas.rect(0, height - 4, width, 4, fill=1, stroke=0)
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(.5)
    canvas.line(43, 39, width - 43, 39)
    canvas.setFillColor(MUTED)
    canvas.setFont('Resume', 8.5)
    canvas.drawString(43, 25, 'Dean van Niekerk  /  vanniekerk.online')
    canvas.drawRightString(width - 43, 25, f'{doc.page:02d}')
    canvas.restoreState()


lines = [line.strip() for line in (OUT / 'Dean-van-Niekerk-Resume.md').read_text().splitlines() if line.strip()]
story = []
section = ''
i = 0
while i < len(lines):
    line = lines[i]
    if line.startswith('# '):
        story.append(Paragraph(inline(line[2:]), styles['name']))
        story.append(Paragraph(inline(lines[i + 1]), styles['title']))
        for contact in lines[i + 2:i + 4]:
            story.append(Paragraph(inline(contact, '#e0eae3'), styles['contact']))
        story.append(Spacer(1, 14))
        i += 4
        continue
    if line == '<!-- pagebreak -->':
        story.extend([PageBreak(), ContinuedHeader()])
    elif line.startswith('## '):
        section = line[3:]
        story.append(SectionTitle(section))
    elif line.startswith('### '):
        story.append(RoleHeading(line[4:], lines[i + 1]))
        i += 1
    elif line.startswith('- '):
        story.append(Paragraph(inline(line[2:]), styles['bullet'], bulletText='-'))
    else:
        story.append(Paragraph(inline(line), styles['skills' if section == 'Technical skills' else 'body']))
    i += 1

output = OUT / 'Dean-van-Niekerk-Senior-Full-Stack-Engineer.pdf'
doc = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=43, leftMargin=43, topMargin=26, bottomMargin=52,
                        title='Dean van Niekerk - Senior Full-Stack Engineer', author='Dean van Niekerk')
doc.build(story, onFirstPage=page_frame, onLaterPages=page_frame)
print(output)
