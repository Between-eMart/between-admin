import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { BrandModifyFormDialog } from '~/components';

export const BrandEditButtonView = (
  {
    brandId,
    onSuccess,
  }: {
    brandId: number;
    onSuccess: () => void;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton color="info" onClick={() => setOpen(true)}><EditIcon/></IconButton>
      {open && (<BrandModifyFormDialog brandId={brandId} onSuccess={onSuccess} onClose={() => setOpen(false)}/>)}
    </>
  );
};
