import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/login', { email, password })

      localStorage.setItem('token', data.access_token)
      localStorage.setItem('name', data.user.name)
      localStorage.setItem('email', data.user.email)
      navigate('/')
    } catch (e) {
      setError(e?.response?.data?.detail || 'Login failed')
    }
  }
  return (
    <form onSubmit={submit} className="max-w-sm mx-auto bg-white p-6 rounded border space-y-3">
      <h1 className="text-xl font-semibold">Login</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </form>
  )
}

