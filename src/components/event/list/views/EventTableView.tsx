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
  Actual: 'success',
  Upcoming: 'primary',
  Archived: 'warning',
};


export const EventTableView = ({ events, onDetail }) => {
  //
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Venue</b></TableCell>
              <TableCell><b>Applied</b></TableCell>
              <TableCell><b>Confirmed</b></TableCell>
              <TableCell><b>Visited</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => onDetail(event)}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: '#ccc' }}> </Avatar>
                    <Box>
                      <Typography color="primary" fontWeight="medium">{event.name}</Typography>
                      <Chip label={event.status} color={statusColors[event.status]}/>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>{event.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
