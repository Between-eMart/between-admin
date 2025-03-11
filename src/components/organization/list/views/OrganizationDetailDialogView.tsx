import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Avatar,
  IconButton,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const OrganizationDetailDialogView = ({ organization, onClose }) => {
  //
  return (
    <Dialog open={!!organization} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {organization.name}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 64, height: 64 }}> </Avatar>
          </Grid>
          <Grid item xs>
            <Typography color="text.secondary">
              <strong>Instagram:</strong> {organization.instagram}
            </Typography>
            <Typography>
              <strong>Contact:</strong> {organization.contact}
            </Typography>
            <Typography>
              <strong>Gender:</strong> {organization.category}
            </Typography>
            <Typography>
              <strong>Location:</strong> {organization.location}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
