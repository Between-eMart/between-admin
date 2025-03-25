import { Gender, ProfileStatus } from '~/models/aggregate/influencer/vo';
import { DomainEntity } from '~/models/aggregate/shared';
import { InfluencerCategory } from '~/models';

export interface Influencer extends DomainEntity {
  name: string;
  surname: string;
  birthday: string;
  email: string;
  mainPhone: string;
  secondaryPhone: string;
  snsUsername: string;
  country: string;
  city: string;
  gender: Gender;
  categories: InfluencerCategory[];
  isActive: boolean;
  hasAcceptedUserPolicy: boolean;
  profileStatus: ProfileStatus;
  profileHealthId: number;
}
