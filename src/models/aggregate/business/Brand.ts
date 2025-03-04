import { DomainEntity } from '~/models/aggregate/shared';

export interface Brand extends DomainEntity {
  name: string;
  organizationId: number;
}
