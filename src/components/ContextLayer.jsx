import { useState } from 'react'
import { GRAPHS, DIMS, getGraphStatus, getDimColor } from '../data.js'
import './ContextLayer.css'

const AI_AGENTS = [
  { label: 'Vertical agents', examples: 'Abridge, Sierra, Writer' },
  { label: 'Agentic platforms', examples: 'LangGraph, Agentforce' },
  { label: 'General purpose AI', examples: 'Claude, ChatGPT, Codex' },
  { label: 'Knowledge workers', examples: 'Glean, Writer' },
]

const BIZ_SYSTEMS = [
  { label: 'Systems of record', examples: 'Salesforce, SAP, Workday' },
  { label: 'Systems of semantics', examples: 'Tableau, PowerBI, Sigma' },
  { label: 'Systems of data', examples: 'Snowflake, Databricks, BigQuery' },
  { label: 'Systems of knowledge', examples: 'Confluence, Slack, Drive' },
]

function statusColors(st) {
  if (st === 'crit') return { bg: 'rgba(226,75,74,0.16)', border: 'rgba(226,75,74,0.55)', badge: '#F09595', badgeBg: 'rgba(0,0,0,0.25)', label: 'Critical gap', callout: { bg: '#FCEBEB', border: '#E24B4A', text: '#791F1F' } }
  if (st === 'warn') return { bg: 'rgba(239,159,39,0.14)', border: 'rgba(186,117,23,0.5)', badge: '#FAC775', badgeBg: 'rgba(0,0,0,0.25)', label: 'Needs attention', callout: { bg: '#FAEEDA', border: '#BA7517', text: '#633806' } }
  return { bg: 'rgba(99,153,34,0.14)', border: 'rgba(99,153,34,0.5)', badge: '#97C459', badgeBg: 'rgba(0,0,0,0.25)', label: 'Active', callout: { bg: '#EAF3DE', border: '#3B6D11', text: '#27500A' } }
}

export default function ContextLayer({ scores, team, account }) {
  const [expanded, setExpanded] = useState(null)

  function toggle(id) {
    setExpanded(e => e === id ? null : id)
  }

  const critGraphs = GRAPHS.filter(g => getGraphStatus(g, scores) === 'crit').map(g => g.name)
  const warnGraphs = GRAPHS.filter(g => getGraphStatus(g, scores) === 'warn').map(g => g.name)

  let summaryText = ''
  if (critGraphs.length) summaryText += `Critical gaps in ${critGraphs.join(' and ')} — AI operating without this context is at significant risk. `
  if (warnGraphs.length) summaryText += `${warnGraphs.join(' and ')} ${warnGraphs.length > 1 ? 'need' : 'needs'} attention before AI can operate with full confidence.`
  if (!critGraphs.length && !warnGraphs.length) summaryText = 'All four Context Layer graphs are well-established — AI systems have the context they need to operate reliably.'

  const summaryType = critGraphs.length ? 'crit' : warnGraphs.length ? 'warn' : 'ok'

  return (
    <div className="context-layer">
      <div className="page-header">
        <h1 className="page-title">Context Layer view</h1>
        <p className="page-subtitle">Based on your scores, here is where gaps appear across Atlan's four Context Layer graphs. Click any graph to expand.</p>
      </div>

      <div className="eco-wrap">
        <div className="eco-layer-label">Interfaces & AI agents</div>
        <div className="eco-agents-grid">
          {AI_AGENTS.map(a => (
            <div key={a.label} className="eco-node-neutral">
              <div className="eco-node-title">{a.label}</div>
              <div className="eco-node-sub">{a.examples}</div>
            </div>
          ))}
        </div>

        <div className="eco-arrow">↑ context delivered to AI ↑</div>

        <div className="atlan-layer">
          <div className="atlan-layer-header">
            <div className="atlan-logo-dot" />
            <span className="atlan-layer-name">atlan</span>
            <span className="atlan-layer-subtitle">Enterprise Context Layer</span>
          </div>

          <div className="graphs-grid">
            {GRAPHS.map(g => {
              const st = getGraphStatus(g, scores)
              const sc = statusColors(st)
              const isOpen = expanded === g.id
              const cascadeTriggered = g.cascade && st === 'warn' && g.dims.every(d => scores[d] > 3.2)
              const weakDeps = g.cascade ? g.cascadeFrom.filter(id => {
                const dg = GRAPHS.find(x => x.id === id)
                const ds = dg.dims.map(d => scores[d])
                return ds.reduce((a, b) => a + b, 0) / ds.length <= 3.2
              }) : []

              return (
                <div key={g.id} className="graph-wrap">
                  <div
                    className="graph-node"
                    style={{ background: sc.bg, borderColor: sc.border }}
                    onClick={() => toggle(g.id)}
                  >
                    <div className="graph-node-top">
                      <span className="graph-name">{g.name}</span>
                      <span className="graph-badge" style={{ color: sc.badge, background: sc.badgeBg }}>{sc.label}</span>
                    </div>
                    <div className="graph-def">{g.def}</div>
                    {cascadeTriggered && (
                      <div className="cascade-warning">Cascade: dependent graphs have gaps</div>
                    )}
                    <div className="graph-expand-hint">{isOpen ? '▲ collapse' : '▼ expand'}</div>
                  </div>

                  {isOpen && (
                    <div className="graph-detail" style={{ background: sc.callout.bg, borderColor: sc.callout.border }}>
                      <div className="detail-status" style={{ color: sc.callout.text }}>{g.name} — {sc.label}</div>
                      <p className="detail-def" style={{ color: sc.callout.text }}>{g.def}</p>
                      <div className="detail-row">
                        <span className="detail-key">Atlan capabilities</span>
                        <span className="detail-val" style={{ color: sc.callout.text }}>{g.caps}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-key">Atlan products</span>
                        <span className="detail-val" style={{ color: sc.callout.text }}>{g.products}</span>
                      </div>
                      {g.dims.filter(did => scores[did] <= 3.2).map(did => {
                        const dim = DIMS.find(d => d.id === did)
                        return g.why[did] ? (
                          <div key={did} className="detail-why" style={{ borderTopColor: `${sc.callout.border}66`, color: sc.callout.text }}>
                            <strong>{dim.label} ({scores[did]}/5): </strong>{g.why[did]}
                          </div>
                        ) : null
                      })}
                      {weakDeps.length > 0 && (
                        <div className="detail-why cascade-detail" style={{ borderTopColor: `${sc.callout.border}66`, color: sc.callout.text }}>
                          <strong>Cascade dependency: </strong>
                          {GRAPHS.filter(x => weakDeps.includes(x.id)).map(x => x.name).join(', ')} {weakDeps.length > 1 ? 'have' : 'has'} gaps. {g.cascadeNote}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="eco-arrow">↑ enriched metadata from systems ↑</div>

        <div className="eco-layer-label">Business systems</div>
        <div className="eco-biz-grid">
          {BIZ_SYSTEMS.map(b => (
            <div key={b.label} className="eco-node-neutral">
              <div className="eco-node-title">{b.label}</div>
              <div className="eco-node-sub">{b.examples}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`summary-callout summary-${summaryType}`}>
        <span className="summary-icon">{summaryType === 'ok' ? '✓' : summaryType === 'crit' ? '!' : '⚠'}</span>
        <span>{summaryText}</span>
      </div>
    </div>
  )
}
