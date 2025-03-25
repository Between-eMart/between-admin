import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { OrganizationRegisterFormDialog } from '~/components';

export const OrganizationAddButtonView = () => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" startIcon={<AddIcon/>} onClick={() => setOpen(true)}>Organization</Button>
      {open && (<OrganizationRegisterFormDialog onClose={() => setOpen(false)}/>)}
    </>
  );
};
