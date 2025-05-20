import { EventAttendRequest } from '~/models';

export interface EventAttendRequestRdo {
  //
  eventAttendRequest: EventAttendRequest;
  photoUrl: string;
  startDateTime: string;
  durationInMinutes: number;
}
