import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
  Button,
  IconButton,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import AddNewUser from '../../components/Drawer/AddNewUser';

const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [editDialogOpen, setEditDialogOpen] = useState(false);
// const [selectedUser, setSelectedUser] = useState(null);

const openDeleteDialog = (user) => {
  console.log('Selected user for deletion:', user); // Debugging
  setSelectedUser(user);
  setDeleteDialogOpen(true);
};

  
  const closeDeleteDialog = () => {
    setSelectedUser(null);
    setDeleteDialogOpen(false);
  };
  
  const openEditDialog = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };
  
  const closeEditDialog = () => {
    setSelectedUser(null);
    setEditDialogOpen(false);
  };
  


  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:4040/api/auth/users', {
      // const response = await axios.get('https://backend-rms.vercel.app/api/auth/users', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log(response.data?.users); // Inspect the structure here
      setUsers(response.data?.users || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };
  
  
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });
  
  const deleteUser = async (userId) => {
    console.log('User ID to delete:', userId); // Debugging
    try {
      // const response = await axios.delete(`https://backend-rms.vercel.app/api/auth/users/${userId}`, {
      const response = await axios.delete(`http://localhost:4040/api/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSnackbar({ open: true, message: response.data.message, severity: 'success' });
      fetchUsers(); // Refresh the users list
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to delete user',
        severity: 'error',
      });
    }
  };
  
  
  // Add Snackbar component to your JSX
  <Snackbar
  open={snackbar.open}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
  message={snackbar.message}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  severity={snackbar.severity}
/>
  

  const editUser = (user) => {
    setSelectedUser(user); // Set the selected user to edit
    setDrawerOpen(true); // Open the drawer for editing
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div className="m-5">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          All Users
        </Typography>
        <Button variant="contained" onClick={() => setDrawerOpen(true)}>
          Add New User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
             <TableRow key={user._id || user.id}>
              <TableCell>
                <Avatar src={user.image || ''} alt={user.name} />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: user.role === 'Admin' ? '#D32F2F' : '#1976D2',
                  }}
                >
                  {user.role}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => openEditDialog(user)} color="primary" sx={{ marginRight: 2 }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => openDeleteDialog(user)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
            
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog open={editDialogOpen} onClose={closeEditDialog} fullWidth maxWidth="sm">
  <DialogTitle>Edit User</DialogTitle>
  <DialogContent>
    <AddNewUser 
      userToEdit={selectedUser} 
      onClose={closeEditDialog} 
      fetchUsers={fetchUsers} 
    />
  </DialogContent>
</Dialog>
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    <Typography>Are you sure you want to delete {selectedUser?.name}?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={closeDeleteDialog} color="primary">Cancel</Button>
    <Button 
  onClick={() => {
    deleteUser(selectedUser?._id || selectedUser?.id); // Use the correct ID property
    closeDeleteDialog();
  }} 
  color="error"
>
  Delete
</Button>
  </DialogActions>
</Dialog>

      <AddNewUser
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        fetchUsers={fetchUsers}
        userToEdit={selectedUser} // Passing the user to be edited
      />
    </div>
  );
};

export default Users;
