import './Background.css'

export function Background() {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-field ambient-field--top" data-parallax="0.04" />
      <div className="ambient-field ambient-field--bottom" data-parallax="0.06" />
    </div>
  )
}
