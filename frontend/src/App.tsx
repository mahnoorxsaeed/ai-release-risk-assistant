import { useState } from 'react'
import './App.css'

function App() {
  const [change, setChange] = useState('')
  const [tests, setTests] = useState<string[]>([])
  const [hasAnalyzed, setHasAnalyzed] = useState(false)

  function generateChecklist() {
    if (!change.trim()) return

    const suggestions = [
      'Verify the changed feature works as expected.',
      'Try invalid or missing input.',
      'Check that related existing features still work.',
    ]

    if (/password|login|account/i.test(change)) {
      suggestions.push('Check that only the correct user can access the account.')
    }

    if (/email|notification/i.test(change)) {
      suggestions.push('Check that the message reaches the intended recipient.')
    }

    setTests(suggestions)
    setHasAnalyzed(true)
  }

  return (
    <main className="container">
      <p className="eyebrow">SOFTWARE TEST PLANNING</p>
      <h1>Release Risk Assistant</h1>
      <p className="intro">
        Describe a software change and get a starting checklist of things to test.
      </p>

      <label htmlFor="change">What changed?</label>
      <textarea
        id="change"
        value={change}
        onChange={(event) => setChange(event.target.value)}
        placeholder="Example: We changed how password reset links expire and updated the confirmation email."
      />

      <button onClick={generateChecklist}>Generate checklist</button>

      {hasAnalyzed && (
        <section className="results">
          <h2>Suggested tests</h2>
          <ul>
            {tests.map((test) => (
              <li key={test}>{test}</li>
            ))}
          </ul>
          <p className="note">
            These are starter suggestions. A tester should review them before a release.
          </p>
        </section>
      )}
    </main>
  )
}

export default App