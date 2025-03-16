import { Offset } from '~/models/aggregate/shared/Offset';

export interface FindIncomingEventsQuery {
  offset?: Offset;
}
