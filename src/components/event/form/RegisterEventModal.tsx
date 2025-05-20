import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { EventCdo } from '~/models';
import Divider from '@mui/material/Divider';
import { useEventCategories, useEventMutation } from '~/hooks';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDialog, useEstablishmentsIdNames } from '~/components';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocationPickerIconButtonView } from '~/components/event/form/views';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterEventModalProps {
  open: boolean;
  onClose: () => void;
}

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const eventSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),

  startDateTime: yup
    .string()
    .required('Start date and time is required')
    .test('valid-format', `Date must be in format ${DATE_FORMAT}`, (value) =>
      dayjs(value, DATE_FORMAT, true).isValid(),
    ),

  endDateTime: yup
    .string()
    .required('End date and time is required')
    .test('valid-format', `Date must be in format ${DATE_FORMAT}`, (value) =>
      dayjs(value, DATE_FORMAT, true).isValid(),
    )
    .test('is-after-start', 'End date must be after start date', function (value) {
      const { startDateTime } = this.parent;
      if (!startDateTime || !value) return true;

      const start = dayjs(startDateTime, DATE_FORMAT, true);
      const end = dayjs(value, DATE_FORMAT, true);

      return end.isAfter(start);
    }),

  numberOfSeats: yup.number().required().min(1, 'Minimum 1 seat required'),
  dressCode: yup.string().required('Dress code is required'),
  adviceForAttenders: yup.string().required('Advice is required'),
  rules: yup.string().required('Rules are required'),
  venue: yup.string().required('Venue is required'),
  location: yup.string().required('Location is required'),
  ageRestriction: yup.string().required('Age restriction is required'),
  isRepeatable: yup.boolean().required(),
  categoryIds: yup.array().of(yup.number()).min(1, 'Select at least one category'),
  establishmentId: yup.number().required('Establishment is required'),
  banners: yup
    .mixed()
    .required('Banners are required')
    .test('is-file-list', 'Must be an array of files', (value) => {
      return value instanceof Array && value.every((file) => file instanceof File);
    }),
});

const RegisterEventModal: React.FC<RegisterEventModalProps> = ({ open, onClose }) => {
  //
  const { alert } = useDialog();
  const [loading, setLoading] = useState(false);
  const { categories } = useEventCategories();
  const { establishmentIdNames } = useEstablishmentsIdNames();
  const {
    mutation: { registerEvent },
  } = useEventMutation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventCdo>({
    defaultValues: {
      name: '',
      description: '',
      startDateTime: dayjs().format(DATE_FORMAT),
      endDateTime: dayjs().add(2, 'hours').format(DATE_FORMAT),
      numberOfSeats: 0,
      dressCode: '',
      adviceForAttenders: '',
      rules: '',
      venue: '',
      location: '',
      ageRestriction: '',
      isRepeatable: false,
      categoryIds: [],
      establishmentId: 0,
      banners: [],
    },
    resolver: yupResolver(eventSchema),
  });

  // Reset form when modal is opened
  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const registerFormData = async (data) => {
    //
    registerEvent.mutate(
      { eventCdo: { ...data } },
      {
        onSuccess: async () => {
          //
          reset();
          onClose();
        },
      },
    );
  };

  const handleFormSubmit = async (data: EventCdo) => {
    setLoading(true);
    try {
      await registerFormData(data);
    } catch (error) {
      alert('Error submitting form:');
    } finally {
      setLoading(false);
    }
  };

  const handleImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //
    const files = event.target.files;
    if (files && files.length > 0) {
      setValue('banners', Array.from(files), { shouldValidate: true });
    }
  };

  const watchBannerImages = watch('banners');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" fontWeight="500">
          Register New Event
        </Typography>
      </DialogTitle>
      <Divider/>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container>
            {/* Basic Information */}
            <Grid size={{ md: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="500" color="primary">
                  Basic Information
                </Typography>
                <Grid container sx={{ mt: 0.5 }} spacing={1}>
                  <Grid size={{ md: 6 }}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: 'Event name is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Event Name"
                          fullWidth
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ md: 6 }}>
                    <FormControl fullWidth error={!!errors.establishmentId} variant="outlined">
                      <Controller
                        name="establishmentId"
                        control={control}
                        rules={{ required: 'Establishment is required' }}
                        render={({ field }) => (
                          <>
                            <InputLabel>Establishment</InputLabel>
                            <Select {...field} label="Establishment" value={field.value || ''}>
                              {establishmentIdNames?.map((est) => (
                                <MenuItem key={est.id} value={est.id}>
                                  {est.name} - {est.value}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.establishmentId && (
                              <FormHelperText>{errors.establishmentId.message}</FormHelperText>
                            )}
                          </>
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid size={{ md: 12 }}>
                    <Controller
                      name="description"
                      control={control}
                      rules={{ required: 'Description is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Description"
                          fullWidth
                          multiline
                          rows={4}
                          error={!!errors.description}
                          helperText={errors.description?.message}
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid size={{ md: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="500" color="primary">
                  Banners
                </Typography>
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
                    id="event-images-upload"
                    type="file"
                    onChange={handleImagesUpload}
                    multiple
                  />
                  <label htmlFor="event-images-upload">
                    <Button variant="outlined" component="span" startIcon={<CloudUploadIcon/>} sx={{ mb: 1 }}>
                      Upload Banner Images
                    </Button>
                  </label>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Upload high-quality banner images for your event (JPEG, PNG)
                  </Typography>

                  {watchBannerImages && watchBannerImages.length > 0 && (
                    <Typography variant="body2" color="primary">
                      {watchBannerImages.length} {watchBannerImages.length === 1 ? 'file' : 'files'} selected
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
            {/* Date and Time */}
            <Grid size={{ md: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="500" color="primary">
                  Date and Time
                </Typography>

                <Stack spacing={1}>
                  <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                      <DateTimePicker
                        sx={{ width: '100%' }}
                        label="Start Date Time"
                        value={dayjs(watch('startDateTime'))}
                        onChange={newValue => {
                          if (!!newValue) {
                            setValue('startDateTime', newValue.format(DATE_FORMAT));
                          }
                        }}
                      /> ~
                      <DateTimePicker
                        sx={{ width: '100%' }}
                        label="End Date Time"
                        value={dayjs(watch('endDateTime'))}
                        onChange={newValue => {
                          if (!!newValue) {
                            setValue('endDateTime', newValue.format(DATE_FORMAT));
                          }
                        }}
                      />
                    </div>
                  </DemoContainer>

                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <Controller
                      name="numberOfSeats"
                      control={control}
                      rules={{ required: 'Number of Seats is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Number of Seats"
                          fullWidth
                          error={!!errors.description}
                          helperText={errors.description?.message}
                          onInput={(e) => {
                            //@ts-ignore
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                          }}
                        />
                      )}
                    />

                    <Controller
                      name="isRepeatable"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              color="primary"
                            />
                          }
                          label="This is a repeatable event"
                        />
                      )}
                    />
                  </div>
                </Stack>
              </Paper>
            </Grid>

            {/* Location Information */}
            <Grid size={{ md: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="500" color="primary">
                  Location Information
                </Typography>

                <Grid container sx={{ mt: 0.5 }} spacing={1}>
                  <Grid size={{ md: 6 }}>
                    <Controller
                      name="venue"
                      control={control}
                      rules={{ required: 'Venue is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Venue"
                          fullWidth
                          error={!!errors.venue}
                          helperText={errors.venue?.message}
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ md: 6 }}>
                    <Controller
                      name="location"
                      control={control}
                      rules={{ required: 'Location is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Location"
                          fullWidth
                          error={!!errors.location}
                          helperText={errors.location?.message}
                          variant="outlined"
                          placeholder="City, Country or Address"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <LocationPickerIconButtonView
                                  onAddLinkSet={addressMapUrl => setValue('location', addressMapUrl)}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Event Details */}
            <Grid size={{ md: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="500" color="primary">
                  Event Details
                </Typography>

                <Grid container spacing={1}>
                  <Grid size={{ md: 6 }}>
                    <Controller
                      name="dressCode"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Dress Code"
                          fullWidth
                          error={!!errors.dressCode}
                          helperText={errors.dressCode?.message}
                          variant="outlined"
                          placeholder="e.g., Formal, Casual, Business"
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ md: 6 }}>
                    <Controller
                      name="ageRestriction"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Age Restriction"
                          fullWidth
                          error={!!errors.ageRestriction}
                          helperText={errors.ageRestriction?.message}
                          variant="outlined"
                          placeholder="e.g., 18+, All ages"
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ md: 12 }}>
                    <Controller
                      name="adviceForAttenders"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Advice For Attendees"
                          fullWidth
                          multiline
                          rows={3}
                          error={!!errors.adviceForAttenders}
                          helperText={errors.adviceForAttenders?.message}
                          variant="outlined"
                          placeholder="Any special instructions or recommendations for attendees"
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ md: 12 }}>
                    <Controller
                      name="rules"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Event Rules"
                          fullWidth
                          multiline
                          rows={3}
                          error={!!errors.rules}
                          helperText={errors.rules?.message}
                          variant="outlined"
                          placeholder="Rules and regulations for the event"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Categories */}
            <Grid size={{ md: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="500" color="primary">
                  Categories
                </Typography>

                <Grid container sx={{ mt: 0.5 }}>
                  <Grid size={{ md: 5 }}>
                    <Controller
                      name="categoryIds"
                      control={control}
                      rules={{ required: 'At least one category is required' }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.categoryIds}>
                          <Autocomplete
                            multiple
                            options={categories}
                            getOptionLabel={(option) => option.name}
                            value={categories.filter((cat) => field.value.includes(cat.id))}
                            onChange={(_, newValue) => {
                              field.onChange(newValue.map((item) => item.id));
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  label={option.name}
                                  {...getTagProps({ index })}
                                  key={option.id}
                                  color="primary"
                                  variant="outlined"
                                  sx={{ m: 0.5 }}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Categories"
                                error={!!errors.categoryIds}
                                helperText={errors.categoryIds?.message}
                                variant="outlined"
                                placeholder="Select event categories"
                              />
                            )}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} color="inherit" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ minWidth: 120 }}>
            {loading ? <CircularProgress size={24}/> : 'Register Event'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegisterEventModal;
