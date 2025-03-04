import { Gender } from '~/models/aggregate/influencer/vo';

export interface InfluencerCdo {
  name: string;
  surname: string;
  birthday?: string;
  email: string;
  mainPhone: string;
  secondaryPhone?: string;
  country: string;
  city: string;
  gender: Gender;
  password?: string;
  categories: string[];
  isActive: boolean;
  hasAcceptedUserPolicy: boolean;
  profileCreateRequestId?: number;
}
