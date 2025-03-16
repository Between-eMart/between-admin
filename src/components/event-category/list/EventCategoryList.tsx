import { Box, Button, Paper } from '@mui/material';

import React from 'react';
import { EventCategoryTableView } from '~/components/event-category/list/views';
import { useEventCategories } from '~/hooks';
import AddIcon from "@mui/icons-material/Add";
import RegisterEventCategoryModal from '~/components/event-category/list/views/RegisterEventCategoryModal';


export const EventCategoryList = () => {
  //
  const { categories } = useEventCategories();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleClose = () => {
    //
    setIsOpen(false);
  };
  
  return (
    <Paper sx={{ width: '100%', p: 3, borderRadius: 2 }}>
      <Box display="flex" gap={2} mt={2} mb={3}>
        <Button
          variant="contained" endIcon={<AddIcon />}
          onClick={() => {setIsOpen(true)}}
        >Add New Category</Button>
      </Box>
      <EventCategoryTableView eventCategories={categories} />
      <RegisterEventCategoryModal open={isOpen} handleClose={handleClose} />
    </Paper>
  );
};
