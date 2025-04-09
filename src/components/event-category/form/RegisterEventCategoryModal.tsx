import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useEventCategoryMutation } from '~/hooks';
import { AxiosError } from 'axios';
import { FailureResponse } from '~/models';

const RegisterEventCategoryModal = ({ open, handleClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const {
    mutation: { registerEventCategory },
  } = useEventCategoryMutation();

  const onSubmit = async (data) => {
    registerEventCategory.mutate(
      {
        eventCategoryCdo: { ...data },
      },
      {
        onSuccess: async () => {
          //
          handleClose();
          reset();
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

export default RegisterEventCategoryModal;
