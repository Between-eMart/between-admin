import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { OrganizationModifyFormDialog } from '~/components';

export const OrganizationEditButtonView = (
  {
    organizationId,
  }: {
    organizationId: number;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton color="info" onClick={() => setOpen(true)}><EditIcon/></IconButton>
      {open && (<OrganizationModifyFormDialog organizationId={organizationId} onClose={() => setOpen(false)}/>)}
    </>
  );
};
