import { DomainEntity } from '~/models/aggregate/shared';
import { EventInviteStatus } from '~/models/aggregate/event/vo';

export interface EventInviteRequest extends DomainEntity {
  status: EventInviteStatus;
  influencerId: number;
  eventId: number;
}
