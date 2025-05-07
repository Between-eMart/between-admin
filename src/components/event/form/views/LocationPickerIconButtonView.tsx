import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React, { useState } from 'react';
import MapIcon from '@mui/icons-material/Map';
import { YandexLocationPicker } from '~/components';

export const LocationPickerIconButtonView = (
  {
    onAddLinkSet,
  }: {
    onAddLinkSet: (addressLink: string) => void;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MapIcon/>
      </IconButton>
      {open && (
        <Dialog open={true} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Pick Location</DialogTitle>
          <DialogContent>
            <YandexLocationPicker onSet={address => onAddLinkSet(address.mapUrl)}/>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
