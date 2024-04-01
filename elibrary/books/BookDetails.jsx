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
      <div className="container" style={{ width: '80%', backgroundColor: 'white', borderRadius: '15px', padding: '8px', margin: 'auto', boxShadow: '0 0 10px rgb(115, 115, 115)' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img src={book.bookPic} alt="Bookicon" style={{ width: '100px', borderRadius:'10px' }} />
          <div className="book-details" style={{ marginLeft: '15px' }}>
            <h4 id="book-name">{book.bookName}</h4>
            <p id="price">Price: {book.price}</p>
            <p id="author">Author: {book.author}</p>
            <p id="date-pub">Publication Date: {book.publicationDate}</p>
          </div>
        </div>
        <div>
          <p>In the mystical land of Eliria, where the sun kisses the sky and the
            moon whispers secrets to the stars, lies the tale of
            "{book.bookName}." Within the ancient pages of this enchanted
            book, one discovers the untold stories of heroes and heroines, whose
            bravery echoes through the ages.

            From the sprawling forests of Eldoria to the towering peaks of Mount
            Celestia, the adventures unfold like petals of a blooming flower, each
            chapter revealing a new mystery waiting to be unraveled. Through
            perilous journeys and daring escapades, the characters navigate
            treacherous paths in pursuit of truth and justice.</p>
        </div>
      </div>
    </main>
  );
}

export default BookComponent;