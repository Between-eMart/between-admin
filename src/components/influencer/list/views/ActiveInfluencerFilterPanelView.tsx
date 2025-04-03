import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Drawer,
  FormControl, FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput, Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { Gender, InfluencerCategory, ProfileStatus } from '~/models';
import { FindActiveInfluencersQuery } from '~/apis';

export const ActiveInfluencerFilterPanelView = (
  {
    categories,
    onChangeSearchProperties,
    onSearch,
    searchQuery,
  }: {
    categories: InfluencerCategory[];
    onChangeSearchProperties: (key: keyof FindActiveInfluencersQuery, value: string | number | number[] | boolean | undefined) => void;
    onSearch: () => void;
    searchQuery: any;
  }) => {
  //
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" startIcon={<FilterList/>} onClick={() => setOpen(true)}>Filters</Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box width={300} p={3}>
          <Typography variant="h6">Filter</Typography>
          <Button onClick={() => onChangeSearchProperties('categoryIds', undefined)} size="small" sx={{ float: 'right' }}>
            Clear Filter
          </Button>

          {/* Interest Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={searchQuery.categoryIds || []}
              onChange={(e) => {
                const targetCategoryIds = e.target.value as number[];
                onChangeSearchProperties('categoryIds', targetCategoryIds);
              }}
              input={<OutlinedInput label="Categories"/>}
              renderValue={(selected) => {
                const selectedCategories = categories.filter(category => selected.includes(category.id));
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedCategories.map((category) => (
                      <Chip key={category.id} label={category.name} />
                    ))}
                  </Box>
                );
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="subtitle1" mt={2}>Gender</Typography>
          <RadioGroup
            value={searchQuery.gender}
            onChange={(e) => onChangeSearchProperties('gender', e.target.value)}
          >
            <FormControlLabel value={Gender.MALE} control={<Radio/>} label="Male"/>
            <FormControlLabel value={Gender.FEMALE} control={<Radio/>} label="Female"/>
          </RadioGroup>

          <Typography variant="subtitle1" mt={2}>Status</Typography>
          <RadioGroup
            value={searchQuery.gender}
            onChange={(e) => onChangeSearchProperties('status', e.target.value)}
          >
            <FormControlLabel value={ProfileStatus.REQUESTED} control={<Radio/>} label="Requested"/>
            <FormControlLabel value={ProfileStatus.VERIFIED} control={<Radio/>} label="Verified"/>
            <FormControlLabel value={ProfileStatus.REJECTED} control={<Radio/>} label="Rejected"/>
            <FormControlLabel value={ProfileStatus.BLOCKED} control={<Radio/>} label="Blocked"/>
          </RadioGroup>

          {/* Apply Filters Button */}
          <Button
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mt: 3 }}
            onClick={onSearch}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
