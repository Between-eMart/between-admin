import { EventAttendRequestStatus } from '~/models';

export interface RespondToJoinCommand {
  //
  requestId: number;
  status: EventAttendRequestStatus;
}
