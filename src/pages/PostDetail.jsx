import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api, imageUrl } from '../api'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  useEffect(() => {
    api.get(`/posts/${id}`).then(r => setPost(r.data))
    api.get(`/comments/post/${id}`).then(r => setComments(r.data))
  }, [id])
  const submit = async (e) => {
    e.preventDefault()
    if (!token) return
    await api.post('/comments', { post_id: id, content })
    setContent('')
    const { data } = await api.get(`/comments/post/${id}`)
    setComments(data)
  }
  const del = async () => {
    await api.delete(`/posts/${id}`)
    navigate('/')
  }
  if (!post) return null
  const isOwner = token && (post.author_id === localStorage.getItem('user_id'))
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded border">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-600 mb-4">by {post.author_name}</p>
        {post.image && (
          <img 
            alt={post.title} 
            src={imageUrl(post.image)} 
            className="w-full max-h-96 object-cover rounded mb-4"
            onError={(e) => {
              console.error('Image load error:', imageUrl(post.image))
              e.target.style.display = 'none'
            }}
          />
        )}
        <p className="whitespace-pre-wrap">{post.content}</p>
        {isOwner && (
          <div className="flex gap-3 mt-4">
            <Link to={`/edit/${post.id}`} className="px-3 py-1 rounded bg-amber-600 text-white">Edit</Link>
            <button onClick={del} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
          </div>
        )}
      </div>
      <div className="bg-white p-6 rounded border">
        <h2 className="font-semibold mb-3">Comments</h2>
        <div className="space-y-3 mb-4">
          {comments.map(c => (
            <div key={c.id} className="border rounded p-3">
              <p className="text-sm text-gray-600">{c.author_name}</p>
              <p>{c.content}</p>
            </div>
          ))}
          {!comments.length && <p className="text-sm text-gray-500">No comments yet.</p>}
        </div>
        {token ? (
          <form onSubmit={submit} className="flex gap-2">
            <input className="flex-1 border p-2 rounded" placeholder="Write a comment" value={content} onChange={e=>setContent(e.target.value)} />
            <button className="px-3 py-2 rounded bg-blue-600 text-white">Send</button>
          </form>
        ) : (
          <p className="text-sm"><Link to="/login" className="text-blue-600">Login</Link> to comment.</p>
        )}
      </div>
    </div>
  )
}

