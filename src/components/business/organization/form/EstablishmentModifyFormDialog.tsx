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
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { EstablishmentDetailRdo, PhysicalAddressCdo, VirtualAddressCdo } from '~/models';
import { useBusinessMutation, useEstablishmentRdo } from './hooks';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { LocationUtil, useEstablishmentCategories, YandexLocationPicker } from '~/components';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TimezoneSelect from 'react-timezone-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const eventModifySchema = yup.object({
  establishmentRdo: yup.object({
    establishment: yup.object({
      logo: yup.string().url().nullable().notRequired(),
      photos: yup.array().of(yup.string().url()).notRequired(),
      brandId: yup.number().required('Brand is required'),
      categoryIds: yup.array().of(yup.number()).nullable(),
      contactName: yup.string().nullable().notRequired(),
      contactPhone: yup
        .string()
        .matches(/^\+?[0-9\s\-()]{7,}$/, 'Invalid phone number')
        .nullable()
        .notRequired(),
      instagramUsername: yup
        .string()
        .matches(/^@?[a-zA-Z0-9._]{1,30}$/, 'Invalid Instagram username')
        .nullable()
        .notRequired(),
      description: yup.string().nullable().notRequired(),
    }),
    brandIdName: yup.object({
      id: yup.number().required(),
      name: yup.string().required(),
    }),
    organizationIdName: yup.object({
      id: yup.number().required(),
      name: yup.string().required(),
    }),
    categories: yup
      .array()
      .of(
        yup.object({
          id: yup.number().required(),
          name: yup.string().required(),
        }),
      )
      .min(1, 'At least one category is required'),
    physicalAddress: yup.object().shape({
      mapUrl: yup.string().required('Map URL is required'),
      country: yup.string().required('Country is required'),
      addressLine1: yup.string().required('Address Line 1 is required'),
      addressLine2: yup.string(), // optional
      postIndex: yup.string(), // optional
      city: yup.string().required('City is required'),
      location: yup.string().required('Location is required'),
      establishmentId: yup.number().required('Establishment ID is required'),
    }).nullable(),
    virtualAddress: yup.object().shape({
      timezone: yup.string().required('Timezone is required'),
      webUrl: yup.string()
        .url('Web URL must be a valid URL')
        .required('Web URL is required'),
      establishmentId: yup.number().required('Establishment ID is required'),
    }).nullable(),
  }),

  physicalAddressCdo: yup.object().shape({
    mapUrl: yup.string().required('Map URL is required'),
    country: yup.string().required('Country is required'),
    addressLine1: yup.string().required('Address Line 1 is required'),
    addressLine2: yup.string(), // optional
    postIndex: yup.string(), // optional
    city: yup.string().required('City is required'),
    location: yup.string().required('Location is required'),
    establishmentId: yup.number().required('Establishment ID is required'),
  }).nullable().optional(),

  virtualAddressCdo: yup.object().shape({
    timezone: yup.string().required('Timezone is required'),
    webUrl: yup.string()
      .url('Web URL must be a valid URL')
      .required('Web URL is required'),
    establishmentId: yup.number().required('Establishment ID is required'),
  }).nullable().optional(),
});


