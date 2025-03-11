import {Avatar, Box, Button, Card, CardContent, Grid2 as Grid, Stack, Typography} from '@mui/material';
import {useEventRdo} from './hooks';
import * as React from 'react';

export const EventDetail = ({
                              eventId,
                              onBack,
                            }: {
  eventId?: string;
  onBack: () => void;
}) => {
  const {eventRdo} = useEventRdo(eventId);

  if (!eventRdo) return <Typography>Loading event details...</Typography>;

  return (
    <Stack spacing={2}>
      <Card variant="outlined" sx={{borderLeft: '4px solid #1976d2', p: 2}}>
        <Grid container spacing={2} alignItems="center" padding={5}>
          <Grid size={12}>
            <Stack spacing={2} direction={"row"} alignItems="center">
              <Avatar sx={{width: 60, height: 60}}> </Avatar>
              <Typography variant="h5">{eventRdo.name || 'Event name'}</Typography>
            </Stack>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2">
              <strong>Business:</strong> {eventRdo.organizationName || 'Business name'}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2">
              <strong>Date:</strong> {eventRdo.date || '21.02.2025'}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2">
              <strong>Time:</strong> {eventRdo.time || '10:00 - 22:00'}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2">
              <strong>Dress-code:</strong> {eventRdo.dressCode || 'Black and white'}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2">
              <strong>Age:</strong> {eventRdo.age || '21+'}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2">
              <strong>Category:</strong> {eventRdo.category || 'Fun'}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2" mt={1}>
              <strong>Repeats:</strong> {eventRdo.repeats || 'Weekly'}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="body2">
              <strong>Location:</strong> {eventRdo.location || 'Ifithor 31 Mirzo-Ulugbeck tumani'}
            </Typography>
          </Grid>
        </Grid>
      </Card>

      <Card variant="outlined" sx={{borderLeft: '4px solid #1976d2', p: 2}}>
        <CardContent style={{padding: 25, height: '100%'}}>
          <Stack spacing={2}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Typography gutterBottom variant="h5" component="div"
                          style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <img src={'/icon-check.svg'} alt="check" height={30}/>
                Description
              </Typography>
            </Box>
            <Typography variant="body1" component="p">
              {eventRdo.description}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{borderLeft: '4px solid #1976d2', p: 2}}>
        <CardContent style={{padding: 25, height: '100%'}}>
          <Stack spacing={2}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Typography gutterBottom variant="h5" component="div"
                          style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <img src={'/icon-check.svg'} alt="check" height={30}/>
                Rules
              </Typography>
            </Box>
            <Typography variant="body1" component="p">
              {eventRdo.rules}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{borderLeft: '4px solid #1976d2', p: 2}}>
        <CardContent style={{padding: 25, height: '100%'}}>
          <Stack spacing={2}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Typography gutterBottom variant="h5" component="div"
                          style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <img src={'/icon-check.svg'} alt="check" height={30}/>
                Proposed offers for members
              </Typography>
            </Box>
            <Typography variant="body1" component="p">
              {eventRdo.proposedOffersForMembers}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Box textAlign="center" mt={3}>
        <Button variant="contained" onClick={onBack}>
          Back
        </Button>
      </Box>
    </Stack>
  );
};
