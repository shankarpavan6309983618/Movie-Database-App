import React from 'react'
import {useHistory} from 'react-router-dom'
import {IMAGE_BASE} from '../api'

const MovieCard = ({movie}) => {
  const history = useHistory()

  const {
    id,
    poster_path: posterPath,
    title,
    name,
    vote_average: voteAverage,
  } = movie

  const displayTitle = title || name || 'Untitled'

  const onClickViewDetails = () => {
    history.push(`/movie/${id}`)
  }

  return (
    <div className="movie-card">
      <img
        src={
          posterPath
            ? `${IMAGE_BASE}${posterPath}`
            : 'https://via.placeholder.com/500x750?text=No+Image'
        }
        alt={displayTitle}
      />

      <div className="movie-info">
        <h3>{displayTitle}</h3>
        <p className="rating">⭐ {voteAverage ?? 'N/A'}</p>

        <button
          type="button"
          className="details-btn"
          onClick={onClickViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default MovieCard
