import { Offset } from '~/models/aggregate/shared/Offset';

export interface QueryResponse<T> {
  result?: T;
  offset?: Offset;
  requestFailed?: boolean;
  failureMessage?: {
    exceptionName?: string;
    exceptionMessage?: string;
    exceptionCode?: string;
  };
}
