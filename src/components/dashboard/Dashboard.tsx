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
  const {
    overallStatisticsRdo: {
      influencerStatisticsRdo,
      eventsStatisticsRdo,
      organizationsTotalQty,
    },
  } = useStatistics();

  return (
    <>
      <Stack spacing={2} style={{ width: '100%' }}>
        <InfluencerStatisticsCardView
          confirmedQty={influencerStatisticsRdo.confirmedQty}
          bannedQty={influencerStatisticsRdo.bannedQty}
          rejectedQty={influencerStatisticsRdo.rejectedQty}
          requestedQty={influencerStatisticsRdo.requestedQty}
        />
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <EventsStatisticsCardView
              activeQty={eventsStatisticsRdo.activeQty}
              archivedQty={eventsStatisticsRdo.archivedQty}
              upcomingQty={eventsStatisticsRdo.upcomingQty}
            />
          </Grid2>
          <Grid2 size={4}>
            <OrganizationStatisticsCardView
              totalQty={organizationsTotalQty}
            />
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
};

