import { DomainEntity } from '~/models/aggregate/shared';

export interface FAQ extends DomainEntity {
  question: string;
  answer: string;
  isPublished: boolean;
}

