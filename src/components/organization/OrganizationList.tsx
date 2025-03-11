import React, { useState } from 'react';
import { Box, Pagination, Paper, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useOrganizationRdos } from './hooks';
import { OrganizationDetailDialogView, OrganizationFilterPanelView, OrganizationTableView } from './views';

export const OrganizationList = () => {
  //
  const [selectedOrganization, setSelectedOrganization] = useState<any>();
  const {
    search,
    setSearch,
    page,
    setPage,
    paginatedOrganizations,
    totalPages,
    applyFilters,
    clearFilters,
  } = useOrganizationRdos();

  return (
    <>
      <Paper sx={{ width: '100%', p: 3, borderRadius: 2 }}>
        {/* Search & Filters */}

        <Box display="flex" gap={2} mt={2} mb={3}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search color="disabled" sx={{ mr: 1 }}/>,
            }}
            fullWidth
          />
          <OrganizationFilterPanelView
            onApplyFilters={applyFilters}
            onClearFilters={clearFilters}
          />
        </Box>

        {/* Table */}
        <OrganizationTableView
          organizations={paginatedOrganizations}
          onDetail={organization => setSelectedOrganization(organization)}
        />

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Paper>
      {!!selectedOrganization &&
        <OrganizationDetailDialogView organization={selectedOrganization}
                                      onClose={() => setSelectedOrganization(undefined)}/>}
    </>
  );
};
