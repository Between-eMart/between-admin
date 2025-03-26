import {
  Box,
  Button, Chip,
  Dialog,
  DialogContent,
  DialogTitle, FormControl,
  InputLabel, MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { Establishment, QueryResponse } from '~/models';
import { useBusinessMutation, useEstablishmentRdo } from './hooks';
import React from 'react';
import { useDialog, useEstablishmentCategories } from '~/components';

export const EstablishmentModifyFormDialog = (
  {
    establishmentId,
    onClose,
  }: {
    establishmentId: number,
    onClose: () => void;
  },
) => {
  //
  const {
    alert,
  } = useDialog();

  const {
    mutation: {
      modifyEstablishment,
    },
  } = useBusinessMutation();

  const {
    establishmentRdo,
  } = useEstablishmentRdo(establishmentId);

  const {
    establishmentCategories,
  } = useEstablishmentCategories();

  const {
    watch,
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<Establishment>({
    values: establishmentRdo?.establishment,
  });

  const onSubmit = async (data: Establishment) => {
    //
    await modifyEstablishment.mutateAsync({
      establishment: { ...data },
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
  // categoryIds

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register Establishment</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Instagram" {...register('instagramUsername', { required: true })} margin="normal"/>
          <TextField fullWidth label="Description" {...register('description', { required: true })} margin="normal"/>
          <TextField fullWidth label="Contact Name" {...register('contactName', { required: true })} margin="normal"/>
          <TextField fullWidth label="Contact Phone" {...register('contactPhone', { required: true })} margin="normal"/>
          <TextField fullWidth label="Logo" {...register('logo', { required: true })} margin="normal"/>
          <TextField fullWidth label="Photos" {...register('photos', { required: true })} margin="normal"/>
          <FormControl fullWidth margin="normal">
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={watch('categoryIds') || []}
              onChange={(e) => {
                const targetCategoryIds = e.target.value as number[];
                setValue('categoryIds', targetCategoryIds);
              }}
              input={<OutlinedInput label="Categories"/>}
              renderValue={(selected) => {
                const selectedCategories = establishmentCategories.filter(category => selected.includes(category.id));
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedCategories.map((category) => (
                      <Chip key={category.id} label={category.name} />
                    ))}
                  </Box>
                );
              }}
            >
              {establishmentCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
