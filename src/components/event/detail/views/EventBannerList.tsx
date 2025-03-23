import { EventBanner } from '~/models';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

export const EventBannerList = ({ banners }: { banners: EventBanner[] }) => {
  //

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Path</TableCell>
            <TableCell align="center">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {banners.map((banner) => (
            <TableRow key={banner.id}>
              <TableCell align="center" width={'30%'}>
                {banner.name}
              </TableCell>
              <TableCell align="center" width={'60%'}>
                {banner.filePath || '--'}
              </TableCell>
              <TableCell align="center">
                <Button variant="outlined" color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
