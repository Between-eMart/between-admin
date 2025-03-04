import { DomainEntity } from '~/models/aggregate/shared';

export interface Subscription extends DomainEntity {
  organizationId: number;
  tariffId: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

