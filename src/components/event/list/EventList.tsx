import React from 'react';
import { Box, Pagination, Paper, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEventRdos } from './hooks';
import { EventFilterPanelView, EventTableView } from './views';

export const EventList = (
  {
    onDetail,
  }:{
    onDetail: (eventId: string) => void;
  },
) => {
  //
  const {
    search,
    setSearch,
    page,
    setPage,
    paginatedEvents,
    totalPages,
    applyFilters,
    clearFilters,
  } = useEventRdos();

  return (
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
        <EventFilterPanelView
          onApplyFilters={applyFilters}
          onClearFilters={clearFilters}
        />
      </Box>

      {/* Table */}
      <EventTableView
        events={paginatedEvents}
        onDetail={event => onDetail(event.id)}
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
  );
};
