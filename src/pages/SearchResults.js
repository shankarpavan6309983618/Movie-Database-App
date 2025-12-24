import React, {useEffect, useState, useCallback} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {endpoints} from '../api'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

// Fixed arrow-body-style: return directly
const useQuery = () => new URLSearchParams(useLocation().search)

const SearchResults = () => {
  const history = useHistory()
  const queryParams = useQuery()
  const query = queryParams.get('query') || ''
  const page = parseInt(queryParams.get('page') || '1', 10)

  const [movies, setMovies] = useState([])
  const [meta, setMeta] = useState({page, total_pages: 1})
  const [loading, setLoading] = useState(false)

  const fetchMovies = useCallback((q, p) => {
    if (!q) return
    setLoading(true)
    fetch(endpoints.search(q, p))
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || [])
        setMeta({page: data.page || p, total_pages: data.total_pages || 1})
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchMovies(query, page)
  }, [query, page, fetchMovies])

  const onChangePage = useCallback(
    p => {
      history.push(`/search?query=${encodeURIComponent(query)}&page=${p}`)
      window.scrollTo({top: 0, behavior: 'smooth'})
    },
    [history, query],
  )

  if (!query) {
    return (
      <p className="page-title">Please enter a search query from the navbar.</p>
    )
  }

  return (
    <section>
      <h2 className="page-title">Search results for “{query}”</h2>

      {loading && <p>Searching...</p>}

      {!loading && movies.length === 0 && <p>No results found.</p>}

      {!loading && movies.length > 0 && (
        <>
          <div className="grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            page={meta.page}
            totalPages={meta.total_pages}
            onChange={onChangePage}
          />
        </>
      )}
    </section>
  )
}

export default SearchResults
