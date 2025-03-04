import { EventTaskStatus } from '~/models/aggregate/event/vo';

export interface EventAttendanceCdo {
  eventId: number;
  rate?: number;
  feedback?: string;
  status: EventTaskStatus;
  influencerId: number;
}
