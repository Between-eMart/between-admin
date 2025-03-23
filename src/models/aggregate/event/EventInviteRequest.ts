import { DomainEntity, IdNameValue } from '~/models/aggregate/shared';
import { EventInviteStatus } from '~/models/aggregate/event/vo';

export interface EventInviteRequest extends DomainEntity {
  //
  status: EventInviteStatus;
  influencer: IdNameValue;
  event: IdNameValue;
}
