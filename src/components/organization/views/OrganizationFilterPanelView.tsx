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

const categoriesList = [
  "Restaurant",
  "Cafe",
  "Barbershop",
  "Beauty Salon",
  "Spa & Wellness",
  "Grocery Store",
  "Clothing Store",
  "Shoe Store",
  "Jewelry Store",
  "IT Services",
  "Fitness Center",
  "Car Repair",
  "Bookstore",
  "Pet Store",
  "Pharmacy",
  "Electronics Store",
  "Home Appliances",
  "Furniture Store",
  "Real Estate Agency",
  "Legal Services",
  "Medical Clinic",
  "Dentist",
  "Event Planning",
  "Photography Studio",
  "Printing Services",
  "Marketing Agency",
  "Travel Agency",
  "Hotel",
  "Courier Service",
  "Coworking Space",
  "Laundry Service",
  "Tattoo Studio",
  "Florist",
  "Handmade Crafts",
  "Toy Store",
  "Automobile Dealership",
  "Construction Services",
  "Architectural Firm",
  "Financial Consulting",
  "Language School",
  "Music School",
  "Dance Studio",
  "Martial Arts School",
  "Bicycle Shop",
  "Gaming Lounge",
  "Bar & Lounge",
  "Fast Food",
  "Organic Food Store",
  "Vegan Restaurant"
];

export const OrganizationFilterPanelView = ({ onApplyFilters, onClearFilters }) => {
  //
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
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
    setFilters({ categories: [] });
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
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={filters.categories}
              onChange={(e) => handleFilterChange('categories', e.target.value)}
              input={<OutlinedInput label="Categories"/>}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value}/>
                  ))}
                </Box>
              )}
            >
              {categoriesList.map((item) => (
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
