import {
  Avatar,
  Box,
  Button,
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

export const ProfileCreateRequestTableView = ({ influencers, onDetail }) => {
  //
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Instagram</b></TableCell>
              <TableCell><b>Followers</b></TableCell>
              <TableCell/>
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
                      <Chip label={influencer.status} color={'secondary'}/>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{influencer.instagram}</TableCell>
                <TableCell>{influencer.followersCount}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Button fullWidth variant={'contained'} color={'error'}>Reject</Button>
                    <Button fullWidth variant={'contained'} color={'success'}>Accept</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
