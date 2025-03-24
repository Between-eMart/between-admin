import { EventInviteStatus } from '~/models';

export interface RespondToInviteCommand {
  //
  requestId: number;
  status: EventInviteStatus;
}
