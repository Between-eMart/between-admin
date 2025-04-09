import { Offset } from '~/models/aggregate/shared/Offset';

export interface QueryResponse<T> {
  result?: T;
  offset?: Offset;
}
