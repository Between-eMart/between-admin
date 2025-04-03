import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Updated import path
import CloseIcon from '@mui/icons-material/Close';
import { Influencer } from '~/models';

export const InfluencerDetailDialogView = (
  {
    influencer,
    onClose,
  }: {
    influencer?: Influencer;
    onClose: () => void;
  }) => {
  //
  return (
    <Dialog open={!!influencer} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {`${influencer?.name} ${influencer?.surname}`}
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
          <Grid>
            <Avatar sx={{ width: 64, height: 64 }} />
          </Grid>
          <Grid>
            <Typography color="text.secondary">
              <strong>Instagram:</strong> {influencer?.snsUsername}
            </Typography>
            <Typography>
              <strong>Contact:</strong> {influencer?.mainPhone || influencer?.secondaryPhone}
            </Typography>
            <Typography>
              <strong>Gender:</strong> {influencer?.gender}
            </Typography>
            <Typography>
              <strong>Status:</strong> {influencer?.profileStatus}
            </Typography>
            <Typography>
              <strong>Location:</strong> {`${influencer?.country} ${influencer?.city}`}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
