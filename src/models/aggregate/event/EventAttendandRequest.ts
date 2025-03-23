import { EventAttendRequestStatus } from '~/models/aggregate/event/vo';
import { DomainEntity, IdNameValue } from '~/models/aggregate/shared';

export interface EventAttendRequest extends DomainEntity {
  //
  status: EventAttendRequestStatus;
  approvedBy?: string;
  influencer: IdNameValue;
  event: IdNameValue;
}
