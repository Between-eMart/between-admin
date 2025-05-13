import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Organization } from '~/models';
import { useBusinessMutation, useOrganization } from './hooks';
import React from 'react';

export const OrganizationModifyFormDialog = (
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
    mutation: {
      modifyOrganization,
    },
  } = useBusinessMutation();

  const {
    organization,
  } = useOrganization(organizationId);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Organization>({
    values: organization,
  });

  const onSubmit = async (data: Organization) => {
    //
    await modifyOrganization.mutateAsync({
      organization: { ...data },
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
      <DialogTitle>Modify Organization</DialogTitle>
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
            disabled
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
