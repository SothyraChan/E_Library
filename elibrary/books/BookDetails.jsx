import React, { useState, useEffect } from 'react';
import {read, update} from './api-books.js'
import auth from './../auth/auth-helper'
import { useParams } from 'react-router-dom';

export default function BookDetails ({match})
  {
  const [book, setBook] = useState({
    name: '',
    price: '',
    length: '',
    author: '',
    yearPublished: '',
    genre: '',
    contentUrl: '',
    category: '',
    redirect: false,
    error: ''
  });
  const [error, setError] = useState('')

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      bookId: match.params.bookId
    }, signal).then((data) => {
      if (data && data.error) {
        setError(data.error)
      } else {
        setBook(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [])

  return (
    <main style={{ width: '100vw', height: '100vh', backgroundColor: 'rgb(189, 200, 220)' }}>
      <div className="container" style={{ width: '80%', backgroundColor: 'white', borderRadius: '15px', padding: '8px', margin: 'auto', boxShadow: '0 0 10px rgb(115, 115, 115)' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="book-details" style={{ marginLeft: '15px' }}>
            <h4 id="book-name">{book.name}</h4>
            <p id="author">Author: {book.author}</p>
            <p id="price">Price: {book.price}$</p>
            <p id="date-pub">Publication Date: {book.yearPublished}</p>
            <p id="length">Number of pages: {book.length}</p>
            <p id="genre">Genre: {book.genre}</p>
          </div>
        </div>
        <div id="description">
          <p>Description: {book.description}</p>
        </div>
      </div>
    </main>
  );
}