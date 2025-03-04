import { EventAttendRequestStatus } from '~/models/aggregate/event/vo';
import { DomainEntity } from '~/models/aggregate/shared';

export interface EventAttendRequest extends DomainEntity {
  //
  status: EventAttendRequestStatus;
  approvedBy?: string;
  influencerId: number;
  eventId: number;
}
