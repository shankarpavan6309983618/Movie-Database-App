import React, {useEffect, useState, useCallback} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {endpoints} from '../api'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

// Fixed arrow-body-style
const useQuery = () => new URLSearchParams(useLocation().search)

const TopRated = () => {
  const [movies, setMovies] = useState([])
  const [meta, setMeta] = useState({page: 1, total_pages: 1})
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const query = useQuery()
  const page = parseInt(query.get('page') || '1', 10)

  const fetchPage = useCallback(p => {
    setLoading(true)
    fetch(endpoints.topRated(p))
      .then(r => r.json())
      .then(data => {
        setMovies(data.results || [])
        setMeta({
          page: data.page || p,
          total_pages: data.total_pages || 1,
        })
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchPage(page)
  }, [page, fetchPage])

  const onChangePage = useCallback(
    p => {
      history.push(`/top-rated?page=${p}`)
      window.scrollTo({top: 0, behavior: 'smooth'})
    },
    [history],
  )

  return (
    <section>
      <h2 className="page-title">Top Rated Movies</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
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

export default TopRated
