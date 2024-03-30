import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { update } from './api-user.js';

const EditProfile = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    admin: false
  });

  useEffect(() => {
    // Load user data here if needed
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = () => {
    setValues({ ...values, admin: !values.admin });
  };

  const clickSubmit = () => {
    const confirmed = window.confirm('Do you really want to change?');
    if (confirmed) {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        admin: values.admin
      };
  
      // Call the update function from the API
      update(userData).then(response => {
        if (response.error) {
          console.error('Error updating user profile:', response.error);
        } else {
          console.log('User profile updated successfully');
          // Optionally, handle any state updates or notifications here
        }
      });
    }
  };

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
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditProfile;