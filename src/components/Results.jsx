import { useEffect, useRef } from 'react'
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js'
import { DIMS, getDimColor } from '../data.js'
import './Results.css'

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

export default function Results({ scores, team, account, onNext }) {
  const chartRef = useRef(null)
  const instanceRef = useRef(null)

  const vals = Object.values(scores)
  const avg = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
  const crit = vals.filter(v => v <= 2).length
  const readiness = avg >= 4 ? 'High' : avg >= 3 ? 'Moderate' : 'Low'
  const risk = crit >= 3 ? 'High' : crit >= 1 ? 'Medium' : 'Low'
  const riskColor = risk === 'High' ? 'var(--red)' : risk === 'Medium' ? 'var(--amber)' : 'var(--green)'

  const sorted = [...DIMS].sort((a, b) => scores[a.id] - scores[b.id]).slice(0, 3)

  useEffect(() => {
    if (!chartRef.current) return
    if (instanceRef.current) { instanceRef.current.destroy() }
    instanceRef.current = new Chart(chartRef.current, {
      type: 'radar',
      data: {
        labels: DIMS.map(d => d.label),
        datasets: [
          {
            label: 'Current',
            data: DIMS.map(d => scores[d.id]),
            backgroundColor: 'rgba(24,95,165,0.12)',
            borderColor: '#185FA5',
            borderWidth: 2,
            pointBackgroundColor: '#185FA5',
            pointRadius: 4,
          },
          {
            label: 'Target',
            data: [5, 5, 5, 5, 5],
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(180,178,169,0.4)',
            borderWidth: 1,
            borderDash: [5, 5],
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: {
          r: {
            min: 0, max: 5,
            ticks: { stepSize: 1, font: { size: 11 }, color: '#999', backdropColor: 'transparent' },
            pointLabels: { font: { size: 12 }, color: '#444' },
            grid: { color: 'rgba(0,0,0,0.07)' },
            angleLines: { color: 'rgba(0,0,0,0.07)' },
          },
        },
      },
    })
    return () => { if (instanceRef.current) instanceRef.current.destroy() }
  }, [scores])

  return (
    <div className="results">
      <div className="page-header">
        <h1 className="page-title">Results</h1>
        {account && team && <p className="page-subtitle">{account} — {team} team</p>}
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Overall score</div>
          <div className="metric-value">{avg}<span className="metric-unit">/5</span></div>
          <div className="metric-sub">Context readiness</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">AI readiness</div>
          <div className="metric-value">{readiness}</div>
          <div className="metric-sub">Across all dimensions</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Critical gaps</div>
          <div className="metric-value">{crit}</div>
          <div className="metric-sub">Scores of 1–2</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Deployment risk</div>
          <div className="metric-value" style={{ color: riskColor }}>{risk}</div>
          <div className="metric-sub">Without context layer</div>
        </div>
      </div>

      <div className="results-body">
        <div className="results-left">
          <div className="section-label">Score by dimension</div>
          {DIMS.map(d => {
            const col = getDimColor(scores[d.id])
            const pct = Math.round((scores[d.id] - 1) / 4 * 100)
            return (
              <div key={d.id} className="bar-row">
                <span className="bar-label">{d.label}</span>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${pct}%`, background: col.bar }} />
                </div>
                <span className="bar-num">{scores[d.id]}/5</span>
              </div>
            )
          })}

          <div className="section-label" style={{ marginTop: '1.5rem' }}>Priority recommendations</div>
          {sorted.map((d, i) => {
            const cls = i === 0 ? 'crit' : i === 1 ? 'high' : 'med'
            const lbl = i === 0 ? 'Critical' : i === 1 ? 'High priority' : 'Medium priority'
            const action = scores[d.id] <= 2
              ? `Immediate action needed. Without ${d.label.toLowerCase()}, AI outputs cannot be trusted or audited. Start with ${d.caps[0]} and ${d.caps[1]}.`
              : `Meaningful gap. Closing ${d.label.toLowerCase()} will directly improve AI reliability. Focus on ${d.caps[0]} first.`
            return (
              <div key={d.id} className={`reco-card reco-${cls}`}>
                <span className={`reco-badge badge-${cls}`}>{lbl}</span>
                <div className="reco-title">{d.label}</div>
                <p className="reco-body">{action}</p>
                <div className="caps-row">
                  {d.caps.map(c => <span key={c} className="cap-pill">{c}</span>)}
                </div>
              </div>
            )
          })}
        </div>

        <div className="results-right">
          <div className="section-label">Radar view</div>
          <div className="radar-wrap">
            <canvas ref={chartRef} aria-label="Radar chart of AI readiness scores" role="img">
              AI readiness scores across five dimensions.
            </canvas>
          </div>
          <div className="radar-legend">
            <span className="legend-item"><span className="legend-dot" style={{ background: '#185FA5' }} />Current maturity</span>
            <span className="legend-item"><span className="legend-dot dashed" />Target (5)</span>
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={onNext}>View Context Layer →</button>
    </div>
  )
}
