import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({ baseURL: API_URL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function imageUrl(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  
  // Handle different path formats from database
  let cleanPath = path
  
  // Remove any leading "static/" if present
  cleanPath = cleanPath.replace(/^static[\/\\]/, '')
  
  // If path doesn't start with uploads/, add it
  if (!cleanPath.startsWith('uploads/')) {
    // Extract just the filename if full path exists
    const parts = cleanPath.split(/[\/\\]/)
    const filename = parts[parts.length - 1]
    cleanPath = `uploads/${filename}`
  }
  
  // Construct final URL
  const finalUrl = `${API_URL}/static/${cleanPath}`
  return finalUrl
}

