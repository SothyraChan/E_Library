import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import {create} from './api-books.js'
import {Link, Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
}))

export default function NewBook() {
  const classes = useStyles()
  const [values, setValues] = useState({
      name: '',
      price: '',
      length: '',
      author: '',
      yearPublished : '',
      genre : '',
      contentUrl: '',
      redirect: false,
      error: ''
  })
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value })
  }
  const clickSubmit = () => {
    let bookData = new FormData()
    values.name && bookData.append('name', values.name)
    values.price && bookData.append('price', values.price)
    values.length && bookData.append('length', values.length)
    values.author && bookData.append('author', values.author)
    values.yearPublished && bookData.append('yearPublished', values.yearPublished)
    values.genre && bookData.append('genre', values.genre)
    values.contentUrl && bookData.append('contentUrl', values.contentUrl)
    
    create(bookData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, error: '', redirect: true})
      }
    })
  }

    if (values.redirect) {
      return (<Redirect to={'/'}/>)
    }
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            New Book
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField id="price" label="Price" className={classes.textField} value={values.price} onChange={handleChange('price')} type="number" margin="normal"/><br/>
          <TextField id="length" label="Length (Page Number)" className={classes.textField} value={values.length} onChange={handleChange('length')} type="number" margin="normal"/><br/>
          <TextField id="author" label="Author" className={classes.textField} value={values.author} onChange={handleChange('author')} margin="normal"/><br/>
          <TextField id="yearPublished" label="Year" className={classes.textField} value={values.yearPublished} onChange={handleChange('yearPublished')} type="number" margin="normal"/><br/>
          <TextField id="genre" label="Genre" className={classes.textField} value={values.genre} onChange={handleChange('genre')} margin="normal"/><br/>
          <TextField id="contentUrl" label="URL" className={classes.textField} value={values.contentUrl} onChange={handleChange('contentUrl')} margin="normal"/><br/>
          <br/> 
          {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>There's an error;</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
          <Link to='/' className={classes.submit}><Button variant="contained">Cancel</Button></Link>
        </CardActions>
      </Card>
    </div>)
}
