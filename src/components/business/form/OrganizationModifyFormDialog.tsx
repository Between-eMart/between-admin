import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { Organization, QueryResponse } from '~/models';
import { useBusinessMutation, useOrganization } from './hooks';
import React from 'react';
import { useDialog } from '~/components';

export const OrganizationModifyFormDialog = (
  {
    organizationId,
    onClose,
  }: {
    organizationId: number;
    onClose: () => void;
  },
) => {
  //
  const {
    alert,
  } = useDialog();

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
      <DialogTitle>Modify Organization</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Name" {...register('name', { required: true })} margin="normal"/>
          <TextField disabled fullWidth label="Phone" {...register('phone', { required: true })} margin="normal"/>
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
