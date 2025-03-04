import { DomainEntity } from '~/models/aggregate/shared';
import { EventTaskStatus } from '~/models/aggregate/event/vo';

export interface EventAttendance extends DomainEntity {
  rate?: number;
  feedback?: string;
  status: EventTaskStatus;
  influencerId: number;
  eventId: number;
}
