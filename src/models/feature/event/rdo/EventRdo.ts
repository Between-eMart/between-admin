import {
  Establishment,
  Event,
  EventAttendRequest,
  EventCategory,
  EventInviteRequest,
  EventTaskCompletion,
} from '~/models';

export interface EventRdo {
  //
  event: Event;
  establishment: Establishment;
  categories: EventCategory[];
  inviteRequests: EventInviteRequest[];
  attendRequests: EventAttendRequest[];
  completedTasks: EventTaskCompletion[];
}
