import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Avatar from '@material-ui/core/Avatar'
import auth from './../auth/auth-helper'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/core/styles'
import {withStyles} from '@material-ui/core/styles'
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
      id: '',
      name: '',
      price: '',
      length: '',
      author: '',
      yearPublished: '',
      genre: '',
      contentURL: '',
      creationDate: '',
      image: '',
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
          setValues({...values, id: data._id, name: data.name, price: data.price, legnth: data.legnth, author: data.author, yearPublished: data.yearPublished, genre: data.genre, contentURL: data.contentURL, creationDate: data.creationDate})
        }
      })
    return function cleanup(){
      abortController.abort()
    }
  }, [])
  const clickSubmit = () => {
    let booktData = new FormData()
    value.id && bookData.append('id', values.id)
    values.name && bookData.append('name', values.name)
    values.price && bookData.append('price', values.price)
    values.length && bookData.append('length', values.legnth)
    value.author && bookData.append('author', values.author)
    values.yearPublished && bookData.append('yearPublished', values.yearPublished)
    values.genre && bookData.append('length', values.genre)
    values.contentURL && bookData.append('contenURL', values.contentURL)
    values.creationDate && bookData.append('creationDate', values.creationDate)
    values.image && bookData.append('image', values.image)
    
    
    update({
      shopId: match.params.shopId,
      bookId: match.params.bookId
    }, {
      t: jwt.token
    }, bookData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, 'redirect': true})
      }
    })
  }
  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({...values,  [name]: value })
  }
    const imageUrl = values.id
          ? `/api/book/image/${values.id}?${new Date().getTime()}`
          : '/api/book/defaultphoto'
    if (values.redirect) {
      return (<Redirect to={'/elibrary/books/edit/'+match.params.shopId}/>)
    }
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Book
          </Typography><br/>
          <Avatar src={imageUrl} className={classes.bigAvatar}/><br/>
          <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Change Image
              <FileUpload/>
            </Button>
          </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br/>
          <TextField id="id" label="Book ID" className={classes.textField} value={values.id} onChange={handleChange('id')} margin="normal"/><br/>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField id="price" label="Price" className={classes.textField} value={values.price} onChange={handleChange('price')} type="number" margin="normal"/><br/>
          <TextField id="length" label="Length" className={classes.textField} value={values.length} onChange={handleChange('length')} type="number" margin="normal"/><br/>
          <TextField id="author" label="Author" className={classes.textField} value={values.author} onChange={handleChange('author')} margin="normal"/><br/>
          <TextField id="yearPublished" label="Year Published" className={classes.textField} value={values.yearPublished} onChange={handleChange('yearPublished')} type="number" margin="normal"/><br/>
          <TextField id="genre" label="Genre" className={classes.textField} value={values.genre} onChange={handleChange('genre')} margin="normal"/><br/>
          <TextField id="contentURL" label="URL" className={classes.textField} value={values.contentURL} onChange={handleChange('contentURL')} margin="normal"/><br/>
          <TextField id="creationDate" label="Date of Creation" className={classes.textField} value={values.creationDate} onChange={handleChange('creationDate')} type='date' margin="normal" InputLabelProps={{shrink: true,}} variant="outlined"/><br/>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Update</Button>
          <Link to={'/books/edit'+match.params.shopId} className={classes.submit}><Button variant="contained">Cancel</Button></Link>
        </CardActions>
      </Card>
    </div>)
}




{/* <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="3"
            value={values.description}
            onChange={handleChange('description')}
            className={classes.textField}
            margin="normal"
          /><br/> */}




{/* <TextField id="quantity" label="Quantity" className={classes.textField} value={values.quantity} onChange={handleChange('quantity')} type="number" margin="normal"/><br/>
          {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          } */}