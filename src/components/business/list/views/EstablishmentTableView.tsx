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
import {EstablishmentDetailRdo} from "~/models";

const statusColors = {
  Confirm: 'success',
  Banned: 'error',
  Reject: 'warning',
};


export const EstablishmentTableView = (
  {
    establishmentRdos,
    onDetail,
  }: {
    establishmentRdos: EstablishmentDetailRdo[];
    onDetail?: (establishmentRdo: EstablishmentDetailRdo) => void;
  }
  ) => {
  //
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Contact</b></TableCell>
              <TableCell><b>Instagram</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Category</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {establishmentRdos.map((establishmentRdo, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => onDetail && onDetail(establishmentRdo)}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: '#ccc' }}> </Avatar>
                    <Typography color="primary" fontWeight="medium">{establishmentRdo.brandIdName.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{`${establishmentRdo.establishment.contactName} (${establishmentRdo.establishment.contactPhone})`}</TableCell>
                <TableCell>{establishmentRdo.establishment.instagramUsername}</TableCell>
                <TableCell>{establishmentRdo.physicalAddress?.location || establishmentRdo.virtualAddress?.webUrl}</TableCell>
                <TableCell>{establishmentRdo.categories.map(({name})=> name).join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
