import { DomainEntity } from '~/models/aggregate/shared';

export interface PhysicalAddress extends DomainEntity {
  mapUrl?: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  postIndex?: string;
  city: string;
  location?: string;
  establishmentId: string;
}
