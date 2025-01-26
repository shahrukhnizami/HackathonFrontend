import React, { useState } from "react";
import { Button, Drawer, Box, Typography, TextField } from "@mui/material";

const BeneficiaryDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <div>
      {/* Button to open the drawer */}
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Add New Beneficiary
      </Button>

      {/* Drawer Component */}
      <Drawer
        anchor="right" // Can be "left", "top", or "bottom" depending on where you want it
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 300, // Width of the drawer
            padding: 2,
          }}
          role="presentation"
        >
          <Typography variant="h6" gutterBottom>
            Add Beneficiary
          </Typography>

          {/* Form Content */}
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          {/* Actions */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={toggleDrawer(false)}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button variant="contained">Save</Button>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default BeneficiaryDrawer;
