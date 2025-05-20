import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useEventCategoryMutation } from '~/hooks';

export const EventCategoryTableView = ({ eventCategories }) => {
  //
  const { mutation } = useEventCategoryMutation();
  const { removeEventCategory } = mutation;

  const handleDeleteIconClick = async (eventCategoryId: number) => {
    //
    const confirmResult = confirm('Are you sure to delete this event category?');
    if (confirmResult) {
      removeEventCategory.mutate({ eventCategoryId });
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align={'center'}>
                <b>Code</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Name</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Description</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Registered By</b>
              </TableCell>
              <TableCell align={'center'}>
                <b>Operations</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventCategories.map((category, index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: '10%' }} align={'center'}>
                  {category.code}
                </TableCell>
                <TableCell sx={{ width: '20%' }} align={'center'}>
                  {category.name}
                </TableCell>
                <TableCell sx={{ width: '40%' }} align={'center'}>
                  {category.description}
                </TableCell>
                <TableCell align={'center'}>{category.registeredBy}</TableCell>
                <TableCell align={'center'}>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => handleDeleteIconClick(category.id)}>
                      <DeleteIcon fontSize="small" />
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
