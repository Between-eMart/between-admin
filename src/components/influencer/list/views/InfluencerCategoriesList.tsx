import { Box, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { InfluencerCategoryTableView, useInfluencerCategories } from '~/components';
import React, { useState } from 'react';

import { RegisterInfluencerCategoryModal } from '~/components/influencer/list/form';

export const InfluencerCategoriesList = () => {
  //
  const { influencerCategories, refetch } = useInfluencerCategories();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    //
    refetch();
    setIsOpen(false);
  };

  return (
    <Paper sx={{ width: '100%', p: 1, borderRadius: 2 }}>
      <Box display="flex" gap={1} mt={1} mb={1}>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add New Category
        </Button>
      </Box>
      <InfluencerCategoryTableView categories={influencerCategories} />
      <RegisterInfluencerCategoryModal open={isOpen} handleClose={handleClose} />
    </Paper>
  );
};
