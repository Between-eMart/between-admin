import { EventsStatisticsRdo } from './EventsStatisticsRdo';
import { InfluencerStatisticsRdo } from './InfluencerStatisticsRdo';

export interface OverallStatisticsRdo {
  influencerStatisticsRdo: InfluencerStatisticsRdo;
  eventsStatisticsRdo: EventsStatisticsRdo;
  organizationsTotalQty: number;
}
