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

  shelvesFromBooks = (books) => {
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
    return shelves
  }

  update = (book, shelfId) => {
    // Skip when no change has been made
    if (book.shelf === shelfId)
      return

    // Update the shelf of the book
    book.shelf = shelfId

    // if the shelfId is none, then it needs to be removed from books
    if (shelfId === 'none') {
      const index = this.books.indexOf(book)
      // if it was present in books, then remove it
      if (index !== -1)
        this.books.splice(index, 1)

      // if the shelfID is not none and book was not in books, then add it
    } else if(this.books.indexOf(book) === -1 )
      this.books.push(book)

    // Set the state shelves from the new books
    this.setState({
      shelves: this.shelvesFromBooks(this.books)
    })

    BooksAPI.update(book, shelfId)
  }

  setShelves = (books) => {
    books.forEach( (book) => {
      let bookWithShelf = this.books.filter( (b) => b.id === book.id )[0]
      book.shelf = bookWithShelf ? bookWithShelf.shelf : 'none'
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) =>{
      this.books = books

      this.setState({
        shelves: this.shelvesFromBooks(this.books)
      })
    })
  }

  render() {
    const { shelves } = this.state

    return (
      <div className="app">
        <Route
          path='/search'
          render={ ({history}) => (
            <SearchBooks
              onUpdateBook={ (book, shelfId) => {
                this.update(book, shelfId)
                history.push('/')
              }}
              setShelves={this.setShelves}
            />
          )}
        />
        <Route exact
          path='/'
          render={ () => (
            <ListBooks
              shelves={shelves}
              onUpdateBook={this.update}/>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
