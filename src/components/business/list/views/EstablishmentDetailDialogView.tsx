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
import { YandexLocationViewer } from '~/components/shared/YandexLocationViewer';

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
  const location = establishmentRdo.physicalAddress?.location?.split(', ').map(val => Number.parseFloat(val));

  return (
    <Dialog open={!!establishmentRdo} onClose={onClose} maxWidth={'md'} fullWidth>
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
          </Grid>



          {establishmentRdo.physicalAddress && (<Grid container spacing={2} alignItems="center">
            <Grid size={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>
                  <strong>Country:</strong> {establishmentRdo.physicalAddress.country}
                </Typography>
                <Typography>
                  <strong>City:</strong> {establishmentRdo.physicalAddress.city}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {establishmentRdo.physicalAddress.addressLine1} {establishmentRdo.physicalAddress.addressLine2}
                </Typography>
                <Typography>
                  <strong>Post Code:</strong> {establishmentRdo.physicalAddress.postIndex || 'NA'}
                </Typography>
              </div>
            </Grid>
            <Grid size={12}>
                {location && <YandexLocationViewer latitude={location[0]} longitude={location[1]}/>}
            </Grid>
          </Grid>)}
        </Grid>

        <Gallery photos={establishmentRdo.establishment.photos || []}/>
      </DialogContent>
    </Dialog>
  );
};
