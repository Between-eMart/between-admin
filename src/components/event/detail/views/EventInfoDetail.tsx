import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { EventCategory, Event, EventStatus , QueryResponse} from '~/models';
import { Controller, useForm } from 'react-hook-form';
import { useEventCategories, useEventMutation } from '~/hooks';
import { useState } from 'react';
import { AxiosError } from 'axios';

export const EventInfoDetail = ({ event, categories }: { event: Event; categories: EventCategory[] }) => {
  //
  const [loading, setLoading] = useState(false);

  const { categories: eventCategories } = useEventCategories();
  const {
    mutation: { modifyEvent },
  } = useEventMutation();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Event>({
    values: {
      ...event,
      categoryIds: categories.map((cat) => cat.id),
      isRepeatable: event.isRepeatable,
    },
  });

  const statusOptions: string[] = Object.keys(EventStatus);
  

  const handleFormSubmit = async (data: Event) => {
    //
    console.log(data);
    setLoading(true);
    await modifyEvent.mutateAsync({ event: data }, {
      onSuccess: async () => {
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        const errorMessage =
          (error as AxiosError<QueryResponse<any>, any>)?.response?.data?.failureMessage?.exceptionMessage ||
          'Error Occurred while saving event.';
        alert(errorMessage);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container>
        <Grid size={12}>
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
            <Grid container sx={{ mt: 0.5 }} spacing={2}>
              <Grid size={6}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Event name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid size={6}>
                <Controller
                  name="categoryIds"
                  control={control}
                  rules={{ required: 'At least one category is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.categoryIds}>
                      <Autocomplete
                        multiple
                        options={eventCategories}
                        getOptionLabel={(option) => option.name}
                        value={eventCategories.filter((cat) => field.value?.includes(cat.id))}
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
              <Grid size={6}>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: 'Event description is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      fullWidth
                      multiline
                      minRows={3}
                      error={!!errors.description}
                      helperText={errors.name?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid size={2}>
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
                      placeholder="Date format must be YYYY:MM:DD"
                    />
                  )}
                />
              </Grid>

              <Grid size={2}>
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
              <Grid size={2}>
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
                      label="Repeatable event"
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
              Other Details
            </Typography>

            <Grid container spacing={2}>
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

              <Grid size={{ md: 6 }}>
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

              <Grid size={{ md: 6 }}>
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
              Publish Status
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: 'Please select an option' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.status} sx={{ mb: 3 }}>
                      <InputLabel id="select-label">Select an option</InputLabel>
                      <Select {...field} labelId="select-label" label="Select an option">
                        {statusOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <Controller
                  name="organizers"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Event organizer(s)"
                      fullWidth
                      error={!!errors.organizers}
                      helperText={errors.organizers?.message}
                      variant="outlined"
                      placeholder="Add Event Organizer(s)"
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Paper sx={{ padding: 2, textAlign: 'center' }}>
                    Registered By: {<strong>{event.registeredBy}</strong>}
                  </Paper>
                  <Paper sx={{ padding: 2, textAlign: 'center' }}>
                    Registered: {<strong>{new Date(event?.registeredOn).toLocaleString()}</strong>}
                  </Paper>
                  <Paper sx={{ padding: 2, textAlign: 'center' }}>
                    Modified By: {<strong>{event.modifiedBy}</strong>}
                  </Paper>
                  <Paper sx={{ padding: 2, textAlign: 'center' }}>
                    Last Modified: {<strong>{new Date(event?.modifiedOn).toLocaleString()}</strong>}
                  </Paper>
                </Stack>
              </Grid>
              <Grid size={2}>
                <Button type="submit" variant="contained" color="primary" disabled={loading} sx={{ minWidth: 120 }}>
                  {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};
