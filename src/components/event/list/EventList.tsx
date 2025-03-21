import React, { useState } from 'react';
import { Box, Button, Pagination, Paper, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEventRdos } from './hooks';
import { EventFilterPanelView, EventTableView } from './views';
import AddIcon from '@mui/icons-material/Add';
import RegisterEventModal from '~/components/event/form/RegisterEventModal';
import { useIncomingEvents } from '~/hooks';

export const EventList = ({ onDetail }: { onDetail: (eventId: string) => void }) => {
  //
  const { search, setSearch, page, setPage, paginatedEvents, totalPages, applyFilters, clearFilters } = useEventRdos();
  const { events } = useIncomingEvents();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Paper sx={{ width: '100%', p: 3, borderRadius: 2 }}>
      {/* Search & Filters */}
      <Button
        variant="contained"
        onClick={() => {
          setIsOpen(true);
        }}
        endIcon={<AddIcon />}
      >
        Add New Event
      </Button>
      <Box display="flex" gap={2} mt={2} mb={3}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <Search color="disabled" sx={{ mr: 1 }} />,
          }}
          fullWidth
        />
        <EventFilterPanelView onApplyFilters={applyFilters} onClearFilters={clearFilters} />
      </Box>

      {/* Table */}
      <EventTableView events={events} onDetail={(event) => onDetail(event.id)} />

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} color="primary" />
      </Box>
      <RegisterEventModal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </Paper>
  );
};
