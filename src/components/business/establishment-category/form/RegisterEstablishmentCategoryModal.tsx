import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useBusinessMutation, useDialog } from '~/components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { EstablishmentCategoryCdo } from '~/models';

const establishmentCategoryCdoSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  note: Yup.string(), // optional
});

const formSchema = establishmentCategoryCdoSchema.required('EstablishmentCategoryCdo is required');

export const RegisterEstablishmentCategoryModal = ({ open, handleClose }) => {
  //
  const {
    alert,
  } = useDialog();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EstablishmentCategoryCdo>({
    defaultValues: {
      name: '',
      note: '',
    },
    resolver: yupResolver(formSchema),
  });
  const {
    mutation: {
      registerEstablishmentCategory,
    },
  } = useBusinessMutation();

  const onSubmit = async (data) => {
    //
    await registerEstablishmentCategory.mutateAsync({
      establishmentCategoryCdo: { ...data },
    },
    {
      onSuccess: async () => {
        //
        alert('Establishment category registered successfully.');
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
          Add Establishment Category
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
            label="Note"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.note}
            helperText={errors.note?.message}
            {...register('note')}
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
