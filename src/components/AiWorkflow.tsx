import './AiWorkflow.css'

const benefits = [
  {
    value: '01',
    title: 'Joy, back in the loop',
    copy: 'AI has made coding feel playful and exploratory again. It lowers the friction between an idea and a working prototype, which keeps momentum high.',
  },
  {
    value: '02',
    title: 'More shipped per session',
    copy: 'I use it to move faster through scaffolding, refactors, test cases, debugging paths, and the repetitive edges that usually slow product work down.',
  },
  {
    value: '03',
    title: 'Gaps close faster',
    copy: 'When I hit an unfamiliar API, pattern, or domain, AI gives me a map. I still do the reading, but I get to understanding much quicker.',
  },
]

const rules = [
  'Read every meaningful line before it lands.',
  'Understand the tradeoffs, not just the diff.',
  'Use AI to reason through problems, not outsource judgment.',
  'Keep fundamentals sharp by explaining the solution back to myself.',
]

const tools = [
  'Codex + GPT-5.6 — implementation',
  'Claude Code + Fable 5 — planning & review',
  'Cursor',
]

export function AiWorkflow() {
  return (
    <section id="ai-workflow">
      <div className="page-wrapper">
        <div className="section-label reveal">02 — AI Workflow</div>
        <div className="ai-layout">
          <div className="ai-intro reveal reveal-delay-1">
            <h2 className="section-title">AI as leverage, not autopilot.</h2>
            <p>
              I treat AI as a serious development tool: something that expands my reach,
              speeds up exploration, and helps me fill knowledge gaps without replacing the
              craft of engineering.
            </p>
          </div>

          <div className="ai-console reveal reveal-delay-2" aria-label="Current AI tools">
            <div className="ai-console-top">
              <span />
              <span />
              <span />
            </div>
            <div className="ai-console-body">
              <div className="ai-console-line">
                <span className="ai-prompt">&gt;</span>
                <span>current_toolchain</span>
              </div>
              <div className="ai-tool-list">
                {tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              <div className="ai-console-note">
                Guided by taste, review, and an engineer still doing the thinking.
              </div>
            </div>
          </div>
        </div>

        <div className="ai-benefits">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className={`ai-benefit reveal reveal-delay-${Math.min(index + 1, 4)}`}
            >
              <div className="ai-benefit-num">{benefit.value}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>

        <div className="ai-rules reveal reveal-delay-2">
          <div>
            <div className="ai-rules-label">The guardrails</div>
            <h3>Keeping the coding edge sharp</h3>
          </div>
          <ul>
            {rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
