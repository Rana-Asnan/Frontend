import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, imageUrl } from '../api'

export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => { api.get('/posts').then(r => setPosts(r.data)) }, [])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(p => (
        <Link to={`/posts/${p.id}`} key={p.id} className="block border rounded bg-white p-4">
          <div className="flex gap-4">
            {p.image && (
              <img 
                alt={p.title} 
                src={imageUrl(p.image)} 
                className="w-28 h-20 object-cover rounded"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            )}
            <div>
              <h2 className="font-semibold text-lg">{p.title}</h2>
              <p className="text-sm text-gray-600">by {p.author_name}</p>
            </div>
          </div>
        </Link>
      ))}
      {!posts.length && <p className="text-center text-gray-500">No posts yet.</p>}
    </div>
  )
}

