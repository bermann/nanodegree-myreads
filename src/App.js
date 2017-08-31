import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) =>{
      this.setState({
        books: books
      })
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route
          path='/search'
          component={SearchBooks}
        />
        <Route exact
          path='/'
          render={ () => (
            <ListBooks
              books={books}/>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
