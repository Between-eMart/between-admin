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
import { useInvolvementMutation } from '~/hooks';

export const EventAttendRequestList = ({ attendRequests }: { attendRequests: EventAttendRequest[] }) => {
  //
  const {
    mutation: { respondToJoin },
  } = useInvolvementMutation();

  const handleAcceptClick = (requestId: number) => {
    //
    const confRes = confirm('Do you want to accept it?');
    if (confRes) {
      respondToJoin.mutate(
        { requestId: requestId, status: EventAttendRequestStatus.APPROVED },
        {
          onSuccess: async () => {
            alert('Successfully accepted.');
          },
          onError: async () => {
            alert('Error occurred while accepting request.');
          },
        },
      );
    }
  };

  const handleRejectClick = (requestId: number) => {
    //
    const confRes = confirm('Do you want to reject it?');
    if (confRes) {
      respondToJoin.mutate(
        { requestId: requestId, status: EventAttendRequestStatus.REJECTED },
        {
          onSuccess: async () => {
            alert('Successfully rejected.');
          },
          onError: async () => {
            alert('Error occurred while rejecting request.');
          },
        },
      );
    }
  };
  
  const handleRevokeClick = (requestId: number) => {
    //
    const confRes = confirm('Do you want to revoke it?');
    if (confRes) {
      respondToJoin.mutate(
        { requestId: requestId, status: EventAttendRequestStatus.REQUESTED },
        {
          onSuccess: async () => {
            alert('Successfully revoked.');
          },
          onError: async () => {
            alert('Error occurred while revoking request.');
          },
        },
      );
    }
  };

  return (
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
                    <Button
                      variant="contained"
                      size={'small'}
                      onClick={() => {
                        handleAcceptClick(request.id);
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      size={'small'}
                      color="error"
                      onClick={() => {
                        handleRejectClick(request.id);
                      }}
                    >
                      Reject
                    </Button>
                  </Stack>
                ) : (
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Chip key={request.id} label={request.status} variant="outlined" />
                    <Button
                      variant="outlined"
                      size={'small'}
                      color="warning"
                      onClick={() => {
                        handleRevokeClick(request.id);
                      }}
                    >
                      Revoke
                    </Button>
                  </Stack>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
