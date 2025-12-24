import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TopRated from './pages/TopRated'
import Upcoming from './pages/Upcoming'
import MovieDetails from './pages/MovieDetails'
import SearchResults from './pages/SearchResults'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <main className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route exact path="/search" component={SearchResults} />
        <Redirect to="/" />
      </Switch>
    </main>
  </BrowserRouter>
)

export default App
