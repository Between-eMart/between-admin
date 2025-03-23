import {
  Accordion,
  Box,
  Button,
  Card,
  CardContent,
  AccordionSummary,
  Stack,
  AccordionDetails,
  Typography,
  ButtonGroup,
} from '@mui/material';
import * as React from 'react';
import { useEvent } from '~/hooks';
import { ExpandMore } from '@mui/icons-material';
import { EventInfoDetail } from '~/components/event/detail/views';
import EventAttendRequestList from '~/components/event/detail/views/EventAttendRequestList';
import { useState } from 'react';
import { EventTaskList } from '~/components/event/detail/views/EventTaskList';
import { EventInviteList } from '~/components/event/detail/views/EventInviteList';
import { EventBannerList } from '~/components/event/detail/views/EventBannerList';

export const EventDetail = ({ eventId, onBack }: { eventId?: string; onBack: () => void }) => {
  //
  const { eventInfo } = useEvent(eventId || '');

  const [bannersExpanded, setBannersExpanded] = useState<boolean>(false);
  const [tasksExpanded, setTasksExpanded] = useState<boolean>(false);
  const [compTasksExpanded, setCompTasksExpanded] = useState<boolean>(false);
  const [attendListExpanded, setAttendListExpanded] = useState<boolean>(false);
  const [inviteListExpanded, setInviteListExpanded] = useState<boolean>(false);

  if (!eventInfo) return <Typography>Loading event details...</Typography>;

  const handleAttendListExpand = () => {
    //
    setAttendListExpanded(!attendListExpanded);
  };

  const handleTasksExpand = () => {
    //
    setTasksExpanded(!tasksExpanded);
  };

  return (
    <Stack spacing={2}>
      <Card variant="outlined" sx={{ borderLeft: '4px solid #1976d2', p: 2 }}>
        <EventInfoDetail event={eventInfo.event} categories={eventInfo.categories} />
      </Card>

      <Card variant="outlined" sx={{ borderLeft: '4px solid #1976d2', p: 2 }}>
        <Accordion
          expanded={bannersExpanded}
          onChange={() => {
            setBannersExpanded(!bannersExpanded);
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Banners</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EventBannerList banners={eventInfo.event.banners || []}/>
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card variant="outlined" sx={{ borderLeft: '4px solid #1976d2', p: 2 }}>
        <Accordion expanded={tasksExpanded} onChange={handleTasksExpand}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Event Tasks </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EventTaskList />
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card variant="outlined" sx={{ borderLeft: '4px solid #1976d2', p: 2 }}>
        <Accordion
          expanded={compTasksExpanded}
          onChange={() => {
            setCompTasksExpanded(!compTasksExpanded);
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Completed Tasks</Typography>
          </AccordionSummary>
          <AccordionDetails>
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card variant="outlined" sx={{ borderLeft: '4px solid #1976d2', p: 2 }}>
        <Accordion expanded={attendListExpanded} onChange={handleAttendListExpand}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Event Attend Requests</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EventAttendRequestList attendRequests={eventInfo.attendRequests} />
          </AccordionDetails>
        </Accordion>
      </Card>

      <Card variant="outlined" sx={{ borderLeft: '4px solid #1976d2', p: 2 }}>
        <Accordion
          expanded={inviteListExpanded}
          onChange={() => {
            setInviteListExpanded(!inviteListExpanded);
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Invitation List</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EventInviteList inviteRequests={eventInfo.inviteRequests}/>
          </AccordionDetails>
        </Accordion>
      </Card>

      <Box textAlign="center" mt={1} margin={5}>
        <Button variant="contained" onClick={onBack} style={{marginRight: 10}}>
          Back
        </Button>
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </Box>
    </Stack>
  );
};
