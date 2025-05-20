import { EventInviteRequest } from '~/models';

export interface EventInviteRequestRdo {
  //
  eventInviteRequest: EventInviteRequest;
  photoUrl: string;
  startDateTime: string;
  durationInMinutes: number;
}
