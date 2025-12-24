import React, {useState} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'

const Navbar = () => {
  const [q, setQ] = useState('')
  const history = useHistory()
  const location = useLocation()

  const submitSearch = e => {
    e.preventDefault()
    if (!q.trim()) return
    history.push(`/search?query=${encodeURIComponent(q.trim())}&page=1`)
    setQ('')
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          movieDB
        </Link>

        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Trending
        </Link>

        <Link
          to="/top-rated"
          className={location.pathname === '/top-rated' ? 'active' : ''}
        >
          Top Rated
        </Link>

        <Link
          to="/upcoming"
          className={location.pathname === '/upcoming' ? 'active' : ''}
        >
          Upcoming
        </Link>
      </div>

      <form className="nav-search" onSubmit={submitSearch}>
        <input
          aria-label="search"
          placeholder="Search movies..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}

export default Navbar
