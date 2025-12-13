import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const name = localStorage.getItem('name')
  return (
    <nav className="border-b bg-white">
      <div className="max-w-3xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Blog</Link>
        <div className="flex gap-3 items-center">
          {token && <Link to="/create" className="px-3 py-1 bg-blue-600 text-white rounded">New Post</Link>}
          {!token ? (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </>
          ) : (
            <>
              <span className="text-sm">Hi, {name}</span>
              <button onClick={() => { localStorage.clear(); navigate('/'); }} className="text-sm text-red-600">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

