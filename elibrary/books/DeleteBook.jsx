import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { remove } from './api-books.js';
import auth from '../auth/auth-helper.js';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function DeleteProduct({ productId }) {
  const classes = useStyles();
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = () => {
    const jwt = auth.isAuthenticated();
    remove({ productId }, auth.authenticate)
      .then(data => {
        if (data && data.error) {
          setError(data.error);
        } else {
          setDeleted(true);
        }
      })
      .catch(err => console.error(err)); // Log any errors during deletion
  };

  if (deleted) {
    return <p>This product has been deleted</p>;
  }

  return (
    <div>
      <Button onClick={handleDelete} color="secondary" variant="contained" className={classes.button}>
        Delete
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
}
