import { DomainEntity } from '~/models/aggregate/shared';

export interface EventTaskCompletion extends DomainEntity {
  eventId: string;
  influencers: number[];
}
