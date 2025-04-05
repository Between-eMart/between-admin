import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

import { AxiosError } from 'axios';
import { QueryResponse } from '~/models';
import { useInfluencerCategoryMutation } from '~/components';

export const RegisterInfluencerCategoryModal = ({ open, handleClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const {
    mutation: { registerInfluencerCategory },
  } = useInfluencerCategoryMutation();

  const onSubmit = async (data) => {
    registerInfluencerCategory.mutate(
      {
        influencerCategoryCdo: { ...data },
      },
      {
        onSuccess: async () => {
          //
          handleClose();
          reset();
        },

        onError: (error) => {
          const errorMessage =
            (error as AxiosError<QueryResponse<any>, any>)?.response?.data?.failureMessage?.exceptionMessage || 'Error';
          alert(errorMessage);
        },
      },
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Event Category
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Name" {...register('name', { required: true })} margin="normal" />
          <TextField fullWidth label="Description" {...register('description')} margin="normal" />
          <TextField fullWidth label="Code" {...register('code', { required: true })} margin="normal" />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
