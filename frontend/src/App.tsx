import { useState } from 'react'
import './App.css'
import { api } from './config/api'

function App() {
  const [apiMessage, setApiMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const data = await api.get('/test')
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
