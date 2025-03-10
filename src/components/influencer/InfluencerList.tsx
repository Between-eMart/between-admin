import React, { SyntheticEvent, useState } from 'react';
import { Box, Button, Pagination, Paper, TextField } from '@mui/material';
import { FilterList, Search } from '@mui/icons-material';
import { useInfluencerRdos } from './hooks';
import { InfluencerDetailDialogView, InfluencerTableView, ProfileCreateRequestTableView } from './views';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

export const InfluencerList = () => {
  //
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>();
  const [tabValue, setTabValue] = useState('1');
  const {
    search,
    setSearch,
    page,
    setPage,
    paginatedInfluencers,
    totalPages,
  } = useInfluencerRdos(tabValue != '1');
  const handleTabValueChange = (event: SyntheticEvent, newValue: string) => {
    //
    setTabValue(newValue);
  };
  return (
    <>
      <Paper sx={{ width: '100%', p: 3, borderRadius: 2 }}>
        {/* Search & Filters */}
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabValueChange} aria-label="lab API tabs example">
              <Tab label="Influencers" value="1"/>
              <Tab label="Requests" value="2"/>
            </TabList>
          </Box>
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
            <Button variant="outlined" startIcon={<FilterList/>}>
              Filters
            </Button>
          </Box>

          {/* Table */}

          <TabPanel value="1">
            <InfluencerTableView
              influencers={paginatedInfluencers}
              onDetail={influencer => setSelectedInfluencer(influencer)}
            />
          </TabPanel>
          <TabPanel value="2">
            <ProfileCreateRequestTableView
              influencers={paginatedInfluencers}
              onDetail={influencer => setSelectedInfluencer(influencer)}
            />
          </TabPanel>

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </TabContext>
      </Paper>
      {!!selectedInfluencer &&
        <InfluencerDetailDialogView influencer={selectedInfluencer} onClose={() => setSelectedInfluencer(undefined)}/>}
    </>
  );
};
