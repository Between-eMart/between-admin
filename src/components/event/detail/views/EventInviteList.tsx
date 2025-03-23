import React from 'react';
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { EventAttendRequestStatus, EventInviteRequest, EventInviteStatus } from '~/models';

export const EventInviteList = ({ inviteRequests }: { inviteRequests: EventInviteRequest[] }) => {
  //

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Description</TableCell>
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
  );
};
