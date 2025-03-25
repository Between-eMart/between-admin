import { DomainEntity } from '~/models/aggregate/shared';

export interface EventCategory extends DomainEntity {
  //
  name: string;
  description: string;
  code: string;
}
