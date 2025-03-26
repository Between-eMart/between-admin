import {
  Avatar,
  Box, Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { EstablishmentDetailRdo } from '~/models';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EstablishmentDetailDialogView } from './EstablishmentDetailDialogView';
import { EstablishmentEditButtonView } from '~/components';


export const EstablishmentTableView = (
  {
    establishmentRdos,
    onDelete,
  }: {
    establishmentRdos: EstablishmentDetailRdo[];
    onDelete: (establishmentId: number) => void;
  },
) => {
  //
  const [selectedEstablishmentRdo, setSelectedEstablishmentRdo] = useState<EstablishmentDetailRdo>();

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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {establishmentRdos.map((establishmentRdo, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => setSelectedEstablishmentRdo(establishmentRdo)}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: '#ccc' }}> </Avatar>
                    <Typography color="primary" fontWeight="medium">{establishmentRdo.brandIdName.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{`${establishmentRdo.establishment.contactName} (${establishmentRdo.establishment.contactPhone})`}</TableCell>
                <TableCell>{establishmentRdo.establishment.instagramUsername}</TableCell>
                <TableCell>{establishmentRdo.physicalAddress?.location || establishmentRdo.virtualAddress?.webUrl}</TableCell>
                <TableCell>{establishmentRdo.categories.map(({ name }) => name).join(', ')}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <EstablishmentEditButtonView establishmentId={establishmentRdo.establishment.id}/>
                    <IconButton
                      color={'error'}
                      onClick={() => onDelete(establishmentRdo.establishment.id)}><DeleteIcon/></IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!!selectedEstablishmentRdo &&
        <EstablishmentDetailDialogView
          establishmentRdo={selectedEstablishmentRdo}
          onClose={() => setSelectedEstablishmentRdo(undefined)}
        />}
    </>
  );
};
