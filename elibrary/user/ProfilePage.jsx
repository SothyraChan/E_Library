import React, { useState } from 'react';
import auth from './../auth/auth-helper';
import DeleteUser from './DeleteUser';
import EditProfile from './EditProfile'; // Import the EditProfile component

const ProfilePage = () => {
  // Access the logged-in user information
  const { user } = auth.isAuthenticated();

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

export default ProfilePage;