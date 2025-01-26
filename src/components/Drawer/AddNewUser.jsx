import React, { useState } from 'react';
import {
  Drawer,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AddNewUser = ({ open, onClose, fetchUsers }) => {
  const { user } = useAuth();
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState(null);

  const handleAddUser = async () => {
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:4040/api/auth/register',
        newUser,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        alert('User added successfully!');
        fetchUsers();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user.');
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add New User
        </Typography>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <TextField
          label="Role"
          fullWidth
          margin="normal"
          select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          
          
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Receptionist">Receptionist</MenuItem>
          <MenuItem value="Staff">Staff</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </TextField>
       
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleAddUser}
        >
          Save
        </Button>
      </Box>
    </Drawer>
  );
};

export default AddNewUser;
