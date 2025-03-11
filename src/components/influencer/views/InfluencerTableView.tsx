import {
  Avatar,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

const statusColors = {
  Confirm: 'success',
  Banned: 'error',
  Reject: 'warning',
};


export const InfluencerTableView = ({ influencers, onDetail }) => {
  //
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Instagram</b></TableCell>
              <TableCell><b>Contact</b></TableCell>
              <TableCell><b>Gender</b></TableCell>
              <TableCell><b>Location</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {influencers.map((influencer, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => onDetail(influencer)}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: '#ccc' }}>{influencer.name[0]}</Avatar>
                    <Box>
                      <Typography color="primary" fontWeight="medium">{influencer.name}</Typography>
                      <Chip label={influencer.status} color={statusColors[influencer.status]}/>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{influencer.instagram}</TableCell>
                <TableCell>{influencer.contact}</TableCell>
                <TableCell>{influencer.gender}</TableCell>
                <TableCell>{influencer.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
