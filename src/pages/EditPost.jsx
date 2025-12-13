import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'

export default function EditPost() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  useEffect(() => { api.get(`/posts/${id}`).then(r => { setTitle(r.data.title); setContent(r.data.content) }) }, [id])
  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const form = new FormData()
      form.append('title', title)
      form.append('content', content)
      if (image) form.append('image', image)
      await api.put(`/posts/${id}`, form)
      navigate(`/posts/${id}`)
    } catch (e) {
      setError(e?.response?.data?.detail || 'Update failed')
    }
  }
  return (
    <form onSubmit={submit} className="space-y-3 bg-white p-6 rounded border">
      <h1 className="text-xl font-semibold">Edit Post</h1>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <input className="w-full border p-2 rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="w-full border p-2 rounded" rows={8} placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
      <input type="file" onChange={e=>setImage(e.target.files?.[0])} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  )
}

