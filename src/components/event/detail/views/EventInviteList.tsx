import React, { useState } from 'react';
import {
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { EventInviteRequest, Influencer } from '~/models';
import { InfluencerInviteModal } from '~/components';

export const EventInviteList = ({ eventId, inviteRequests }: { eventId:number, inviteRequests: EventInviteRequest[] }) => {
  //
  const [users, setUsers] = useState<Influencer[]>([]);
  const [open, setOpen] = useState(false);
  
  const addSelectedUsers = (selected: Influencer[]) => {
    //
    setUsers([...users, ...selected.filter(u => !users.some(existing => existing.id === u.id))]);
  };
  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Sns Username</TableCell>
              <TableCell align="center">Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inviteRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell align="center" width={'10%'}>
                  {request.id}
                </TableCell>
                <TableCell align="center" width={'30%'}>
                  {request.influencer.name}
                </TableCell>
                <TableCell align="center" width={'30%'}>
                  {request.influencer.value || '--'}
                </TableCell>
                <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Chip key={request.id} label={request.status} variant="outlined" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack alignItems="center" style={{ padding: 10 }}>
        <Button variant="contained" color="primary" onClick={() => {setOpen(true)}}>
          + Invite Influencers
        </Button>
      </Stack>
      <InfluencerInviteModal open={open} handleClose={() => setOpen(false)} eventId={eventId} />
    </Paper>
  );
};
