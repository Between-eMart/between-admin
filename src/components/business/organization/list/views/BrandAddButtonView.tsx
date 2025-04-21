import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { BrandRegisterFormDialog } from '~/components';

export const BrandAddButtonView = (
  {
    organizationId,
    onSuccess,
  }:{
    organizationId: number;
    onSuccess: () => void;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="success" variant="outlined" startIcon={<AddIcon/>} onClick={() => setOpen(true)}>Brand</Button>
      {open && (<BrandRegisterFormDialog organizationId={organizationId} onSuccess={onSuccess} onClose={() => setOpen(false)}/>)}
    </>
  );
};
