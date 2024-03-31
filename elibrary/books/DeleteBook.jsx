import React, { useState } from 'react';
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { remove } from './api-books.js';
import auth from '../auth/auth-helper.js';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  error: {
    padding: '24px'
  },
}));

export default function DeleteBook(props) {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false)

  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const handleDelete = () => {
    remove({bookId : props.bookId}, {t: jwt.token})
      .then(data => {
        if (data && data.error) {
          setError(data.error);
        } else {
          setOpen(false)
          props.onRemove(props.book)
        }
      })
      .catch(err => console.error(err)); // Log any errors during deletion
  };

  const handleRequestClose = () => {
    setOpen(false)
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon/>
      </IconButton>
      <br/> {
            error  && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {error}
            </Typography>)
      }
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete "+props.book.name + "?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete this book: {props.book.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
DeleteBook.propTypes = {
  bookId: PropTypes.string.isRequired,
  book: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}