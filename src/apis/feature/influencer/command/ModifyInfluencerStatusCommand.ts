import { ProfileStatus } from '~/models';

export interface ModifyInfluencerStatusCommand {
  //
  influencerId: number;
  status: ProfileStatus;
}
