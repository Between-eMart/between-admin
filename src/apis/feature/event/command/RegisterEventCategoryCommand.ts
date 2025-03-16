import { EventCategoryCdo } from '~/models/aggregate/event/sdo/EventCategoryCdo';

export interface RegisterEventCategoryCommand {
  eventCategoryCdo: EventCategoryCdo;
}
