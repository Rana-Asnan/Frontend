import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const token = localStorage.getItem("token")   // ✅ FIX: get token

      if (!token) {
        setError("You are not logged in")
        return
      }

      const form = new FormData()
      form.append('title', title)
      form.append('content', content)
      if (image) form.append('image', image)

      const { data } = await api.post('/posts', form, {
        headers: {
          Authorization: `Bearer ${token}`,  // ✅ FIX: send token
        },
      })

      navigate(`/posts/${data.id}`)

    } catch (e) {
      setError(e?.response?.data?.detail || 'Create failed')
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 bg-white p-6 rounded border">
      <h1 className="text-xl font-semibold">New Post</h1>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded"
        rows={8}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input type="file" onChange={(e) => setImage(e.target.files?.[0])} />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Publish
      </button>
    </form>
  )
}
