import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import {list} from './api-books.js'
import {Link} from 'react-router-dom'
import DeleteBook from './DeleteBook.jsx'
import auth from './../auth/auth-helper'
import Edit from '@material-ui/icons/Edit'

const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3)
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
    textAlign: 'center',
    fontSize: '1.2em'
  },
  avatar:{
    width: 100,
    height: 100
  },
  subheading: {
    color: theme.palette.text.secondary
  },
  bookTitle: {
    fontSize: '1.2em',
    marginBottom: '5px'
  },
  details: {
    padding: '24px'
  },
  buttonRight:
  {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))
export default function Books()

{
  const classes = useStyles()
  const [books, setBooks] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setBooks(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [])
  const removeBook = (book) => {
    const updatedBooks = [...books]
    const index = updatedBooks.indexOf(book)
    updatedBooks.splice(index, 1)
    setBooks(updatedBooks)
  }

    return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Books
        </Typography>
        <List dense>
        {books.map((book, i) => 
        {
          return <span key={i}>
            <Divider />
              <ListItem>
                <div className={classes.details}>
                  <Typography type="headline" component="h2" color="primary" className={classes.bookTitle}>
                    {book.name}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    {"by " + book.author}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    {"price: " + book.price}
                  </Typography>
                  <Typography type="subheading" component="h4" className={classes.subheading}>
                    {"genre: " + book.genre}
                  </Typography>
                  <Link to={'/books/' + book._id}>
                  <Button>See More</Button>
                  </Link>
                  </div>
                  <div className={classes.buttonRight}>
                  {
                    auth.isAuthenticated() && (<span>
                      <DeleteBook 
                      bookId= {book._id}
                      book = {book}
                      onRemove = {removeBook}/>
                      
                      <Link to={"/books/edit/" + book._id}>
                      <IconButton aria-label="Edit" color="primary">
                      <Edit/>
                      </IconButton>
                      </Link>
                      </span>)
                  }
                  </div>
                  
                
              </ListItem>
            <Divider />
            </span>})
        }
        </List>
      </Paper>
    </div>)
}