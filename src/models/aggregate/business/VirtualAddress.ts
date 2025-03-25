import { DomainEntity } from '~/models/aggregate/shared';

export interface VirtualAddress extends DomainEntity {
  timezone: string;
  webUrl: string;
  establishmentId: string;
}
