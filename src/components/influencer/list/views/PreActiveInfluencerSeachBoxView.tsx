import { FindPreActiveInfluencersQuery } from '~/apis';
import { InfluencerCategory } from '~/models';
import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PreActiveInfluencerFilterPanelView } from './PreActiveInfluencerFilterPanelView';
import React from 'react';

export const PreActiveInfluencerSearchBoxView = (
  {
    searchQuery,
    onChangeSearchProperties,
    onSearch,
    categories,
  }: {
    searchQuery: FindPreActiveInfluencersQuery;
    onChangeSearchProperties: (
      key: keyof FindPreActiveInfluencersQuery,
      value: string | number | number[] | boolean | undefined
    ) => void;
    onSearch: () => void;
    categories: InfluencerCategory[];
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
      <PreActiveInfluencerFilterPanelView
        categories={categories}
        onChangeSearchProperties={onChangeSearchProperties}
        onSearch={onSearch}
        searchQuery={searchQuery}
      />
    </Box>
  );
};
