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
import { EventCategory, Event, EventStatus, FailureResponse } from '~/models';
import { Controller, useForm } from 'react-hook-form';
import { useEventCategories, useEventMutation } from '~/hooks';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useDialog } from '~/components';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const eventSchema = yup.object({
  name: yup.string().required('Event name is required'),
  description: yup.string().required('Description is required'),
  organizers: yup.string().required('Organizers are required'),

  startDateTime: yup
    .string()
    .required('Start date and time is required')
    .test('valid-start', 'Invalid start date format', (value) =>
      dayjs(value, DATE_FORMAT, true).isValid(),
    ),

  endDateTime: yup
    .string()
    .required('End date and time is required')
    .test('valid-end', 'Invalid end date format', (value) =>
      dayjs(value, DATE_FORMAT, true).isValid(),
    )
    .test('end-after-start', 'End date must be after start date', function (value) {
      const { startDateTime } = this.parent;
      const start = dayjs(startDateTime, DATE_FORMAT, true);
      const end = dayjs(value, DATE_FORMAT, true);
      return start.isValid() && end.isValid() && end.isAfter(start);
    }),

  numberOfSeats: yup
    .number()
    .required('Number of seats is required')
    .min(1, 'Must be at least 1 seat'),

  dressCode: yup.string().required('Dress code is required'),
  adviceForAttenders: yup.string().required('Advice is required'),
  rules: yup.string().required('Rules are required'),
  venue: yup.string().required('Venue is required'),
  location: yup.string().required('Location is required'),
  ageRestriction: yup.string().required('Age restriction is required'),
  isRepeatable: yup.boolean().required('Repeatable field is required'),

  status: yup
    .mixed<EventStatus>()
    .oneOf(Object.values(EventStatus))
    .required('Status is required'),

  categoryIds: yup
    .array()
    .of(yup.number().required())
    .min(1, 'Select at least one category'),
});


export const EventInfoDetail = ({ event, categories }: { event: Event; categories: EventCategory[] }) => {
  //
  const { alert } = useDialog();
  const [loading, setLoading] = useState(false);

  const { categories: eventCategories } = useEventCategories();
  const {
    mutation: { modifyEvent },
  } = useEventMutation();

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Event>({
    values: {
      ...event,
      categoryIds: categories.map((cat) => cat.id),
      isRepeatable: event.isRepeatable,
    },
    resolver: yupResolver(eventSchema),
  });

  const statusOptions: string[] = Object.keys(EventStatus);


  const handleFormSubmit = async (data: Event) => {
    //
    console.log(data);
    setLoading(true);
    await modifyEvent.mutateAsync({ event: data }, {
      onSuccess: async () => {
        setLoading(false);
        alert('Changes have been saved.');
      },
      onError: (error) => {
        setLoading(false);
        const errorMessage =
          (error as AxiosError<FailureResponse>)?.response?.data?.failureMessage?.exceptionMessage ||
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
                      required
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
                      <InputLabel shrink required>Categories</InputLabel>
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
                      required
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
              <Grid size={4}>
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      <InputLabel shrink required>Select an option</InputLabel>
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
                      required
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
