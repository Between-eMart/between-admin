import { DomainEntity } from '~/models/aggregate/shared';

export interface InfluencerProfileHealth extends DomainEntity {
  overallRating?: number;
  punctuality?: number;
  powerTalk?: number;
  happyTalk?: number;
  influencerId: number;
}
