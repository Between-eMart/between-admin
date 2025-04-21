import { Box, Button, Pagination, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useEstablishmentCategories } from './hooks';
import AddIcon from '@mui/icons-material/Add';
import {
  EstablishmentCategoryTableView, OrganizationFilterPanelView,
  RegisterEstablishmentCategoryModal,
  useBusinessMutation,
  useDialog,
} from '~/components';
import SearchIcon from '@mui/icons-material/Search';


export const EstablishmentCategoryList = () => {
  //
  const {
    confirm,
    alert,
  } = useDialog();

  const {
    establishmentCategories,
    fetchByNewQuery,
    total,
    limit,
    offset,
    changeCurrentPage,
    query,
    changeSearchProperties,
    refetchEstablishmentCategories,
  } = useEstablishmentCategories();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    //
    refetchEstablishmentCategories();
    setIsOpen(false);
  };

  const {
    mutation: {
      removeEstablishmentCategory,
    },
  } = useBusinessMutation();

  const handleCategoryDelete = async (establishmentCategoryId: number) => {
    //
    confirm('Are you sure to delete this establishment category?', async () => {
      await removeEstablishmentCategory.mutateAsync({ establishmentCategoryId }, {
        onSuccess: () => {
          alert('Establishment category deleted successfully.');
          refetchEstablishmentCategories();
        },
      });
    });
  };

  return (
    <Paper sx={{ width: '100%', p: 3, borderRadius: 2 }}>
      <Box display="flex" gap={2} mt={2} mb={3}>
        <Button
          variant="contained" endIcon={<AddIcon/>}
          onClick={() => {
            setIsOpen(true);
          }}
        >Add New Category</Button>
      </Box>
      <Box display="flex" gap={2} mt={2} mb={3}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={query.searchKey}
          onChange={(e) => changeSearchProperties('searchKey', e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon onClick={() => fetchByNewQuery()} color="disabled" sx={{ mr: 1 }}/>
            ),
          }}
          fullWidth
          onKeyDown={(event) => {
            event.key === 'Enter' && fetchByNewQuery();
          }}
        />
      </Box>
      <EstablishmentCategoryTableView establishmentCategories={establishmentCategories}
                                      onDelete={handleCategoryDelete}/>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={offset / limit + 1}
          onChange={(_, value) => changeCurrentPage((value - 1) * limit)}
          color="primary"
        />
      </Box>
      <RegisterEstablishmentCategoryModal open={isOpen} handleClose={handleClose}/>
    </Paper>
  );
};
