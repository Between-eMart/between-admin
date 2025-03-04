import { EventAttendRequestStatus } from '~/models/aggregate/event/vo';

export interface EventAttendRequestCdo {
  status: EventAttendRequestStatus;
  approvedBy?: string;
  influencerId: number;
  eventId: number;
}
