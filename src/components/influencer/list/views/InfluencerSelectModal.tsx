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
  Checkbox,
} from '@mui/material';
import { useInfluencers, useInvolvementMutation } from '~/hooks';
import { EventInviteRequestCdo, Influencer, QueryResponse } from '~/models';
import { AxiosError } from 'axios';

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

export const InfluencerInviteModal = ({ eventId, open, handleClose }) => {
  //
  const [selectedInfluencers, setSelectedInfluencers] = useState<Influencer[]>([]);

  const { influencers } = useInfluencers();
  const {
    mutation: { inviteToEvent },
  } = useInvolvementMutation();

  const handleSelect = (influencer: Influencer) => {
    setSelectedInfluencers((prevSelected) =>
      prevSelected.some((u) => u.id === influencer.id)
        ? prevSelected.filter((u) => u.id !== influencer.id)
        : [...prevSelected, influencer],
    );
  };

  const handleConfirm = () => {
    const cdos : EventInviteRequestCdo[] = [];
    selectedInfluencers.forEach((value, index) => {
      const cdo = { influencerId: value.id, eventId: eventId } as unknown as EventInviteRequestCdo;
      cdos.push(cdo);
    });
    
    inviteToEvent.mutate({
      eventInviteRequestCdos: cdos,
    }, {
      onSuccess: async () => {
        alert('Success');
        
      },
      onError: async (error) => {
        const errorMessage =
          (error as AxiosError<QueryResponse<any>, any>)?.response?.data?.failureMessage?.exceptionMessage || 'Error';
        alert(errorMessage);
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
                <TableCell>Surname</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {influencers.map((influencer) => (
                <TableRow key={influencer.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedInfluencers.some((u) => u.id === influencer.id)}
                      onChange={() => handleSelect(influencer)}
                    />
                  </TableCell>
                  <TableCell>{influencer.snsUsername}</TableCell>
                  <TableCell>{influencer.name}</TableCell>
                  <TableCell>{influencer.surname}</TableCell>
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
