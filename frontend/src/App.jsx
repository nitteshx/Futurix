import { useState } from 'react'
import './App.css'

const careers = [
  {
    icon: '🤖',
    title: 'AI Engineer',
    category: 'Artificial Intelligence',
    description: 'Build intelligent systems, AI assistants, and machine learning applications.',
    skills: ['Python', 'Machine Learning', 'LLMs'],
    color: 'purple',
  },
  {
    icon: '🛡️',
    title: 'Cybersecurity Analyst',
    category: 'Security',
    description: 'Protect systems and investigate security threats in the digital world.',
    skills: ['Networking', 'Security', 'Problem Solving'],
    color: 'blue',
  },
  {
    icon: '🎨',
    title: 'UI/UX Designer',
    category: 'Design',
    description: 'Create intuitive digital experiences that solve real user problems.',
    skills: ['Figma', 'User Research', 'Prototyping'],
    color: 'pink',
  },
  {
    icon: '📊',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    description: 'Turn complex data into useful insights and predictions.',
    skills: ['Python', 'Statistics', 'Data Analysis'],
    color: 'green',
  },
]

const simulations = [
  {
    icon: '💻',
    title: 'Debug the Login System',
    role: 'Software Developer',
    difficulty: 'Beginner',
    time: '10 min',
  },
  {
    icon: '🔐',
    title: 'Investigate a Phishing Email',
    role: 'Cybersecurity Analyst',
    difficulty: 'Beginner',
    time: '8 min',
  },
  {
    icon: '📱',
    title: 'Improve a Student App',
    role: 'UI/UX Designer',
    difficulty: 'Intermediate',
    time: '12 min',
  },
]

