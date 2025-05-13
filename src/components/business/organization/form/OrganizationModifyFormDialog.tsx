import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Organization } from '~/models';
import { useBusinessMutation, useOrganization } from './hooks';
import React from 'react';
// Import FormHelperText for error messages
import { FormHelperText } from '@mui/material';

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
    formState: { errors },
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
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            aria-label={'Name'}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', {
              required: 'Name is required',
            })}
            margin="normal"
          />
          <TextField
            disabled
            fullWidth
            label="Phone"
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^(\+?\d{1,3})?\s*\d{2,3}\s*\d{2,3}\s*\d{2,3}\s*\d{2,3}$/,
                message: 'Invalid phone number format (example: 998 XX XXX XX XX)',
              },
            })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            margin="normal"
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
