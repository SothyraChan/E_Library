import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookComponent = () => {
  // const { bookId } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    // Make an API call to fetch book details
    axios.get('http://localhost:3000/api/books/${bookId}')
      .then(response => {
        // Assuming the response data has structure like { bookName, price, author, publicationDate }
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, []);

  return (
    <main style={{ width: '100vw', height: '100vh', backgroundColor: 'rgb(189, 200, 220)' }}>

    </main>
  );
}

export default BookComponent;
