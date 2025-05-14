import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { OrganizationCdo } from '~/models';
import { useBusinessMutation } from './hooks';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const organizationCdoSchema = Yup.object().shape({
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

const formSchema = organizationCdoSchema.required('OrganizationCdo is required');

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
    formState: { errors },
  } = useForm<OrganizationCdo>({
    defaultValues: defaultOrganizationCdo,
    resolver: yupResolver(formSchema),
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
            required
            fullWidth
            label="Name"
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />
          <TextField
            required
            fullWidth
            label="Phone"
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            {...register('phone')}
          />
          <TextField
            required
            fullWidth
            label="Email"
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
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
