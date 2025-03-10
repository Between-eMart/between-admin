import { Box, Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';

export const OrganizationStatisticsCardView = (
  {
    totalQty,
  }: {
    totalQty: number;
  }
) => {
  //
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent style={{ padding: 25, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography gutterBottom variant="h5" component="div"
                      style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={'/icon-check.svg'} alt="check" height={30}/>
            Organizations
          </Typography>
        </Box>
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Typography variant="h6" color="textSecondary">QTY of Organizations</Typography>
          <Typography variant="h4" fontWeight="bold">{totalQty}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};
