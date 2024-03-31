import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import auth from './../auth/auth-helper'
import { makeStyles } from '@material-ui/core/styles'
import {read, update} from './api-books.js'
import {Link, Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    maxWidth: 500,
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
}))

export default function EditBooks ({match}) {
  const classes = useStyles()
  const [values, setValues] = useState({
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
    })

    const jwt = auth.isAuthenticated()
    useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
      read({
        bookId: match.params.bookId
      }, signal).then((data) => {
        if (data.error) {
          setValues({...values, error: data.error})
        } else {
          setValues({...values, 
            name: data.name, 
            price: data.price,
            length: data.length,
            author: data.author,
            yearPublished: data.yearPublished,
            genre: data.genre,
            contentUrl: data.contentUrl
          })
        }
      })
    return function cleanup(){
      abortController.abort()
    }
  }, [])
  const clickSubmit = () => {

    let bookData = new FormData()
    values.name && bookData.append('name', values.name)
    values.price && bookData.append('price', values.price)
    values.length && bookData.append('length', values.length)
    values.author && bookData.append('author', values.author)
    values.yearPublished && bookData.append('yearPublished', values.yearPublished)
    values.genre && bookData.append('genre', values.genre)
    values.contentUrl && bookData.append('contentUrl', values.contentUrl)
    update({
      bookId: match.params.bookId
    }, bookData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, 'redirect': true})
      }
    })
  }
  const handleChange = name => event => {
    setValues({...values,  [name]: event.target.value })
  }
    if (values.redirect) {
      return (<Redirect to={'/books/all'}/>)
    }
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Book
          </Typography><br/>
          <br/>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField id="price" label="Price" className={classes.textField} value={values.price} onChange={handleChange('price')} type="number" margin="normal"/><br/>
          <TextField id="length" label="Length" className={classes.textField} value={values.length} onChange={handleChange('length')} type="number" margin="normal"/><br/>
          <TextField id="author" label="Author" className={classes.textField} value={values.author} onChange={handleChange('author')} margin="normal"/><br/>
          <TextField id="yearPublished" label="Year Published" className={classes.textField} value={values.yearPublished} onChange={handleChange('yearPublished')} type="number" margin="normal"/><br/>
          <TextField id="genre" label="Genre" className={classes.textField} value={values.genre} onChange={handleChange('genre')} margin="normal"/><br/>
          <TextField id="contentUrl" label="URL" className={classes.textField} value={values.contentUrl} onChange={handleChange('contentUrl')} margin="normal"/><br/>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Update</Button>
          <Link to={'/books/all'} className={classes.submit}><Button variant="contained">Cancel</Button></Link>
        </CardActions>
      </Card>
    </div>)
}