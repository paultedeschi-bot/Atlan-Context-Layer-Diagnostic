import { DIMS, getDimColor } from '../data.js'
import './Diagnostic.css'

export default function Diagnostic({ scores, setScores, team, onNext }) {
  function update(id, val) {
    setScores(s => ({ ...s, [id]: val }))
  }

  return (
    <div className="diagnostic">
      <div className="page-header">
        <h1 className="page-title">AI Readiness Diagnostic</h1>
        <p className="page-subtitle">Score each dimension 1–5 based on your discovery conversation. The Context Layer view updates in real time.</p>
      </div>

      <div className="dims-list">
        {DIMS.map(dim => {
          const sc = scores[dim.id]
          const col = getDimColor(sc)
          const pct = Math.round((sc - 1) / 4 * 100)
          const insight = sc <= 2 ? dim.low : sc <= 3 ? dim.mid : dim.high
          const teamNote = team && dim.tc[team]

          return (
            <div key={dim.id} className="dim-card">
              <div className="dim-card-header">
                <div>
                  <div className="dim-title">{dim.label}</div>
                  <div className="dim-desc">{dim.desc}</div>
                </div>
                <div className="dim-score-badge" style={{ color: col.text, background: col.bg, borderColor: col.border }}>
                  {sc}/5
                </div>
              </div>

              <div className="slider-wrap">
                <input
                  type="range" min="1" max="5" step="1" value={sc}
                  onChange={e => update(dim.id, +e.target.value)}
                  style={{ '--fill': col.bar }}
                />
                <div className="slider-labels">
                  <span>1 — not in place</span>
                  <span>3 — developing</span>
                  <span>5 — mature</span>
                </div>
              </div>

              <div className="maturity-row">
                <div className="maturity-bar-bg">
                  <div className="maturity-bar-fill" style={{ width: `${pct}%`, background: col.bar }} />
                </div>
                <span className="maturity-label" style={{ color: col.text }}>{col.label}</span>
              </div>

              <div className="dim-atlan">
                <div className="atlan-label">Atlan Context Layer addresses this via</div>
                <div className="caps-row">
                  {dim.caps.map(c => <span key={c} className="cap-pill">{c}</span>)}
                </div>
                <p className="dim-insight">{insight}</p>
                {teamNote && (
                  <div className="team-note" style={{ background: col.bg, borderColor: col.border, color: col.text }}>
                    {teamNote}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button className="btn-primary" onClick={onNext}>View results →</button>
    </div>
  )
}
