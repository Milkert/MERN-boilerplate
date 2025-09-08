import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [apiMessage, setApiMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/test')
      const data = await response.json()
      setApiMessage(data.message)
    } catch (error) {
      setApiMessage('Error connecting to backend')
      console.error('API Error:', error)
    }
    setLoading(false)
  }

  return (
    <>
      <h1>MERN Boilerplate</h1>
      <button onClick={testConnection} disabled={loading}>
        {loading ? 'Testing...' : 'Test Backend Connection'}
      </button>
      {apiMessage && <p>Backend says: {apiMessage}</p>}
    </>
  )
}

export default App
