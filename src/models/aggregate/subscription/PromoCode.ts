import { DomainEntity } from '~/models/aggregate/shared';

export interface PromoCode extends DomainEntity {
  code: string;
  discountPercentage: number;
  expiryDate: string;
}

