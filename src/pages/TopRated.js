import React, {useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {endpoints} from '../api'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

const useQuery = () => new URLSearchParams(useLocation().search)

const TopRated = () => {
  const [movies, setMovies] = useState([])
  const [meta, setMeta] = useState({page: 1, total_pages: 1})
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const query = useQuery()
  const page = parseInt(query.get('page') || '1', 10)

  const fetchPage = async p => {
    try {
      setLoading(true)
      const response = await fetch(endpoints.topRated(p))
      const data = await response.json()

      setMovies(data.results || [])
      setMeta({
        page: data.page || p,
        total_pages: data.total_pages || 1,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPage(page)
  }, [page])

  const onChangePage = p => {
    history.push(`/top-rated?page=${p}`)
  }

  return (
    <section>
      <h2>Top Rated</h2>

      {loading && <p>Loading...</p>}

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
    </section>
  )
}

export default TopRated
