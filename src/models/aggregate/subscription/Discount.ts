import { DomainEntity } from '~/models/aggregate/shared';

export interface Discount extends DomainEntity {
  name: string;
  discountValue: number;
  description?: string;
}

