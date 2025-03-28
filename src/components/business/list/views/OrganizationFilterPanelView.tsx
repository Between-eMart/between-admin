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
import { EstablishmentCategory } from '~/models';
import { FindOrganizationNestedRdosQuery } from '~/apis';

export const OrganizationFilterPanelView = (
  {
    categories,
    onChangeSearchProperties,
    onSearch,
    searchQuery,
  }: {
    categories: EstablishmentCategory[];
    onChangeSearchProperties: (key: keyof FindOrganizationNestedRdosQuery, value: string | number | number[] | boolean | undefined) => void;
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
