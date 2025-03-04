import { DomainEntity } from '~/models/aggregate/shared';

export interface Tariff extends DomainEntity {
  name: string;
  price: number;
  description?: string;
}

