import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Brand } from '~/models';
import { useBrandRdo, useBusinessMutation } from './hooks';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const brandSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  organizationId: Yup.string()
    .required('OrganizationID is required'),
});

const formSchema = brandSchema.required('Brand is required');

export const BrandModifyFormDialog = (
  {
    brandId,
    onSuccess,
    onClose,
  }: {
    brandId: number;
    onSuccess: () => void;
    onClose: () => void;
  },
) => {
  //
  const {
    mutation: {
      modifyBrand,
    },
  } = useBusinessMutation();

  const {
    brandRdo,
  } = useBrandRdo(brandId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Brand>({
    values: brandRdo?.brand,
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (data: Brand) => {
    //
    await modifyBrand.mutateAsync({
      brand: { ...data },
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
      <DialogTitle>Modify Brand</DialogTitle>
      <DialogContent>
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
