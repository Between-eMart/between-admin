import { DomainEntity, IdNameValue } from '~/models/aggregate/shared';

export interface EventTask extends DomainEntity {
  //
  name: string;
  description: string;
  event: IdNameValue;
}
