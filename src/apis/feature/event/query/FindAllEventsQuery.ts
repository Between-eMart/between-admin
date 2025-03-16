import { Offset } from '~/models/aggregate/shared/Offset';

export interface FindAllEventsQuery {
  offset?: Offset;
}
