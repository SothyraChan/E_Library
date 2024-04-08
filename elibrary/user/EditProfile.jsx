import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import auth from './../auth/auth-helper';
import {read, update} from './api-user.js';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

export default function EditProfile (props) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    admin: false,
    redirectToProfile: false,
    error: ''
  });
  // reference to authenticated user.
  const jwt = auth.isAuthenticated()

useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      userId: props.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name: data.name, email: data.email, admin: data.admin})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [props.userId])


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = () => {
    setValues({ ...values, admin: !values.admin });
  };

  const clickSubmit = () => {
    if (values.password == '')
    {
        window.alert("Please insert your password");
    }
    else
    {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        admin: values.admin
      };
      
      // Call the update function from the API
      update({
        userId: props.userId
      }, {
        t: jwt.token
      }, userData).then(response => {
        if (response && response.error) {
          setValues({...values,  error: response.error});
        } else {
          auth.updateUser(data, ()=>{
            setValues({...values, 'userId': data._id, 'redirectToProfile': true})
          })
        }
      });
  }
  };
  if (values.redirectToProfile) {
    return (<Redirect to={'/'}/>)
  }
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Edit Profile</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '10px', width: '20%' }}>
              <Typography variant="subtitle1">Name:</Typography>
              <TextField
                id="name"
                size="small"
                fullWidth
                value={values.name}
                onChange={handleChange('name')}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '10px', width: '20%' }}>
              <Typography variant="subtitle1">Email:</Typography>
              <TextField
                id="email"
                size="small"
                fullWidth
                value={values.email}
                onChange={handleChange('email')}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '10px', width: '20%' }}>
              <Typography variant="subtitle1">Password:</Typography>
              <TextField
                id="password"
                size="small"
                type="password"
                fullWidth
                value={values.password}
                onChange={handleChange('password')}
              />
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="subtitle1">Admin Account</Typography>
        <label>
          <input
            type="checkbox"
            checked={values.admin}
            onChange={handleCheck}
          />
          {values.admin ? 'Active' : 'Inactive'}
        </label>
        <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error">There's been an error. </Icon>
              {values.error}
            </Typography>)
          }
      </CardContent>
      <CardActions>
        <Link to={"/"}><Button color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </Button></Link>
      </CardActions>
    </Card>
  );
};
EditProfile.propTypes = {
  userId: PropTypes.string.isRequired
}
