import {
  Avatar,
  Box,
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
import { EstablishmentDetailDialogView } from './EstablishmentDetailDialogView';
import { EstablishmentEditButtonView } from '~/components';


export const EstablishmentTableView = (
  {
    establishmentRdos,
    onSuccess,
    onDelete,
  }: {
    establishmentRdos: EstablishmentDetailRdo[];
    onSuccess: () => void;
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
              <TableCell><b>Category</b></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {establishmentRdos.map((establishmentRdo, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => setSelectedEstablishmentRdo(establishmentRdo)}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: '#ccc' }} src={establishmentRdo.establishment.logo}> </Avatar>
                    <Typography color="primary" fontWeight="medium">{establishmentRdo.brandIdName.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{`${establishmentRdo.establishment.contactName} (${establishmentRdo.establishment.contactPhone})`}</TableCell>
                <TableCell>{establishmentRdo.establishment.instagramUsername}</TableCell>
                <TableCell>{establishmentRdo.categories.map(({ name }) => name).join(', ')}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <EstablishmentEditButtonView establishmentId={establishmentRdo.establishment.id} onSuccess={onSuccess} />
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
