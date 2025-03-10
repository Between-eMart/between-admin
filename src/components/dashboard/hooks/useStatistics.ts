import {EventsStatisticsRdo, InfluencerStatisticsRdo, OverallStatisticsRdo} from '~/models';

export const useStatistics = () => {
  //
  const mockEventsStatisticsRdo:EventsStatisticsRdo = {
    activeQty: Math.round(Math.random() * 100),
    archivedQty: Math.round(Math.random() * 100),
    upcomingQty: Math.round(Math.random() * 100),
  };

  const mockInfluencerStatisticsRdo: InfluencerStatisticsRdo = {
    bannedQty: Math.round(Math.random() * 100),
    confirmedQty: Math.round(Math.random() * 100),
    rejectedQty: Math.round(Math.random() * 100),
    requestedQty: Math.round(Math.random() * 100),

  };

  const mockStatisticsRdo: OverallStatisticsRdo = {
    eventsStatisticsRdo: mockEventsStatisticsRdo,
    influencerStatisticsRdo: mockInfluencerStatisticsRdo,
    organizationsTotalQty: Math.round(Math.random() * 100),
  };

  return {
    overallStatisticsRdo: mockStatisticsRdo,
  };
};
