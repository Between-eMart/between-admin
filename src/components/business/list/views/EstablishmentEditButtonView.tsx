import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { EstablishmentModifyFormDialog } from '~/components';

export const EstablishmentEditButtonView = (
  {
    establishmentId,
  }: {
    establishmentId: number;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton color="info" onClick={() => setOpen(true)}><EditIcon/></IconButton>
      {open && (<EstablishmentModifyFormDialog establishmentId={establishmentId} onClose={() => setOpen(false)}/>)}
    </>
  );
};
