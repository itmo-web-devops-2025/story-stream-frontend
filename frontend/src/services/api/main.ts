import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
})
