import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { CommandResponse, Establishment, EstablishmentCdo, PhysicalAddressCdo, VirtualAddressCdo } from '~/models';
import { useBusinessMutation } from './hooks';
import React, { SyntheticEvent, useState } from 'react';
import { useEstablishmentCategories, YandexLocationPicker } from '~/components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TimezoneSelect from 'react-timezone-select';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const establishmentCdoSchema = Yup.object().shape({
  logo: Yup.mixed()
    .required('Logo is required')
    .test('is-file', 'Logo must be a file', value => value instanceof File),
  photos: Yup.array()
    .of(Yup.mixed().test('is-file', 'Each photo must be a file', value => value instanceof File))
    .min(1, 'At least one photo is required'),
  brandId: Yup.number()
    .required('Brand ID is required'),
  categoryIds: Yup.array()
    .of(Yup.number())
    .min(1, 'At least one category is required'),
  contactName: Yup.string()
    .required('Contact name is required'),
  contactPhone: Yup.string()
    .required('Contact phone is required')
    .matches(
      /^(\+?\d{1,3})?\s*\d{2,3}\s*\d{2,3}\s*\d{2,3}\s*\d{2,3}$/,
      'Invalid phone number format (example: 998 XX XXX XX XX)',
    ),
  instagramUsername: Yup.string()
    .required('Instagram username is required'),
  description: Yup.string()
    .required('Description is required'),
});

const physicalAddressCdoSchema = Yup.object().shape({
  mapUrl: Yup.string().required('Map URL is required'),
  country: Yup.string().required('Country is required'),
  addressLine1: Yup.string().required('Address Line 1 is required'),
  addressLine2: Yup.string(), // optional
  postIndex: Yup.string(), // optional
  city: Yup.string().required('City is required'),
  location: Yup.string().required('Location is required'),
  establishmentId: Yup.number().required('Establishment ID is required'),
});

const virtualAddressCdoSchema = Yup.object().shape({
  timezone: Yup.string().required('Timezone is required'),
  webUrl: Yup.string()
    .url('Web URL must be a valid URL')
    .required('Web URL is required'),
  establishmentId: Yup.number().required('Establishment ID is required'),
});


const formSchema = Yup.object().shape({
  establishmentCdo: establishmentCdoSchema.required('establishmentCdo is required'),
  physicalAddressCdo: physicalAddressCdoSchema.nullable(),
  virtualAddressCdo: virtualAddressCdoSchema.nullable(),
})
  .required()
  .test(
    'at-least-one-address',
    'Either physicalAddressCdo or virtualAddressCdo is required',
    function (value) {
      return !!(value.physicalAddressCdo || value.virtualAddressCdo);
    },
  );

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
    formState: { errors },
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
    resolver: yupResolver(formSchema),
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
          <TextField
            required
            fullWidth
            label="Instagram"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.establishmentCdo?.instagramUsername}
            helperText={errors.establishmentCdo?.instagramUsername?.message}
            {...register('establishmentCdo.instagramUsername')}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Description"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.establishmentCdo?.description}
            helperText={errors.establishmentCdo?.description?.message}
            {...register('establishmentCdo.description')}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Contact Name"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.establishmentCdo?.contactName}
            helperText={errors.establishmentCdo?.contactName?.message}
            {...register('establishmentCdo.contactName')}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Contact Phone"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.establishmentCdo?.contactPhone}
            helperText={errors.establishmentCdo?.contactPhone?.message}
            {...register('establishmentCdo.contactPhone')}
            margin="normal"
          />
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
              Upload high-quality Logo (JPEG, PNG) <span style={{ color: 'red' }}>*</span>
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
              Upload high-quality photos (JPEG, PNG) <span style={{ color: 'red' }}>*</span>
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
              {addressTabValue === 'physical' && (
              <YandexLocationPicker
                onSet={address => setValue('physicalAddressCdo', { ...address } as PhysicalAddressCdo)}/>
              )}
            </TabPanel>
            <TabPanel value="virtual">
              {addressTabValue === 'virtual' && (
                <Card>
                  <CardContent>
                    <TimezoneSelect
                      required
                      placeholder={'Select Timezone'}
                      value={watch('virtualAddressCdo.timezone')}
                      onChange={(selected) => setValue('virtualAddressCdo.timezone', selected.value)}
                    />
                    <TextField
                      required
                      fullWidth
                      label="Web URL"
                      slotProps={{ inputLabel: { shrink: true } }}
                      error={!!errors.virtualAddressCdo?.webUrl}
                      helperText={errors.virtualAddressCdo?.webUrl?.message}
                      {...register('virtualAddressCdo.webUrl', { required: addressTabValue === 'virtual' })}
                      margin="normal"
                    />
                  </CardContent>
                </Card>
              )}
            </TabPanel>
          </TabContext>

          <FormControl fullWidth error={!!errors.establishmentCdo?.categoryIds}>
            <InputLabel shrink required>Categories</InputLabel>
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
                  slotProps={{ inputLabel: { shrink: true } }}
                  placeholder="Search categories"
                  margin="normal"
                  error={!!errors.establishmentCdo?.categoryIds}
                  helperText={errors.establishmentCdo?.categoryIds?.message}
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
