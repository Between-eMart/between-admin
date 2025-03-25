import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { OrganizationCdo, QueryResponse } from '~/models';
import { useBusinessMutation } from './hooks';
import React from 'react';

export const OrganizationRegisterFormDialog = (
  {
    onClose,
  }: {
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
        onClose();
        reset();
      },

      onError: (error) => {
        console.error(error);
        const errorMessage =
            (error as AxiosError<QueryResponse<any>, any>)?.response?.data?.failureMessage?.exceptionMessage || 'Error';
        alert(errorMessage);
      },
    },
    );
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register Organization</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Name" {...register('name', { required: true })} margin="normal"/>
          <TextField fullWidth label="Phone" {...register('phone', { required: true })} margin="normal"/>
          <TextField fullWidth label="Email" {...register('email')} margin="normal"/>
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
