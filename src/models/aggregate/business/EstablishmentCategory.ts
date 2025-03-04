import { DomainEntity } from '~/models/aggregate/shared';

export interface EstablishmentCategory extends DomainEntity {
  name: string;
  note?: string;
  establishmentIds?: number[];
}
