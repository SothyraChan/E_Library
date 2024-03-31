import React, { useState, useEffect } from 'react';
import auth from './../auth/auth-helper';
import DeleteUser from './DeleteUser';
import EditProfile from './EditProfile'; // Import the EditProfile component
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'

export default function ProfilePage({ match }) {
  // Access the logged-in user information
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [match.params.userId])

  // State to manage the visibility of edit and delete buttons
  const [editDeleteVisible, setEditDeleteVisible] = useState(false);

  // Function to toggle the visibility of edit and delete buttons
  const toggleEditDelete = () => {
    setEditDeleteVisible(!editDeleteVisible);
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Button to toggle visibility of edit and delete buttons */}
        <button onClick={toggleEditDelete}>Edit / Delete</button>
        {/* Edit and Delete buttons */}
        {editDeleteVisible && (
          <div>
            {/* Button to delete the user */}
            <DeleteUser userId={user._id} />
            {/* Button to edit user profile */}
            <EditProfile userId={user._id} />
          </div>
        )}
      </div>
    </div>
  );
};