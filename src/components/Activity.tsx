import { useEffect, useRef, useState } from 'react'
import { useGitHub } from '../hooks/useGitHub'
import './Activity.css'

const CONTRIB_COLORS = [
  '#0d1117',
  'oklch(35% 0.18 240)',
  'oklch(50% 0.22 240)',
  'oklch(65% 0.25 240)',
  'oklch(78% 0.2 195)',
]

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active || target === 0) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return value
}

export function Activity() {
  const github = useGitHub()

  const sectionRef = useRef<HTMLElement>(null)
  const [statsActive, setStatsActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const countActive = statsActive && !github.loading

  const commits = useCountUp(github.commits, countActive)
  const yearsOnGitHub = useCountUp(github.yearsOnGitHub, countActive)
  const followers = useCountUp(github.followers, countActive)

  // Hook returns exactly 364 days (52 weeks) oldest → newest
  const weeks: Array<Array<{ level: number }>> = []
  if (github.contributions.length > 0) {
    for (let w = 0; w < 52; w++) {
      weeks.push(
        github.contributions.slice(w * 7, w * 7 + 7).map((d) => ({ level: d.level }))
      )
    }
  }

  return (
    <section id="activity" ref={sectionRef}>
      <div className="page-wrapper">
        <div className="section-label reveal">Activity</div>
        <h2 className="section-title reveal reveal-delay-1">GitHub Activity</h2>

        <div className="github-stats-row reveal">
          <div className="github-stat">
            <div className="github-stat-num">
              {github.loading ? <span className="stat-loading">—</span> : commits}
            </div>
            <div className="github-stat-label">Commits</div>
          </div>
          <div className="github-stat">
            <div className="github-stat-num">
              {github.loading ? <span className="stat-loading">—</span> : yearsOnGitHub}
            </div>
            <div className="github-stat-label">Years on GitHub</div>
          </div>
          <div className="github-stat">
            <div className="github-stat-num">
              {github.loading ? <span className="stat-loading">—</span> : followers}
            </div>
            <div className="github-stat-label">Followers</div>
          </div>
        </div>

        <div className="contrib-grid reveal reveal-delay-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="contrib-week">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="contrib-day"
                  style={{
                    background: CONTRIB_COLORS[day.level] ?? CONTRIB_COLORS[0],
                    boxShadow: day.level > 2 ? `0 0 4px ${CONTRIB_COLORS[day.level]}` : 'none',
                  }}
                />
              ))}
            </div>
          ))}
          {weeks.length === 0 &&
            Array.from({ length: 52 }, (_, wi) => (
              <div key={wi} className="contrib-week">
                {Array.from({ length: 7 }, (_, di) => (
                  <div key={di} className="contrib-day contrib-day--skeleton" />
                ))}
              </div>
            ))}
        </div>

        <div className="contrib-legend reveal reveal-delay-2">
          <span>Less</span>
          <div className="legend-items">
            {CONTRIB_COLORS.map((c) => (
              <div key={c} className="legend-day" style={{ background: c }} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </section>
  )
}
