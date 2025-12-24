import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {endpoints, IMAGE_BASE} from '../api'

const MovieDetails = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(endpoints.movieDetails(id)).then(r => r.json()),
      fetch(endpoints.movieCredits(id)).then(r => r.json()),
    ])
      .then(([movieData, creditsData]) => {
        setMovie(movieData)
        setCast((creditsData.cast || []).slice(0, 20)) // show first 20 cast
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading details...</p>
  if (!movie || movie.success === false) return <p>Movie not found.</p>

  return (
    <div className="details-page">
      <div className="movie-details">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE}${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={movie.title}
        />
        <div className="meta">
          <h1>{movie.title}</h1>
          <p>
            <strong>Rating:</strong> {movie.vote_average ?? 'N/A'}
          </p>
          <p>
            <strong>Runtime:</strong>{' '}
            {movie.runtime ? `${movie.runtime} min` : 'N/A'}
          </p>
          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres?.map(g => g.name).join(', ') || 'N/A'}
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || 'N/A'}
          </p>
          <h3>Overview</h3>
          <p>{movie.overview || 'No overview available.'}</p>
        </div>
      </div>

      <div className="cast-section">
        <h2>Cast</h2>
        {cast.length === 0 ? (
          <p>No cast data available.</p>
        ) : (
          <div className="cast-grid">
            {cast.map(c => (
              <div key={c.cast_id || c.credit_id} className="cast-card">
                <img
                  src={
                    c.profile_path
                      ? `${IMAGE_BASE}${c.profile_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={c.name}
                />
                <div>
                  <p className="cast-name">{c.name}</p>
                  <p className="cast-char">as {c.character || '-'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetails
