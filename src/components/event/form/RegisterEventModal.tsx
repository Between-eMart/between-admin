import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Typography,
  Autocomplete,
  Chip,
  Paper,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { EventCdo, QueryResponse } from '~/models';
import Divider from '@mui/material/Divider';
import { useEventCategories, useEventMutation } from '~/hooks';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useEstablishmentsIdNames } from '~/components';

interface RegisterEventModalProps {
  open: boolean;
  onClose: () => void;
}

const RegisterEventModal: React.FC<RegisterEventModalProps> = ({ open, onClose }) => {
  //
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
      date: '',
      time: '',
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
        onError: (error) => {
          const errorMessage =
            (error as AxiosError<QueryResponse<any>, any>)?.response?.data?.failureMessage?.exceptionMessage ||
            'Error Occurred while saving event.';
          alert(errorMessage);
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

  const establishments = [{ id: 1, name: 'Maxima' }];
  const watchBannerImages = watch('banners');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" fontWeight="500">
          Register New Event
        </Typography>
      </DialogTitle>
      <Divider />

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
                  backgroundColor: (theme) => theme.palette.grey[50],
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
                    <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />} sx={{ mb: 1 }}>
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
                  backgroundColor: (theme) => theme.palette.grey[50],
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight="500" color="primary">
                  Date and Time
                </Typography>

                <Grid container sx={{ mt: 0.5 }} spacing={1}>
                  <Grid size={{ md: 6 }}>
                    <Controller
                      name="date"
                      control={control}
                      rules={{ required: 'Date is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Date"
                          fullWidth
                          error={!!errors.description}
                          helperText={errors.description?.message}
                          placeholder="Date format must be YYYY-MM-DD"
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ md: 6 }}>
                    <Controller
                      name="time"
                      control={control}
                      rules={{ required: 'Time is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Time"
                          fullWidth
                          error={!!errors.description}
                          helperText={errors.description?.message}
                          placeholder="Time format must be HH:mm:ss"
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ md: 12 }}>
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
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Location Information */}
            <Grid size={{ md: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: (theme) => theme.palette.grey[50],
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
                  backgroundColor: (theme) => theme.palette.grey[50],
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
                  backgroundColor: (theme) => theme.palette.grey[50],
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
            {loading ? <CircularProgress size={24} /> : 'Register Event'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegisterEventModal;
