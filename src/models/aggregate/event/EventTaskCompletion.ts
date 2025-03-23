import { DomainEntity, IdNameValue } from '~/models/aggregate/shared';

export interface EventTaskCompletion extends DomainEntity {
  //
  event: IdNameValue;
  influencers: IdNameValue[];
}
