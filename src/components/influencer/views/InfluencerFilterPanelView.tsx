import React, { useState } from 'react';
import {
  Drawer,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
  Checkbox,
  Typography, OutlinedInput, Chip,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

const interestsList = [
  'Beauty', 'Art and design', 'Relax', 'Cars and transport', 'Food',
  'Fitness', 'Books', 'Gym', 'Fashion', 'Activity', 'Shooting',
  'Finance', 'Games', 'Cure', 'Concerts and festivals', 'IT technology',
  'Lifestyle', 'Marketing', 'Psychology', 'Music', 'Nature',
  'News and media', 'Personal growth', 'Photography', 'Politics',
  'Property', 'Travelling', 'TV and films',
];

export const InfluencerFilterPanelView = ({ onApplyFilters, onClearFilters }) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    interests: [],
    gender: '',
    selectedInterests: [] as string[],
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (interest) => {
    setFilters((prev) => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter((i) => i !== interest)
        : [...prev.selectedInterests, interest],
    }));
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setOpen(false);
  };

  const clearFilters = () => {
    setFilters({ interests: [], gender: '', selectedInterests: [] });
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
            <InputLabel>Interests</InputLabel>
            <Select
              multiple
              value={filters.interests}
              onChange={(e) => handleFilterChange('interests', e.target.value)}
              input={<OutlinedInput label="Interests" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {interestsList.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Gender Selection */}
          <Typography variant="subtitle1" mt={2}>Gender</Typography>
          <RadioGroup
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>

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
