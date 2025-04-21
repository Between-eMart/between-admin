import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { OrganizationRegisterFormDialog } from '~/components';

export const OrganizationAddButtonView = (
  {
    onSuccess,
  }:  {
    onSuccess: () => void;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="success" variant="outlined" startIcon={<AddIcon/>} onClick={() => setOpen(true)}>Organization</Button>
      {open && (<OrganizationRegisterFormDialog  onSuccess={onSuccess} onClose={() => setOpen(false)}/>)}
    </>
  );
};
