import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <Grid container spacing={3} style={{ padding: 16 }}>
      {/* Welcome Title */}
      <Grid item xs={12}>
        <Typography variant="h4">Welcome to the {user.name} Dashboard</Typography>
        <Typography variant="subtitle1" color="textSecondary">
        {user.email}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Monitor key metrics and performance.
        </Typography>
       
      </Grid>

      {/* Bar Chart Section */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quarterly Performance Metrics
            </Typography>
            <BarChart
              series={[
                { label: 'Product A', data: [35, 44, 24, 34] },
                { label: 'Product B', data: [51, 6, 49, 30] },
                { label: 'Product C', data: [15, 25, 30, 50] },
                { label: 'Product D', data: [60, 50, 15, 25] },
              ]}
              height={300}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
