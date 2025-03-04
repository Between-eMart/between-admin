import { ProfileStatus } from '~/models/aggregate/influencer/vo';

export interface ProfileCreateRequestCdo {
  status: ProfileStatus;
  approvedBy?: string;
  influencerId?: number;
}
