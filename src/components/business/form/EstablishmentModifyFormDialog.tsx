import {
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
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { EstablishmentDetailRdo, PhysicalAddressCdo, VirtualAddressCdo } from '~/models';
import { useBusinessMutation, useEstablishmentRdo } from './hooks';
import React, { SyntheticEvent, useState } from 'react';
import { LocationUtil, useEstablishmentCategories, YandexLocationPicker } from '~/components';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TimezoneSelect from 'react-timezone-select';

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
  const [addressTabValue, setAddressTabValue] = useState('physical');

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

  const {
    watch,
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<{
    establishmentRdo: EstablishmentDetailRdo;
    physicalAddressCdo: PhysicalAddressCdo;
    virtualAddressCdo: VirtualAddressCdo;
  }>({
    values: {
      establishmentRdo: establishmentRdo!,
      physicalAddressCdo: defaultPhysicalAddressCdo,
      virtualAddressCdo: defaultVirtualAddressCdo,
    },
  });

  const handleAddressTabValueChange = (event: SyntheticEvent, newValue: string) => {
    //
    setAddressTabValue(newValue);
  };

  const onSubmit = async (data: {
    establishmentRdo: EstablishmentDetailRdo;
    physicalAddressCdo: PhysicalAddressCdo;
    virtualAddressCdo: VirtualAddressCdo;
  }) => {
    //
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
                ...data.establishmentRdo.physicalAddress,
                establishmentId,
              },
            });
          } else {
            await removePhysicalAddress.mutateAsync({ addressId: data.establishmentRdo.physicalAddress.id });
            await registerVirtualAddress.mutateAsync({
              virtualAddressCdo: {
                ...data.virtualAddressCdo,
                establishmentId,
              },
            });
          }
        } else if (establishmentRdo?.virtualAddress) {
          if (addressTabValue == 'virtual') {
            await modifyVirtualAddress.mutateAsync({
              virtualAddress: {
                ...data.establishmentRdo.virtualAddress,
                establishmentId,
              },
            });
          } else {
            await removeVirtualAddress.mutateAsync({ addressId: data.establishmentRdo.virtualAddress.id });
            await registerPhysicalAddress.mutateAsync({
              physicalAddressCdo: {
                ...data.physicalAddressCdo,
                establishmentId,
              },
            });
          }
        }
        onSuccess();
        onClose();
        reset();
      },
    });
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth={'md'} fullWidth>
      <DialogTitle>Modify Establishment</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth
                     label="Instagram" {...register('establishmentRdo.establishment.instagramUsername', { required: true })}
                     margin="normal"/>
          <TextField fullWidth
                     label="Description" {...register('establishmentRdo.establishment.description', { required: true })}
                     margin="normal"/>
          <TextField fullWidth
                     label="Contact Name" {...register('establishmentRdo.establishment.contactName', { required: true })}
                     margin="normal"/>
          <TextField fullWidth
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
              <YandexLocationPicker
                initCoords={!!establishmentRdo?.physicalAddress.location ? LocationUtil.toCoords(establishmentRdo.physicalAddress.location) : undefined}
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
            </TabPanel>
            <TabPanel value="virtual">
              <Card>
                <CardContent>
                  <TimezoneSelect
                    placeholder={'Select Timezone'}
                    value={watch(!!establishmentRdo?.virtualAddress ? 'establishmentRdo.virtualAddress.timezone' : 'virtualAddressCdo.timezone')}
                    onChange={(selected) => setValue(!!establishmentRdo?.virtualAddress ? 'establishmentRdo.virtualAddress.timezone' : 'virtualAddressCdo.timezone', selected.value)}
                  />
                  <TextField fullWidth
                             label="Web URL" {...register(!!establishmentRdo?.virtualAddress ? 'establishmentRdo.virtualAddress.webUrl' : 'virtualAddressCdo.webUrl', { required: addressTabValue == 'virtual' })}
                             margin="normal"/>
                </CardContent>
              </Card>
            </TabPanel>
          </TabContext>

          <FormControl fullWidth margin="normal">
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={watch('establishmentRdo.establishment.categoryIds') || []}
              onChange={(e) => {
                const targetCategoryIds = e.target.value as number[];
                setValue('establishmentRdo.establishment.categoryIds', targetCategoryIds);
              }}
              input={<OutlinedInput label="Categories"/>}
              renderValue={(selected) => {
                const selectedCategories = establishmentCategories.filter(category => selected.includes(category.id));
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedCategories.map((category) => (
                      <Chip key={category.id} label={category.name}/>
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