export const EstablishmentModifyFormDialog = (
  {
    establishmentId,
    onSuccess,
    onClose,
  }: {
    establishmentId: number;
    onSuccess: () => void;
    onClose: () => void;
  },
) => {
  //
  const [addressTabValue, setAddressTabValue] = useState<string>('');

  const {
    defaultPhysicalAddressCdo,
    defaultVirtualAddressCdo,
    mutation: {
      modifyEstablishment,
      registerPhysicalAddress,
      modifyPhysicalAddress,
      removePhysicalAddress,
      registerVirtualAddress,
      modifyVirtualAddress,
      removeVirtualAddress,
    },
  } = useBusinessMutation();

  const {
    establishmentRdo,
  } = useEstablishmentRdo(establishmentId);

  const {
    establishmentCategories,
  } = useEstablishmentCategories();

  useEffect(() => {
    setAddressTabValue(!!establishmentRdo?.physicalAddress ? 'physical' : !!establishmentRdo?.virtualAddress ? 'virtual' : '');
  }, [establishmentRdo]);

  const {
    watch,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{
    establishmentRdo?: EstablishmentDetailRdo;
    physicalAddressCdo?: PhysicalAddressCdo | null;
    virtualAddressCdo?: VirtualAddressCdo | null;
  }>({
    values: {
      establishmentRdo: !!establishmentRdo ? {
        ...establishmentRdo,
        establishment: {
          ...establishmentRdo.establishment,
          categoryIds: establishmentRdo?.establishment?.categoryIds || [],
          brandId: establishmentRdo.brandIdName.id,
        },
        ...(!!establishmentRdo.virtualAddress ? {
          virtualAddress: {
            ...establishmentRdo.virtualAddress,
            establishmentId: establishmentRdo.establishment.id,
          },
        } : {}),
        ...(!!establishmentRdo.physicalAddress ? {
          physicalAddress: {
            ...establishmentRdo.physicalAddress,
            establishmentId: establishmentRdo.establishment.id,
          },
        } : {}),
      } : undefined,
      physicalAddressCdo: null,
      virtualAddressCdo: null,
    },
    resolver: yupResolver(eventModifySchema),
  });

  useEffect(() => {
    //
    if (!!establishmentRdo?.virtualAddress && addressTabValue == 'physical') {
      setValue('physicalAddressCdo', {
        ...defaultPhysicalAddressCdo,
        establishmentId,
      });
    } else {
      setValue('physicalAddressCdo', null);
      setValue('virtualAddressCdo', null);
    }
    if (!!establishmentRdo?.physicalAddress && addressTabValue == 'virtual') {
      setValue('virtualAddressCdo', {
        ...defaultVirtualAddressCdo,
        establishmentId,
      });
    } else {
      setValue('physicalAddressCdo', null);
      setValue('virtualAddressCdo', null);
    }
  }, [establishmentRdo, addressTabValue]);

  const handleAddressTabValueChange = (event: SyntheticEvent, newValue: string) => {
    //
    setAddressTabValue(newValue);
  };

  const onSubmit = async (data: {
    establishmentRdo?: EstablishmentDetailRdo;
    physicalAddressCdo?: PhysicalAddressCdo | null;
    virtualAddressCdo?: VirtualAddressCdo | null;
  }) => {
    //
    if (!!data.establishmentRdo) {
      await modifyEstablishment.mutateAsync({
        establishment: { ...data.establishmentRdo.establishment },
      },
      {
        onSuccess: async () => {
          //
          if (establishmentRdo?.physicalAddress) {
            if (addressTabValue == 'physical') {
              await modifyPhysicalAddress.mutateAsync({
                physicalAddress: {
                  ...data.establishmentRdo!.physicalAddress,
                  establishmentId,
                },
              });
            } else {
              await removePhysicalAddress.mutateAsync({ addressId: data.establishmentRdo!.physicalAddress.id });
            }
          }
          if (data.virtualAddressCdo) {
            await registerVirtualAddress.mutateAsync({
              virtualAddressCdo: {
                ...data.virtualAddressCdo,
                establishmentId,
              },
            });
          }

          if (establishmentRdo?.virtualAddress) {
            if (addressTabValue == 'virtual') {
              await modifyVirtualAddress.mutateAsync({
                virtualAddress: {
                  ...data.establishmentRdo!.virtualAddress,
                  establishmentId,
                },
              });
            } else {
              await removeVirtualAddress.mutateAsync({ addressId: data.establishmentRdo!.virtualAddress.id });
            }
          }
          if (data.physicalAddressCdo) {
            await registerPhysicalAddress.mutateAsync({
              physicalAddressCdo: {
                ...data.physicalAddressCdo,
                establishmentId,
              },
            });
          }

          onSuccess();
          onClose();
          reset();
        },
      });
    }
  };
  const watchCategoryIds = watch('establishmentRdo.establishment.categoryIds') || [];

  const selectedCategories = establishmentCategories.filter(category =>
    watchCategoryIds.includes(category.id),
  );

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Dialog open={true} onClose={onClose} maxWidth={'md'} fullWidth>
      <DialogTitle>Modify Establishment</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            fullWidth
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.establishmentRdo?.establishment?.instagramUsername}
            helperText={errors.establishmentRdo?.establishment?.instagramUsername?.message}
            label="Instagram"
            {...register('establishmentRdo.establishment.instagramUsername', { required: true })}
            margin="normal"/>
          <TextField
            required
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.establishmentRdo?.establishment?.description}
            helperText={errors.establishmentRdo?.establishment?.description?.message}
            label="Description" {...register('establishmentRdo.establishment.description', { required: true })}
            margin="normal"/>
          <TextField
            required
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.establishmentRdo?.establishment?.contactName}
            helperText={errors.establishmentRdo?.establishment?.contactName?.message}
            label="Contact Name" {...register('establishmentRdo.establishment.contactName', { required: true })}
            margin="normal"/>
          <TextField
            required
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.establishmentRdo?.establishment?.contactPhone}
            helperText={errors.establishmentRdo?.establishment?.contactPhone?.message}
            label="Contact Phone" {...register('establishmentRdo.establishment.contactPhone', { required: true })}
            margin="normal"/>

          <TabContext value={addressTabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleAddressTabValueChange} aria-label="lab API tabs example">
                <Tab label="Physical" value="physical"/>
                <Tab label="Virtual" value="virtual"/>
              </TabList>
            </Box>
            <TabPanel value="physical">
              {addressTabValue == 'physical' && (
                <YandexLocationPicker
                  initCoords={!!establishmentRdo?.physicalAddress?.location ? LocationUtil.toCoords(establishmentRdo.physicalAddress.location) : undefined}
                  onSet={address => {
                    if (establishmentRdo?.physicalAddress) {
                      setValue('establishmentRdo.physicalAddress', {
                        ...watch('establishmentRdo.physicalAddress'),
                        ...address,
                      });
                    } else {
                      setValue('physicalAddressCdo', { ...address, establishmentId } as PhysicalAddressCdo);
                    }
                  }}/>
              )}
            </TabPanel>
            <TabPanel value="virtual">
              {addressTabValue == 'virtual' && (
                <Card>
                  <CardContent>
                    <TimezoneSelect
                      placeholder={'Select Timezone'}
                      value={watch(!!establishmentRdo?.virtualAddress ? 'establishmentRdo.virtualAddress.timezone' : 'virtualAddressCdo.timezone')}
                      onChange={(selected) => setValue(!!establishmentRdo?.virtualAddress ? 'establishmentRdo.virtualAddress.timezone' : 'virtualAddressCdo.timezone', selected.value)}
                    />
                    <TextField
                      required
                      fullWidth
                      slotProps={{ inputLabel: { shrink: true } }}
                      error={!!establishmentRdo?.virtualAddress ? !!errors.establishmentRdo?.virtualAddress?.webUrl : !!errors.virtualAddressCdo?.webUrl}
                      helperText={!!establishmentRdo?.virtualAddress ? errors.establishmentRdo?.virtualAddress?.webUrl?.message : errors.virtualAddressCdo?.webUrl?.message}
                      label="Web URL" {...register(!!establishmentRdo?.virtualAddress ? 'establishmentRdo.virtualAddress.webUrl' : 'virtualAddressCdo.webUrl', { required: addressTabValue == 'virtual' })}
                      margin="normal"/>
                  </CardContent>
                </Card>
              )}
            </TabPanel>
          </TabContext>

          <FormControl fullWidth error={!!errors.establishmentRdo?.establishment?.categoryIds}>
            <InputLabel shrink required>Categories</InputLabel>
            <Autocomplete
              multiple
              id="establishment-categories"
              options={establishmentCategories}
              getOptionLabel={(option) => option.name}
              value={selectedCategories}
              onChange={(event, newValue) => {
                const newCategoryIds = newValue.map(category => category.id);
                setValue('establishmentRdo.establishment.categoryIds', newCategoryIds);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  slotProps={{ inputLabel: { shrink: true } }}
                  placeholder="Search categories"
                  error={!!errors.establishmentRdo?.establishment?.categoryIds}
                  helperText={errors.establishmentRdo?.establishment?.categoryIds?.message}
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
