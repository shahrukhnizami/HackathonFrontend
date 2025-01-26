import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';

const TenantPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tenant Management
      </Typography>
      
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Tenant Info</Typography>
                <Typography>View and manage tenant details here.</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Lease Information</Typography>
                <Typography>Manage lease agreements, payments, etc.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Add more components as needed */}
        </Grid>
      </Box>
    </Container>
  );
};

export default TenantPage;
