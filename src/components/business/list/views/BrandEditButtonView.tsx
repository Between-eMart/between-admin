import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { BrandModifyFormDialog } from '~/components';

export const BrandEditButtonView = (
  {
    brandId,
  }: {
    brandId: number;
  },
) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton color="info" onClick={() => setOpen(true)}><EditIcon/></IconButton>
      {open && (<BrandModifyFormDialog brandId={brandId} onClose={() => setOpen(false)}/>)}
    </>
  );
};
