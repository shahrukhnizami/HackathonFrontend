import React from 'react';
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
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Sample task data
const taskData = [
  {
    id: 1,
    title: 'Inspect Sunny Apartments',
    description: 'Perform a routine inspection of the apartment complex.',
    dueDate: '2025-01-15',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Meet with tenant at Green Valley',
    description: 'Discuss lease renewal with tenant.',
    dueDate: '2025-01-20',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Prepare rental agreement',
    description: 'Draft rental agreement for Blue Lagoon Offices.',
    dueDate: '2025-01-25',
    status: 'Completed',
  },
];

export default function Tasks() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'In Progress':
        return 'info';
      case 'Completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Grid container spacing={3} style={{ padding: 16 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Tasks</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage all your assigned tasks
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Task List</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => alert('Add new task clicked!')}
              >
                Add Task
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taskData.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={task.status}
                      color={getStatusColor(task.status)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
