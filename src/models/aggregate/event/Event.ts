import { DomainEntity } from '~/models/aggregate/shared';
import { EventStatus } from '~/models/aggregate/event/vo';
import { EventBanner, EventTask } from '~/models';

export interface Event extends DomainEntity {
  //
  name: string;
  description: string;
  organizers: string;
  date: string;
  time: string;
  dressCode: string;
  adviceForAttenders: string;
  rules: string;
  venue: string;
  location: string;
  ageRestriction: string;
  isRepeatable: boolean;
  status: EventStatus;
  banners: EventBanner[];
  tasks: EventTask[];
}
