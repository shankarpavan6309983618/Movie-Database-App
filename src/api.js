const API_KEY = process.env.REACT_APP_TMDB_API_KEY
const BASE = 'https://api.themoviedb.org/3'
export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

function qs(params = {}) {
  const q = new URLSearchParams(params)
  q.set('api_key', API_KEY)
  q.set('language', 'en-US')
  return q.toString()
}

export const endpoints = {
  popular: (page = 1) => `${BASE}/movie/popular?${qs({page})}`,
  topRated: (page = 1) => `${BASE}/movie/top_rated?${qs({page})}`,
  upcoming: (page = 1) => `${BASE}/movie/upcoming?${qs({page})}`,
  movieDetails: id => `${BASE}/movie/${id}?${qs()}`,
  movieCredits: id => `${BASE}/movie/${id}/credits?${qs()}`,
  search: (query, page = 1) => `${BASE}/search/movie?${qs({query, page})}`,
}
