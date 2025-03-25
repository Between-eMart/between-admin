import { DomainEntity } from '~/models';

export interface InfluencerCategory extends DomainEntity {
  //
  name: string;
  description: string;
  code: string;
}
