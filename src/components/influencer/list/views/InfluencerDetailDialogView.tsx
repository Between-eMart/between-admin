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

export const InfluencerDetailDialogView = ({ influencer, onClose }) => {
  //
  return (
    <Dialog open={!!influencer} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {influencer.name}
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
            <Avatar sx={{ width: 64, height: 64 }} />
          </Grid>
          <Grid item xs>
            <Typography color="text.secondary">
              <strong>Instagram:</strong> {influencer.instagram}
            </Typography>
            <Typography>
              <strong>Contact:</strong> {influencer.contact}
            </Typography>
            <Typography>
              <strong>Gender:</strong> {influencer.gender}
            </Typography>
            <Typography>
              <strong>Status:</strong> {influencer.status}
            </Typography>
            <Typography>
              <strong>Location:</strong> {influencer.location}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
