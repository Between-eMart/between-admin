import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox, Chip,
} from '@mui/material';
import { useInvolvementMutation } from '~/hooks';
import { EventInviteRequestCdo, IdNameValue } from '~/models';

import { useAllInfluencers } from '~/components';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

export const InfluencerInviteModal = ({ eventId, invitedUsers, open, handleClose }) => {
  //
  const [selectedInfluencers, setSelectedInfluencers] = useState<IdNameValue[]>([]);

  const { influencers } = useAllInfluencers();
  const {
    mutation: { inviteToEvent },
  } = useInvolvementMutation();

  const handleSelect = (influencer: IdNameValue) => {
    setSelectedInfluencers((prevSelected) =>
      prevSelected.some((u) => u.id === influencer.id)
        ? prevSelected.filter((u) => u.id !== influencer.id)
        : [...prevSelected, influencer],
    );
  };

  const handleConfirm = () => {
    //
    const cdos : EventInviteRequestCdo[] = [];
    selectedInfluencers.forEach((value) => {
      const cdo = { influencerId: value.id, eventId: eventId } as unknown as EventInviteRequestCdo;
      cdos.push(cdo);
    });
    
    inviteToEvent.mutate({
      eventInviteRequestCdos: cdos,
    }, {
      onSuccess: async () => {
        alert('Success');
      },
    });
  };
  

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Select Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>SNS username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {influencers.map((influencer) => (
                <TableRow key={influencer.id}>
                  <TableCell>
                    <Checkbox
                      disabled={invitedUsers.some((t) => t.id === influencer.id)}
                      checked={selectedInfluencers.some((u) => u.id === influencer.id)}
                      onChange={() => handleSelect(influencer)}
                    />
                  </TableCell>
                  <TableCell>{influencer.value}</TableCell>
                  <TableCell>{influencer.name}</TableCell>
                  <TableCell>
                    {invitedUsers.some((y) => y.id === influencer.id)
                      ? <Chip label={'Invited'} variant="outlined" />
                      : ''
                    }</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" onClick={handleConfirm}>
            Invite Selected
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
