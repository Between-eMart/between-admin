import { EventInviteStatus } from '~/models/aggregate/event/vo';

export interface EventInviteRequestCdo {
  status: EventInviteStatus;
  influencerId: number;
  eventId: number;
}
