import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip, CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { CommandResponse, Establishment, EstablishmentCdo, PhysicalAddressCdo, VirtualAddressCdo } from '~/models';
import { useBusinessMutation } from './hooks';
import React, { SyntheticEvent, useRef, useState, useEffect, useMemo } from 'react';
import { useEstablishmentCategories, YandexLocationPicker } from '~/components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TimezoneSelect from 'react-timezone-select';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';

export const EstablishmentRegisterFormDialog = (
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
  const [addressTabValue, setAddressTabValue] = useState('physical');

  const {
    defaultEstablishmentCdo,
    defaultPhysicalAddressCdo,
    defaultVirtualAddressCdo,
    mutation: {
      registerEstablishment,
      registerPhysicalAddress,
      registerVirtualAddress,
    },
  } = useBusinessMutation();

  const { establishmentCategories } = useEstablishmentCategories(1000);

  const {
    watch,
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<{
    establishmentCdo: EstablishmentCdo;
    physicalAddressCdo: PhysicalAddressCdo;
    virtualAddressCdo: VirtualAddressCdo;
  }>({
    defaultValues: {
      establishmentCdo: defaultEstablishmentCdo,
      physicalAddressCdo: defaultPhysicalAddressCdo,
      virtualAddressCdo: defaultVirtualAddressCdo,
    },
  });

  const handleAddressTabValueChange = (event: SyntheticEvent, newValue: string) => {
    //
    setAddressTabValue(newValue);
  };

  async function handleRegisterPhysicalAddress(physicalAddressCdo: PhysicalAddressCdo) {
    //
    await registerPhysicalAddress.mutateAsync({ physicalAddressCdo });
  }

  async function handleRegisterVirtualAddress(virtualAddressCdo: VirtualAddressCdo) {
    //
    await registerVirtualAddress.mutateAsync({ virtualAddressCdo });
  }

  const onSubmit = async (data: {
    establishmentCdo: EstablishmentCdo;
    physicalAddressCdo: PhysicalAddressCdo;
    virtualAddressCdo: VirtualAddressCdo;
  }) => {
    //
    await registerEstablishment.mutateAsync({
      establishmentCdo: { ...data.establishmentCdo, brandId },
    },
    {
      onSuccess: async (response: CommandResponse<Establishment>) => {
        //
        const establishmentId = response.response?.id || 0;
        if (addressTabValue == 'physical') {
          await handleRegisterPhysicalAddress({ ...data.physicalAddressCdo, establishmentId });
        } else {
          await handleRegisterVirtualAddress({ ...data.virtualAddressCdo, establishmentId });
        }
        onSuccess();
        onClose();
        reset();
      },
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //
    const files = event.target.files;
    if (files && files.length > 0) {
      setValue('establishmentCdo.logo', files[0], { shouldValidate: true });
    }
  };

  const handlePhotosUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //
    const files = event.target.files;
    if (files && files.length > 0) {
      setValue('establishmentCdo.photos', Array.from(files), { shouldValidate: true });
    }
  };

  const watchLogo = watch('establishmentCdo.logo');
  const watchPhotos = watch('establishmentCdo.photos');
  const watchCategoryIds = watch('establishmentCdo.categoryIds') || [];

  const selectedCategories = establishmentCategories.filter(category =>
    watchCategoryIds.includes(category.id),
  );

  return (
    <Dialog open={true} onClose={onClose} maxWidth={'md'} fullWidth>
      <DialogTitle>Register Establishment</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Instagram" {...register('establishmentCdo.instagramUsername', { required: true })}
                     margin="normal"/>
          <TextField fullWidth label="Description" {...register('establishmentCdo.description', { required: true })}
                     margin="normal"/>
          <TextField fullWidth label="Contact Name" {...register('establishmentCdo.contactName', { required: true })}
                     margin="normal"/>
          <TextField fullWidth label="Contact Phone" {...register('establishmentCdo.contactPhone', { required: true })}
                     margin="normal"/>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              backgroundColor: 'background.paper',
              mb: 2,
            }}
          >
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="logo-upload"
              type="file"
              onChange={handleLogoUpload}
            />
            <label htmlFor="logo-upload">
              <Button variant="outlined" component="span" startIcon={<CloudUploadIcon/>} sx={{ mb: 1 }}>
                Upload Logo
              </Button>
            </label>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Upload high-quality Logo (JPEG, PNG)
            </Typography>

            {watchLogo && (
              <Typography variant="body2" color="primary">
                {watchLogo.name}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              backgroundColor: 'background.paper',
              mb: 2,
            }}
          >
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="photos-upload"
              type="file"
              onChange={handlePhotosUpload}
              multiple
            />
            <label htmlFor="photos-upload">
              <Button variant="outlined" component="span" startIcon={<CloudUploadIcon/>} sx={{ mb: 1 }}>
                Upload Photos
              </Button>
            </label>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Upload high-quality photos (JPEG, PNG)
            </Typography>

            {watchPhotos?.map(photo => (
              <Typography variant="body2" color="primary">
                {photo.name}
              </Typography>
            ))}
          </Box>
          <TabContext value={addressTabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleAddressTabValueChange} aria-label="lab API tabs example">
                <Tab label="Physical" value="physical"/>
                <Tab label="Virtual" value="virtual"/>
              </TabList>
            </Box>
            <TabPanel value="physical">
              <YandexLocationPicker
                onSet={address => setValue('physicalAddressCdo', { ...address } as PhysicalAddressCdo)}/>
            </TabPanel>
            <TabPanel value="virtual">
              <Card>
                <CardContent>
                  <TimezoneSelect
                    placeholder={'Select Timezone'}
                    value={watch('virtualAddressCdo.timezone')}
                    onChange={(selected) => setValue('virtualAddressCdo.timezone', selected.value)}
                  />
                  <TextField fullWidth
                             label="Web URL" {...register('virtualAddressCdo.webUrl', { required: addressTabValue === 'virtual' })}
                             margin="normal"/>
                </CardContent>
              </Card>
            </TabPanel>
          </TabContext>

          <Autocomplete
            multiple
            id="establishment-categories"
            options={establishmentCategories}
            getOptionLabel={(option) => option.name}
            value={selectedCategories}
            onChange={(event, newValue) => {
              const newCategoryIds = newValue.map(category => category.id);
              setValue('establishmentCdo.categoryIds', newCategoryIds);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Categories"
                placeholder="Search categories"
                margin="normal"
                fullWidth
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
            filterSelectedOptions
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
