import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route
          path='/search'
          component={SearchBooks}
        />
        <Route exact
          path='/'
          component={ListBooks}
        />
      </div>
    )
  }
}

export default BooksApp
