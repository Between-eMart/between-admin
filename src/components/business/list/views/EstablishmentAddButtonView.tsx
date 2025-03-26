import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { EstablishmentRegisterFormDialog } from '~/components';

export const EstablishmentAddButtonView = (
  {
    brandId,
  }:{
    brandId: number;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="success" variant="outlined" startIcon={<AddIcon/>} onClick={() => setOpen(true)}>Establishment</Button>
      {open && (<EstablishmentRegisterFormDialog brandId={brandId} onClose={() => setOpen(false)}/>)}
    </>
  );
};
