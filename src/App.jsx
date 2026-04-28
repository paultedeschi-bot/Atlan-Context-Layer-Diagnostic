import { useState } from 'react'
import Diagnostic from './components/Diagnostic.jsx'
import Results from './components/Results.jsx'
import ContextLayer from './components/ContextLayer.jsx'
import './App.css'

const TABS = [
  { id: 'diagnostic', label: 'Diagnostic' },
  { id: 'results', label: 'Results' },
  { id: 'context', label: 'Context Layer view' },
]

const DEFAULT_SCORES = { trust: 3, semantic: 3, lineage: 3, governance: 3, activation: 3 }

export default function App() {
  const [tab, setTab] = useState('diagnostic')
  const [scores, setScores] = useState(DEFAULT_SCORES)
  const [account, setAccount] = useState('')
  const [team, setTeam] = useState('')
  const [visited, setVisited] = useState(new Set(['diagnostic']))

  function handleTabChange(id) {
    setTab(id)
    setVisited(v => new Set([...v, id]))
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="brand-dot" />
            <span className="brand-name">atlan</span>
            <span className="brand-divider" />
            <span className="brand-title">Context Layer Diagnostic</span>
          </div>
          <div className="header-meta">
            {account && <span className="meta-account">{account}</span>}
            {team && <span className="meta-team">{team}</span>}
            <span className="meta-date">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <div className="sidebar-section">
            <label className="field-label">Account</label>
            <input
              type="text"
              className="field-input"
              placeholder="Enter account name"
              value={account}
              onChange={e => setAccount(e.target.value)}
            />
          </div>
          <div className="sidebar-section">
            <label className="field-label">Team</label>
            <select className="field-input" value={team} onChange={e => setTeam(e.target.value)}>
              <option value="">Select team</option>
              {['Finance', 'Marketing', 'Engineering', 'Sales', 'Operations', 'Enterprise-wide'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <nav className="sidebar-nav">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                className={`nav-item ${tab === t.id ? 'active' : ''} ${visited.has(t.id) && tab !== t.id ? 'visited' : ''}`}
                onClick={() => handleTabChange(t.id)}
              >
                <span className="nav-num">{i + 1}</span>
                <span className="nav-label">{t.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-scores">
            <div className="scores-title">Current scores</div>
            {Object.entries(scores).map(([id, val]) => {
              const labels = { trust: 'Trust', semantic: 'Semantic', lineage: 'Lineage', governance: 'Governance', activation: 'Activation' }
              const color = val <= 2 ? '#E24B4A' : val <= 3 ? '#EF9F27' : '#639922'
              return (
                <div key={id} className="score-mini-row">
                  <span className="score-mini-label">{labels[id]}</span>
                  <div className="score-mini-bar-bg">
                    <div className="score-mini-bar-fill" style={{ width: `${(val - 1) / 4 * 100}%`, background: color }} />
                  </div>
                  <span className="score-mini-val">{val}</span>
                </div>
              )
            })}
          </div>
        </aside>

        <main className="main-content">
          {tab === 'diagnostic' && (
            <Diagnostic scores={scores} setScores={setScores} team={team} onNext={() => handleTabChange('results')} />
          )}
          {tab === 'results' && (
            <Results scores={scores} team={team} account={account} onNext={() => handleTabChange('context')} />
          )}
          {tab === 'context' && (
            <ContextLayer scores={scores} team={team} account={account} />
          )}
        </main>
      </div>
    </div>
  )
}
