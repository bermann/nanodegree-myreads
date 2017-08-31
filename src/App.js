import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {

  state = {
    shelves: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) =>{
      let shelves = []
      shelves.push({
        id: 'currentlyReading',
        title: 'Currently Reading',
        books: books.filter( (book) => book.shelf === 'currentlyReading' )
      })
      shelves.push({
        id: 'wantToRead',
        title: 'Want to Read',
        books: books.filter( (book) => book.shelf === 'wantToRead' )
      })
      shelves.push({
        id: 'read',
        title: 'Read',
        books: books.filter( (book) => book.shelf === 'read' )
      })
      this.setState({
        shelves: shelves
      })
    })
  }

  render() {
    const { shelves } = this.state

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
              shelves={shelves}/>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
