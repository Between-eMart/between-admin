import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { EstablishmentCategory } from '~/models';

export const EstablishmentCategoryTableView = (
  {
    establishmentCategories,
    onDelete,
  }: {
    establishmentCategories: EstablishmentCategory[];
    onDelete: (categoryId: number) => Promise<void>;
  },
) => {
  //s
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
                <b>Note</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Registered By</b>
              </TableCell>
              <TableCell align={'center'}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {establishmentCategories.map((category, index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: '20%' }} align={'center'}>
                  {category.name}
                </TableCell>
                <TableCell sx={{ width: '40%' }} align={'center'}>
                  {category.note}
                </TableCell>
                <TableCell align={'center'}>{category.registeredBy}</TableCell>
                <TableCell align={'center'}>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => onDelete(category.id)}>
                      <DeleteIcon fontSize="small"/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
