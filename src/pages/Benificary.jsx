import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Drawer,
  Box,
  TextField,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export default function Beneficiary() {
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]); // State to store beneficiary data
  const [loading, setLoading] = useState(true); // Loading state for API request
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    number: '',
    department: '', // Default to 'Medical'
  });
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

  // Fetch beneficiaries from the backend API
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await axios.get('https://hackathon-frontend-liart.vercel.app/api/beneficiary');
        setBeneficiaries(response.data); // Set the data from the API into the state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchBeneficiaries();
  }, []); // Empty dependency array to run only once on component mount

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query when the user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4040/api/beneficiary', formData);
      setBeneficiaries((prevState) => [...prevState, response.data]); // Add the new beneficiary to the list
      setIsDrawerOpen(false); // Close the drawer after submitting
    } catch (error) {
      console.error('Error creating beneficiary:', error);
    }
  };

  // Filter beneficiaries based on the search query
  const filteredBeneficiaries = beneficiaries.filter((beneficiary) =>
    (beneficiary.name && beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (beneficiary.nic && beneficiary.nic.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (beneficiary.number && String(beneficiary.number).includes(searchQuery)) || // Convert number to string
    (beneficiary.token && beneficiary.token.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (beneficiary.department && beneficiary.department.toLowerCase().includes(searchQuery.toLowerCase())) // Search through department
  );
  
  return (
    <Grid container spacing={3} style={{ padding: 16 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Beneficiary</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage all beneficiaries assigned to you
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Beneficiary List</Typography>
              <Button variant="contained" onClick={toggleDrawer(true)}>
                Add New Beneficiary
              </Button>
            </Grid>
            {/* Search Input Field */}
            <TextField
              label="Search by Name, NIC, or Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={searchQuery}
              onChange={handleSearchChange} // Update search query on input change
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        {loading ? (
          <Typography variant="h6" color="textSecondary">Loading beneficiaries...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Token</TableCell>
                  <TableCell>Created At</TableCell> {/* Added Created At column */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBeneficiaries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No beneficiaries found</TableCell>
                  </TableRow>
                ) : (
                  filteredBeneficiaries.map((beneficiary) => (
                    <TableRow key={beneficiary._id}>
                      <TableCell>{beneficiary.name}</TableCell>
                      <TableCell>{beneficiary.nic}</TableCell>
                      <TableCell>{beneficiary.department}</TableCell>
                      <TableCell>{beneficiary.number}</TableCell>
                      <TableCell>{beneficiary.token}</TableCell>
                      <TableCell>{new Date(beneficiary.createdAt).toLocaleString()}</TableCell> {/* Displaying createdAt */}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 300, padding: 2 }} role="presentation">
            <Typography variant="h6" gutterBottom>
              Add New Beneficiary
            </Typography>
            <TextField
              label="Beneficiary Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              label="NIC Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="nic"
              value={formData.nic}
              onChange={handleInputChange}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
            />
            <TextField
              label="Department"
              fullWidth
              margin="normal"
              select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              <MenuItem value="Medical">Medical</MenuItem>
              <MenuItem value="Rozgar">Rozgar</MenuItem>
              <MenuItem value="Job">Job</MenuItem>
            </TextField>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={toggleDrawer(false)} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Grid>
    </Grid>
  );
}
