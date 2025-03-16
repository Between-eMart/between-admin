import { Offset } from '~/models/aggregate/shared/Offset';

export interface FindEventsByCategoryQuery {
  categoryCodes: string[];
  offset?: Offset;
}
