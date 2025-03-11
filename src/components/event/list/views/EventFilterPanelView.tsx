import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

const statusList = ['Actual', 'Archived', 'Upcoming'];

export const EventFilterPanelView = ({ onApplyFilters, onClearFilters }) => {
  //
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    statuses: [] as string[],
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setOpen(false);
  };

  const clearFilters = () => {
    setFilters({ statuses: [] });
    onClearFilters();
  };

  return (
    <>
      <Button variant="outlined" startIcon={<FilterList/>} onClick={() => setOpen(true)}>Filters</Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box width={300} p={3}>
          <Typography variant="h6">Filter</Typography>
          <Button onClick={clearFilters} size="small" sx={{ float: 'right' }}>
            Clear Filter
          </Button>

          {/* Interest Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Statuses</InputLabel>
            <Select
              multiple
              value={filters.statuses}
              onChange={(e) => handleFilterChange('statuses', e.target.value)}
              input={<OutlinedInput label="Statuses"/>}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </Box>
              )}
            >
              {statusList.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Apply Filters Button */}
          <Button
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mt: 3 }}
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
