import { DomainEntity } from '~/models/aggregate/shared';

export interface Establishment extends DomainEntity {
  logo?: string;
  photos?: string[];
  brandId: number;
  categoryIds?: number[];
  contactName?: string;
  contactPhone?: string;
  instagramUsername?: string;
  description?: string;
}
