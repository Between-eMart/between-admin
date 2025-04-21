import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { BrandCdo } from '~/models';
import { useBusinessMutation } from './hooks';
import React from 'react';

export const BrandRegisterFormDialog = (
  {
    organizationId,
    onSuccess,
    onClose,
  }: {
    organizationId: number;
    onSuccess: () => void;
    onClose: () => void;
  },
) => {
  //
  const {
    defaultBrandCdo,
    mutation: {
      registerBrand,
    },
  } = useBusinessMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<BrandCdo>({
    defaultValues: defaultBrandCdo,
  });

  const onSubmit = async (data: BrandCdo) => {
    //
    await registerBrand.mutateAsync({
      brandCdo: { ...data, organizationId },
    },
    {
      onSuccess: async () => {
        //
        onSuccess();
        onClose();
        reset();
      },
    });
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register Brand</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Name" {...register('name', { required: true })} margin="normal"/>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
