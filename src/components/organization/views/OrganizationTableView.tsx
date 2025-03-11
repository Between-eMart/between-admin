import {
  Avatar,
  Box,
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


export const OrganizationTableView = ({organizations, onDetail}) => {
  //
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead sx={{backgroundColor: '#f5f5f5'}}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Contact</b></TableCell>
              <TableCell><b>Instagram</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Category</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((organization, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => onDetail(organization)}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{bgcolor: '#ccc'}}>{organization.name[0]}</Avatar>
                    <Typography color="primary" fontWeight="medium">{organization.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{organization.contact}</TableCell>
                <TableCell>{organization.instagram}</TableCell>
                <TableCell>{organization.location}</TableCell>
                <TableCell>{organization.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
