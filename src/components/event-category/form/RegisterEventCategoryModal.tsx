import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEventCategoryMutation } from '~/hooks';
import { EventCategoryCdo } from '~/models';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDialog } from '~/components';

const eventCategoryCdoSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string(), // optional
  code: Yup.string().required('Code is required'),
});

const formSchema = eventCategoryCdoSchema.required('EventCategoryCdo is required');

const RegisterEventCategoryModal = ({ open, handleClose }) => {
  //
  const {
    alert,
  } = useDialog();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventCategoryCdo>({
    defaultValues: {
      name: '',
      description: '',
      code: '',
    },
    resolver: yupResolver(formSchema),
  });

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
          alert('Event category registered successfully.');
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
          <TextField
            required
            fullWidth
            label="Name"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description')}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Code"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.code}
            helperText={errors.code?.message}
            {...register('code')}
            margin="normal"
          />
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
