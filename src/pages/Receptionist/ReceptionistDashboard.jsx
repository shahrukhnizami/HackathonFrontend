import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Drawer, Box, TextField, MenuItem } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAuth } from '../../context/AuthContext';

export default function ReceptionistDashboard() {
  const { user } = useAuth();
  

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <Grid container spacing={3} style={{ padding: 16 }}>
      {/* Dashboard Title */}
      <Grid item xs={12}>
        <Typography variant="h4">Welcome to the {user.name} Dashboard</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {user.email}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your properties, inquiries, and performance metrics.
        </Typography>
      </Grid>

      {/* Client Inquiries Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Beneficiary Inquiries</Typography>
            <Typography variant="body2">
              View and respond to Beneficiary inquiries effectively.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Property Listings Section */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Client Inquiries</Typography>
            <Typography variant="body2">
              View and respond to client inquiries effectively.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Performance Metrics Bar Chart */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            <BarChart
              series={[
                { label: 'Property Views', data: [120, 200, 150, 220] },
                { label: 'Inquiries', data: [30, 40, 20, 50] },
              ]}
              height={300}
              xAxis={[{ data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], scaleType: 'band' }]}
              margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Drawer for Adding New Beneficiary */}
      
    </Grid>
  );
}
