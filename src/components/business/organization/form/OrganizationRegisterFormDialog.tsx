import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { OrganizationCdo } from '~/models';
import { useBusinessMutation } from './hooks';
import React from 'react';

export const OrganizationRegisterFormDialog = (
  {
    onSuccess,
    onClose,
  }: {
    onSuccess: () => void;
    onClose: () => void;
  },
) => {
  //
  const {
    defaultOrganizationCdo,
    mutation: {
      registerOrganization,
    },
  } = useBusinessMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<OrganizationCdo>({
    defaultValues: defaultOrganizationCdo,
  });

  const onSubmit = async (data: OrganizationCdo) => {
    //
    await registerOrganization.mutateAsync({
      organizationCdo: { ...data },
    },
    {
      onSuccess: async () => {
        //
        onSuccess();
        onClose();
        reset();
      },
    },
    );
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register Organization</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('name', { required: true })}
          />
          <TextField
            fullWidth
            label="Phone"
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('phone', { required: true })}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('email', { required: true })}
          />
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
