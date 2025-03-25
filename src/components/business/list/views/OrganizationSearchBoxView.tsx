import { FindOrganizationNestedRdosQuery } from '~/apis';
import { EstablishmentCategory } from '~/models';
import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { OrganizationFilterPanelView } from './OrganizationFilterPanelView';
import React from 'react';

export const OrganizationSearchBoxView = (
  {
    searchQuery,
    onChangeSearchProperties,
    onSearch,
    categories,
  }: {
    searchQuery: FindOrganizationNestedRdosQuery;
    onChangeSearchProperties: (
      key: keyof FindOrganizationNestedRdosQuery,
      value: string | number | number[] | boolean | undefined
    ) => void;
    onSearch: () => void;
    categories: EstablishmentCategory[];
  },
) => {
  //
  return (
    <Box display="flex" gap={2} mt={2} mb={3}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        value={searchQuery.searchKey}
        onChange={(e) => onChangeSearchProperties('searchKey', e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchIcon onClick={onSearch} color="disabled" sx={{ mr: 1 }}/>
          ),
        }}
        fullWidth
        onKeyDown={(event) => {
          event.key === 'Enter' && onSearch();
        }}
      />
      <OrganizationFilterPanelView
        categories={categories}
        onChangeSearchProperties={onChangeSearchProperties}
        onSearch={onSearch}
        searchQuery={searchQuery}
      />
    </Box>
  );
};
