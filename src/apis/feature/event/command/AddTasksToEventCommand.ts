import { EventTaskCdo } from '~/models';

export interface AddTasksToEventCommand {
  //
  eventId: number;
  eventTaskCdos: EventTaskCdo[];
}
