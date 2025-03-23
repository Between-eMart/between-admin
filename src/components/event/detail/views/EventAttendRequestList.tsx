import React from 'react';
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

import { EventAttendRequest, EventAttendRequestStatus } from '~/models';

export const EventAttendRequestList = ({ attendRequests }: { attendRequests: EventAttendRequest[] }) => (
  //

  <TableContainer component={Paper}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell align="center">ID</TableCell>
          <TableCell align="center">Influence Name</TableCell>
          <TableCell align="center">SNS username</TableCell>
          <TableCell align="center">Operation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {attendRequests.map((request) => (
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
              {request.status === EventAttendRequestStatus.REQUESTED ? (
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button variant="contained" size={'small'}>
                    Accept
                  </Button>
                  <Button variant="outlined" size={'small'} color="error">
                    Reject
                  </Button>
                </Stack>
              ) : (
                <>
                  <Chip key={request.id} label={request.status} variant="outlined"/>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default EventAttendRequestList;
