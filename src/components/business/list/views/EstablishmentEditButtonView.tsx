import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { EstablishmentModifyFormDialog } from '~/components';

export const EstablishmentEditButtonView = (
  {
    establishmentId,
    onSuccess,
  }: {
    establishmentId: number;
    onSuccess: () => void;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton color="info" onClick={() => setOpen(true)}><EditIcon/></IconButton>
      {open && (<EstablishmentModifyFormDialog establishmentId={establishmentId} onSuccess={onSuccess} onClose={() => setOpen(false)}/>)}
    </>
  );
};
