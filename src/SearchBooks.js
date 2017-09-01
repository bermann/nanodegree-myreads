import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 10).then( (result) => {
      if (result.error)
        this.setState({books: [] })
      else {
        this.props.setShelves(result)
        this.setState({books: result})
      }
    })
  }

  updateQuery = (query) => {
    if (query) {
      this.setState({query})
      this.searchBooks(query)
    } else {
      this.setState({
        query: '',
        books: []
      })
    }
  }

  render() {
    const { onUpdateBook } = this.props
    const { query, books } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              value={query}
              onChange={ (evt) => this.updateQuery(evt.target.value) }
              type="text"
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { books.map( (book) => (
              <li key={book.id}>
                <Book book={book} onUpdateBook={onUpdateBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
