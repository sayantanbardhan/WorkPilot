import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('meeting')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  // Use relative path for Docker deployment, fallback to localhost for development
  const API_BASE = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001'

  const handleMeetingProcess = async (formData, endpoint = 'process-meeting') => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (response.ok) {
        setResults(data)
      } else {
        setError(data.error || 'Failed to process meeting')
      }
    } catch (err) {
      setError('Network error: ' + err.message)
    }
    setLoading(false)
  }

  const testIntegrations = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/test-integrations`)
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError('Network error: ' + err.message)
    }
    setLoading(false)
  }

  const MeetingProcessor = () => {
    const [formData, setFormData] = useState({
      meetingTitle: '',
      projectKey: '',
      notionPageId: '',
      transcript: ''
    })
    const [audioFile, setAudioFile] = useState(null)
    const [autonomousMode, setAutonomousMode] = useState(true)

    const handleSubmit = (e) => {
      e.preventDefault()
      const data = new FormData()

      Object.keys(formData).forEach(key => {
        if (formData[key]) data.append(key, formData[key])
      })

      if (audioFile) {
        data.append('audio', audioFile)
      }

      // Use autonomous endpoint if autonomous mode is enabled
      const endpoint = autonomousMode ? 'process-meeting-autonomous' : 'process-meeting'
      handleMeetingProcess(data, endpoint)
    }

    return (
      <div className="processor-container">
        <div className="processor-header">
          <div className="header-icon">🤖</div>
          <div className="header-content">
            <h1>AI Meeting Processor</h1>
            <p>Transform your meetings into actionable tasks automatically</p>
          </div>
        </div>

        <div className="autonomous-card">
          <div className="toggle-container">
            <input
              type="checkbox"
              checked={autonomousMode}
              onChange={(e) => setAutonomousMode(e.target.checked)}
              id="autonomous-mode"
              className="toggle-input"
            />
            <label htmlFor="autonomous-mode" className="toggle-label">
              <span className="toggle-slider"></span>
            </label>
            <div className="toggle-text">
              <span className="toggle-title">Autonomous Mode</span>
              <span className="toggle-subtitle">AI determines optimal task destinations</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="processor-form">
          <div className="form-grid">
            <div className="input-group full-width">
              <label className="input-label">
                <span className="label-icon">📝</span>
                Meeting Title
              </label>
              <input
                type="text"
                value={formData.meetingTitle}
                onChange={(e) => setFormData({ ...formData, meetingTitle: e.target.value })}
                placeholder="Enter your meeting title..."
                className="modern-input"
              />
            </div>

            <div className="input-group full-width">
              <label className="input-label">
                <span className="label-icon">🎤</span>
                Audio File
              </label>
              <div className="file-upload-container">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="file-input"
                  id="audio-file"
                />
                <label htmlFor="audio-file" className="file-upload-label">
                  {audioFile ? audioFile.name : 'Choose audio file or drag & drop'}
                </label>
              </div>
            </div>

            <div className="input-group full-width">
              <label className="input-label">
                <span className="label-icon">💬</span>
                Or Paste Transcript
              </label>
              <textarea
                value={formData.transcript}
                onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
                placeholder="Paste your meeting transcript here..."
                rows="6"
                className="modern-textarea"
              />
            </div>

            {!autonomousMode && (
              <>
                <div className="input-group">
                  <label className="input-label">
                    <span className="label-icon">🎯</span>
                    Jira Project Key
                  </label>
                  <input
                    type="text"
                    value={formData.projectKey}
                    onChange={(e) => setFormData({ ...formData, projectKey: e.target.value })}
                    placeholder="e.g., PO"
                    className="modern-input"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <span className="label-icon">📋</span>
                    Notion Page ID
                  </label>
                  <input
                    type="text"
                    value={formData.notionPageId}
                    onChange={(e) => setFormData({ ...formData, notionPageId: e.target.value })}
                    placeholder="Notion page ID"
                    className="modern-input"
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || (!audioFile && !formData.transcript)}
            className="process-button"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>
                <span className="button-icon">🚀</span>
                {autonomousMode ? 'Process Autonomously' : 'Process Meeting'}
              </>
            )}
          </button>
        </form>

        {autonomousMode && (
          <div className="ai-features-card">
            <h3>🤖 AI-Powered Features</h3>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>Smart Jira project selection</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📋</span>
                <span>Automatic Notion organization</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💬</span>
                <span>Instant Slack notifications</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>Zero manual configuration</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const QuickActions = () => (
    <div className="quick-actions-container">
      <h2>Quick Actions</h2>
      <div className="actions-grid">
        <button onClick={testIntegrations} className="action-button" disabled={loading}>
          <span className="action-icon">🔧</span>
          <span className="action-text">Test Integrations</span>
        </button>

        <button
          onClick={() => window.open('https://lazypublishinghouse.atlassian.net/jira/software/c/projects/PO/boards/2', '_blank')}
          className="action-button"
        >
          <span className="action-icon">🎯</span>
          <span className="action-text">Open Jira Project</span>
        </button>

        <button
          onClick={() => window.open('https://www.notion.so/2198f34bd71f80899389cbbaffc28d46', '_blank')}
          className="action-button"
        >
          <span className="action-icon">📋</span>
          <span className="action-text">Open Notion Database</span>
        </button>
      </div>
    </div>
  )

  const ResultsDisplay = () => {
    if (!results) return null

    return (
      <div className="results-container">
        <div className="results-header">
          <h2>✅ Processing Results</h2>
          <button onClick={() => setResults(null)} className="close-button">×</button>
        </div>

        <div className="results-content">
          {results.summary && (
            <div className="result-card">
              <h3>📝 Meeting Summary</h3>
              <div className="summary-text">{results.summary}</div>
            </div>
          )}

          {results.actionItems && results.actionItems.length > 0 && (
            <div className="result-card">
              <h3>✅ Action Items ({results.actionItems.length})</h3>
              <div className="action-items">
                {results.actionItems.map((item, index) => (
                  <div key={index} className="action-item">
                    <div className="item-header">
                      <span className="item-task">{item.task}</span>
                      <span className={`priority-badge priority-${item.priority}`}>
                        {item.priority}
                      </span>
                    </div>
                    <div className="item-details">
                      <span>👤 {item.assignee || 'Unassigned'}</span>
                      <span>📅 {item.dueDate || 'No due date'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.jiraTasks && results.jiraTasks.length > 0 && (
            <div className="result-card">
              <h3>🎯 Jira Tasks Created ({results.jiraTasks.length})</h3>
              <div className="jira-tasks">
                {results.jiraTasks.map((task, index) => (
                  <div key={index} className="jira-task">
                    <span className="task-key">{task.key}</span>
                    <a href={task.self} target="_blank" rel="noopener noreferrer" className="task-link">
                      View in Jira →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.notionPage && (
            <div className="result-card">
              <h3>📋 Notion Page Created</h3>
              <a href={results.notionPage.url} target="_blank" rel="noopener noreferrer" className="notion-link">
                Open in Notion →
              </a>
            </div>
          )}

          {results.warnings && (Object.values(results.warnings).some(w => w)) && (
            <div className="result-card warnings">
              <h3>⚠️ Warnings</h3>
              {Object.entries(results.warnings).map(([service, warning]) => (
                warning && (
                  <div key={service} className="warning-item">
                    <strong>{service}:</strong> {warning}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">WorkPilot</span>
          </div>
          <div className="logo-subtitle">AI Meeting Assistant</div>
        </div>

        <div className="nav-menu">
          <button
            className={`nav-item ${activeTab === 'meeting' ? 'active' : ''}`}
            onClick={() => setActiveTab('meeting')}
          >
            <span className="nav-icon">🤖</span>
            <span className="nav-text">AI Processor</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'actions' ? 'active' : ''}`}
            onClick={() => setActiveTab('actions')}
          >
            <span className="nav-icon">⚡</span>
            <span className="nav-text">Quick Actions</span>
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">All Systems Online</span>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {error && (
          <div className="error-banner">
            <span className="error-icon">❌</span>
            <span className="error-text">{error}</span>
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}

        <div className="content-area">
          {activeTab === 'meeting' && <MeetingProcessor />}
          {activeTab === 'actions' && <QuickActions />}

          <ResultsDisplay />
        </div>
      </main>
    </div>
  )
}

export default App
