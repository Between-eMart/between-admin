import { Grid2, Stack } from '@mui/material';
import * as React from 'react';
import { useStatistics } from './hooks';
import {
  EventsStatisticsCardView,
  InfluencerStatisticsCardView,
  OrganizationStatisticsCardView,
} from './views';

export const Dashboard = () => {
  //
  const { overallStatData } = useStatistics();

  return (
    <>
      <Stack spacing={2} style={{ width: '100%' }}>
        <InfluencerStatisticsCardView
          confirmedQty={overallStatData?.influencerStatisticsRdo?.confirmedCount || 0}
          bannedQty={overallStatData?.influencerStatisticsRdo.bannedCount || 0}
          rejectedQty={overallStatData?.influencerStatisticsRdo.rejectedCount || 0}
          requestedQty={overallStatData?.influencerStatisticsRdo.requestedCount || 0}
        />
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <EventsStatisticsCardView
              postponedQty={overallStatData?.eventsStatisticsRdo.postponedCount || 0}
              draftedQty={overallStatData?.eventsStatisticsRdo.draftedCount || 0}
              publishedQty={overallStatData?.eventsStatisticsRdo.publishedCount || 0}
            />
          </Grid2>
          <Grid2 size={4}>
            <OrganizationStatisticsCardView
              totalQty={overallStatData?.totalOrganizations || 0}
            />
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
};

