import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { OrganizationModifyFormDialog } from '~/components';

export const OrganizationEditButtonView = (
  {
    organizationId,
    onSuccess,
  }: {
    organizationId: number;
    onSuccess: () => void;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton color="info" onClick={() => setOpen(true)}><EditIcon/></IconButton>
      {open && (<OrganizationModifyFormDialog organizationId={organizationId} onSuccess={onSuccess} onClose={() => setOpen(false)}/>)}
    </>
  );
};
