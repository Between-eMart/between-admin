import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Avatar,
  IconButton,
  Grid2 as Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { EstablishmentDetailRdo } from '~/models';
import { Gallery } from '~/components';

export const EstablishmentDetailDialogView = (
  {
    establishmentRdo,
    onClose,
  }: {
    establishmentRdo: EstablishmentDetailRdo;
    onClose: () => void;
  },
) => {
  //
  return (
    <Dialog open={!!establishmentRdo} onClose={onClose} sx={{ maxWidth: '90%' }} fullWidth>
      <DialogTitle>
        {establishmentRdo.brandIdName.name}
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
          <Grid size={2}>
            <Avatar sx={{ width: 64, height: 64 }} src={establishmentRdo.establishment.logo}> </Avatar>
          </Grid>
          <Grid size={10}>
            <Typography color="text.secondary">
              <strong>Instagram:</strong> {establishmentRdo.establishment.instagramUsername}
            </Typography>
            <Typography>
              <strong>Contact:</strong> {`${establishmentRdo.establishment.contactName} (${establishmentRdo.establishment.contactPhone})`}
            </Typography>
            <Typography>
              <strong>Category:</strong> {establishmentRdo.categories.map(({ name })=> <span>{name}</span>)}
            </Typography>
            <Typography>
              <strong>Location:</strong> {establishmentRdo.physicalAddress?.location || establishmentRdo.virtualAddress?.webUrl}
            </Typography>
          </Grid>
        </Grid>
        <Gallery photos={establishmentRdo.establishment.photos || []}/>
      </DialogContent>
    </Dialog>
  );
};
