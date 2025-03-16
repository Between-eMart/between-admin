import { Offset } from '~/models/aggregate/shared/Offset';

export interface FindEventsByEstablishmentQuery {
  establishmentId: number;
  offset?: Offset;
}