function App() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [search, setSearch] = useState('')

  const tabs = ['Overview', 'Career Explorer', 'Simulator', 'Mentorship', 'Community']

  const filteredCareers = careers.filter((career) =>
    `${career.title} ${career.category} ${career.skills.join(' ')}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" onClick={() => setActiveTab('Overview')}>
          <span className="brand-icon">✦</span>
          <span>FUTURIX<span className="brand-dot">.</span></span>
        </a>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="side-nav">
          {tabs.map((tab, index) => {
            const icons = ['◫', '⌕', '⚡', '♧', '◎']
            return (
              <button
                key={tab}
                className={`nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="nav-icon">{icons[index]}</span>
                {tab}
                {tab === 'Simulator' && <span className="nav-badge">AI</span>}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="ai-status"><span /> AI workspace ready</div>
          <div className="profile">
            <div className="avatar">S</div>
            <div><strong>Student Explorer</strong><small>Future in progress</small></div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> {activeTab}</div>
          <div className="topbar-right">
            <span className="model-pill"><span /> Gemma AI workspace</span>
            <div className="top-avatar">S</div>
          </div>
        </header>

        <div className="page-content">
          {activeTab === 'Overview' && (
            <>
              <section className="welcome-row">
                <div>
                  <p className="eyebrow">YOUR FUTURE STARTS HERE</p>
                  <h1>Discover what you’re <span>capable of.</span></h1>
                  <p className="subtitle">Explore careers, try real-world challenges, and build skills for the future.</p>
                </div>
                <div className="welcome-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="orb">✦</div>
                  <span className="float-icon float-one">⌘</span>
                  <span className="float-icon float-two">◇</span>
                  <span className="float-icon float-three">✳</span>
                </div>
              </section>

              <section className="stats-grid">
                <div className="stat-card"><span className="stat-icon violet">✦</span><div><small>CAREER PATHS</small><strong>04</strong><p>Explore your options</p></div></div>
                <div className="stat-card"><span className="stat-icon cyan">⚡</span><div><small>SIMULATIONS</small><strong>03</strong><p>Hands-on challenges</p></div></div>
                <div className="stat-card"><span className="stat-icon orange">◎</span><div><small>YOUR PROGRESS</small><strong>0%</strong><p>Your journey begins</p></div></div>
              </section>

              <section className="section-block">
                <div className="section-heading"><div><p className="eyebrow">FIND YOUR DIRECTION</p><h2>Explore career paths</h2></div><button className="text-button" onClick={() => setActiveTab('Career Explorer')}>View all careers ↗</button></div>
                <div className="career-grid">
                  {careers.slice(0, 3).map((career) => <CareerCard key={career.title} career={career} onClick={() => setActiveTab('Career Explorer')} />)}
                </div>
              </section>

              <section className="section-block">
                <div className="section-heading"><div><p className="eyebrow">LEARN BY DOING</p><h2>Try a real-world simulation</h2></div><button className="text-button" onClick={() => setActiveTab('Simulator')}>Explore simulations ↗</button></div>
                <div className="simulation-grid">
                  {simulations.slice(0, 2).map((simulation) => <SimulationCard key={simulation.title} simulation={simulation} onClick={() => setActiveTab('Simulator')} />)}
                </div>
              </section>
            </>
          )}

          {activeTab === 'Career Explorer' && (
            <section className="section-block page-section">
              <p className="eyebrow">YOUR POSSIBILITIES</p>
              <h1>Career Explorer</h1>
              <p className="subtitle">Discover roles, learn essential skills, and find a direction that excites you.</p>
              <input className="search-input" placeholder="Search careers or skills..." value={search} onChange={(event) => setSearch(event.target.value)} />
              <div className="career-grid">
                {filteredCareers.map((career) => <CareerCard key={career.title} career={career} onClick={() => setActiveTab('Simulator')} />)}
              </div>
              {filteredCareers.length === 0 && <p className="empty-state">No careers found. Try another search.</p>}
            </section>
          )}

          {activeTab === 'Simulator' && (
            <section className="section-block page-section">
              <p className="eyebrow">EXPERIENCE THE WORK</p>
              <h1>Career Simulator <span>⚡</span></h1>
              <p className="subtitle">Step into real-world challenges and discover how professionals think.</p>
              <div className="notice"><span>✦</span><div><strong>AI-powered feedback</strong><p>Choose a challenge to explore. Connect the Gemma backend to enable personalized AI feedback.</p></div></div>
              <div className="simulation-grid">
                {simulations.map((simulation) => <SimulationCard key={simulation.title} simulation={simulation} onClick={() => setActiveTab('Simulation: ' + simulation.title)} />)}
              </div>
              {activeTab.startsWith('Simulation: ') && <SimulationDetail title={activeTab.replace('Simulation: ', '')} onBack={() => setActiveTab('Simulator')} />}
            </section>
          )}

          {activeTab.startsWith('Simulation: ') && (
            <section className="section-block page-section">
              <button className="text-button" onClick={() => setActiveTab('Simulator')}>← Back to simulations</button>
              <SimulationDetail title={activeTab.replace('Simulation: ', '')} onBack={() => setActiveTab('Simulator')} />
            </section>
          )}

          {activeTab === 'Mentorship' && (
            <section className="section-block page-section">
              <p className="eyebrow">LEARN FROM OTHERS</p><h1>Mentorship</h1>
              <p className="subtitle">Get inspired by experienced people and learn about their career journeys.</p>
              <div className="notice"><span>♧</span><div><strong>Demo experience</strong><p>These are sample profiles for the prototype. No real booking or messaging is enabled.</p></div></div>
              <div className="career-grid">
                {[['👩‍💻','Ananya Sharma','Software Engineer','AI & Web Development'],['👨‍🔬','Rahul Mehta','Data Scientist','Data & Machine Learning'],['👩‍🎨','Priya Patel','Product Designer','Design & Research']].map(([icon,name,role,topic]) => <div className="career-card" key={name}><div className="career-icon pink">{icon}</div><span className="card-category">COMMUNITY MENTOR</span><h3>{name}</h3><p className="mentor-role">{role}</p><p>{topic}</p><button className="outline-button" onClick={() => alert('Prototype only — real mentorship booking is not enabled.')}>View profile ↗</button></div>)}
              </div>
            </section>
          )}

          {activeTab === 'Community' && (
            <section className="section-block page-section">
              <p className="eyebrow">GROW TOGETHER</p><h1>Community</h1>
              <p className="subtitle">A space for learners to share goals, projects, and questions.</p>
              <CommunityDemo />
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

function CareerCard({ career, onClick }) {
  return (
    <article className="career-card">
      <div className={`career-icon ${career.color}`}>{career.icon}</div>
      <span className="card-category">{career.category}</span>
      <h3>{career.title}</h3>
      <p>{career.description}</p>
      <div className="skill-list">{career.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      <button className="outline-button" onClick={onClick}>Explore career <span>↗</span></button>
    </article>
  )
}

function SimulationCard({ simulation, onClick }) {
  return (
    <article className="simulation-card">
      <div className="simulation-top"><span className="simulation-icon">{simulation.icon}</span><span className="difficulty">{simulation.difficulty}</span></div>
      <h3>{simulation.title}</h3>
      <p>{simulation.role}</p>
      <div className="simulation-footer"><span>◷ {simulation.time}</span><button onClick={onClick}>Start challenge →</button></div>
    </article>
  )
}

function SimulationDetail({ title, onBack }) {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)

  async function submitAnswer(event) {
    event.preventDefault()
    if (!answer.trim()) return
    setLoading(true)
    setFeedback('')
    try {
      const response = await fetch('http://localhost:8000/api/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: title, answer }),
      })
      if (!response.ok) throw new Error('AI service is not available yet.')
      const data = await response.json()
      setFeedback(data.feedback || data.response || JSON.stringify(data))
    } catch {
      setFeedback('The AI backend is not connected yet. Your frontend is working! Ask your backend teammate to start the API at http://localhost:8000/api/simulation.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="simulation-detail">
      <button className="text-button" onClick={onBack}>← Back</button>
      <h2>{title}</h2>
      <p>Describe how you would approach this workplace challenge. Think through the problem, your steps, and the reason for your decisions.</p>
      <form onSubmit={submitAnswer}>
        <label htmlFor="simulation-answer">Your approach</label>
        <textarea id="simulation-answer" rows="6" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="I would start by..." />
        <button className="primary-button" type="submit" disabled={loading || !answer.trim()}>{loading ? 'Getting feedback...' : 'Get AI feedback →'}</button>
      </form>
      {feedback && <div className="feedback-box"><strong>Feedback</strong><p>{feedback}</p></div>}
    </div>
  )
}

function CommunityDemo() {
  const [posts, setPosts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('futurix-community-posts') || '[]') }
    catch { return [] }
  })
  const [draft, setDraft] = useState('')

  function addPost(event) {
    event.preventDefault()
    if (!draft.trim()) return
    const next = [{ id: Date.now(), text: draft.trim() }, ...posts]
    setPosts(next)
    localStorage.setItem('futurix-community-posts', JSON.stringify(next))
    setDraft('')
  }

  return (
    <div className="community-layout">
      <form className="community-compose" onSubmit={addPost}>
        <label htmlFor="community-post">Share an idea or ask a question</label>
        <textarea id="community-post" rows="3" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What are you learning today?" />
        <button className="primary-button" type="submit" disabled={!draft.trim()}>Publish post</button>
        <small>Prototype: posts are saved only in this browser on this device.</small>
      </form>
      <div className="community-posts">
        {posts.length === 0 ? <div className="empty-state">No posts yet. Start the conversation!</div> : posts.map((post) => <article className="community-post" key={post.id}><div className="post-avatar">S</div><div><strong>Student Explorer</strong><p>{post.text}</p><small>Local demo post</small></div></article>)}
      </div>
    </div>
  )
}

export default App
