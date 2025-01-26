import React from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider, useAuth } from '../context/AuthContext'; // Import the useAuth hook

const Login = () => {
  const { login } = useAuth(AuthProvider); // Correctly use the useAuth hook
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    console.log({ email, password });

    try {
      const response = await axios.post(
        // "https://backend-rms.vercel.app/api/auth/login",
        "https://hackathon-backend-mu-pearl.vercel.app/api/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        // Use the login function from AuthContext to set the user
        login({ ...user, token });

        // Redirect user based on their role
        if (user.role === 'Admin') {
          navigate('/admin');
        } else if (user.role === 'Agent') {
          navigate('/agent');
        } else if (user.role === 'User') {
          navigate('/user');
        }
        else if (user.role === 'Reception') {
          navigate('/reception');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZkmOfnH5s5nqfhX1FQhV5J-yv4iAtWcVf1mLpWFDujTzg48yHEiCOiAdr5YQ7BwIx69w&usqp=CAU"
          alt="MUI logo"
        />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
