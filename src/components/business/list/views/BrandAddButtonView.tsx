import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { BrandRegisterFormDialog } from '~/components';

export const BrandAddButtonView = (
  {
    organizationId,
  }:{
    organizationId: number;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="success" variant="outlined" startIcon={<AddIcon/>} onClick={() => setOpen(true)}>Brand</Button>
      {open && (<BrandRegisterFormDialog organizationId={organizationId} onClose={() => setOpen(false)}/>)}
    </>
  );
};
