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
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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
              <TableCell align={'center'}>
                <b>Name</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Status</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Description</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Venue</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Start</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Duration</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Age Restriction</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => onDetail(event)} align={'center'}>
                  <Typography color="primary" fontWeight="medium">
                    {event.name}
                  </Typography>
                </TableCell>
                <TableCell align={'center'}>
                  <Chip label={event.status} color={statusColors[event.status]} />
                </TableCell>
                <TableCell align={'center'}>{event.description}</TableCell>
                <TableCell align={'center'}>{event.venue}</TableCell>
                <TableCell align={'center'}>{event.startDateTime}</TableCell>
                <TableCell align={'center'}>{dayjs.duration(dayjs(event.endDateTime).diff(event.startDateTime)).asHours()}h</TableCell>
                <TableCell align={'center'}>{event.ageRestriction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
