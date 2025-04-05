import React, { SyntheticEvent, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useActiveInfluencers, useInfluencerCategories, usePreActiveInfluencers } from './hooks';
import {
  ActiveInfluencersTableView,
  InfluencerDetailDialogView,
  PreActiveInfluencersTableView,
} from './views';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { Influencer } from '~/models';
import { InfluencerCategoriesList } from '~/components/influencer/list/views/InfluencerCategoriesList';

export const InfluencerList = () => {
  //
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer>();
  const [tabValue, setTabValue] = useState('1');

  const activeInfluencers = useActiveInfluencers();

  const preActiveInfluencers = usePreActiveInfluencers();

  const { influencerCategories } = useInfluencerCategories();

  const handleTabValueChange = (event: SyntheticEvent, newValue: string) => {
    //
    setTabValue(newValue);
  };

  return (
    <>
      <Paper sx={{ width: '100%', p: 3, borderRadius: 2 }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabValueChange} aria-label="lab API tabs example">
              <Tab label="Influencers" value="1" />
              <Tab label="Requests" value="2" />
              <Tab label="Category" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ActiveInfluencersTableView
              influencers={activeInfluencers.influencers}
              total={activeInfluencers.total}
              offset={activeInfluencers.offset}
              limit={activeInfluencers.limit}
              onPageChange={activeInfluencers.changeCurrentPage}
              onDetail={(influencer) => setSelectedInfluencer(influencer)}
              categories={influencerCategories}
              onChangeSearchProperties={activeInfluencers.changeSearchProperties}
              onSearch={() => activeInfluencers.fetchByNewQuery()}
              searchQuery={activeInfluencers.query}
            />
          </TabPanel>
          <TabPanel value="2">
            <PreActiveInfluencersTableView
              influencers={preActiveInfluencers.influencers}
              total={preActiveInfluencers.total}
              offset={preActiveInfluencers.offset}
              limit={preActiveInfluencers.limit}
              onPageChange={preActiveInfluencers.changeCurrentPage}
              onDetail={(influencer) => setSelectedInfluencer(influencer)}
              categories={influencerCategories}
              onChangeSearchProperties={preActiveInfluencers.changeSearchProperties}
              onSearch={() => preActiveInfluencers.fetchByNewQuery()}
              searchQuery={preActiveInfluencers.query}
              onAccept={async (influencerId) => {}}
              onReject={async (influencerId) => {}}
            />
          </TabPanel>
          <TabPanel value={'3'}>
            <InfluencerCategoriesList />
          </TabPanel>
        </TabContext>
      </Paper>
      {!!selectedInfluencer && (
        <InfluencerDetailDialogView influencer={selectedInfluencer} onClose={() => setSelectedInfluencer(undefined)} />
      )}
    </>
  );
};
