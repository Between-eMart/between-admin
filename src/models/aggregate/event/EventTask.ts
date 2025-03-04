import { DomainEntity } from '~/models/aggregate/shared';

export interface EventTask extends DomainEntity {
  name: string;
  description?: string;
  eventId: number;
}
