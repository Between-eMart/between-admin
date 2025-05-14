import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Organization } from '~/models';
import { useBusinessMutation, useOrganization } from './hooks';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const organizationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(/^(\+?\d{1,3})?\s*\d{2,3}\s*\d{2,3}\s*\d{2,3}\s*\d{2,3}$/, 'Invalid phone number format (example: 998 XX XXX XX XX)'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string(), // optional
  phoneVerified: Yup.boolean(), // optional
  emailVerified: Yup.boolean(), // optional
});

const formSchema = organizationSchema.required('Organization is required');

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
    resolver: yupResolver(formSchema),
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
            required
            fullWidth
            label="Name"
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
            margin="normal"
          />
          <TextField
            required
            disabled
            fullWidth
            label="Phone"
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            {...register('phone')}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Email"
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
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
