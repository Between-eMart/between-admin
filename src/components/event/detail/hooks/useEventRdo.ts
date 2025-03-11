import { mockEventList } from '../../list/hooks/mock-event-list';

export const useEventRdo = (eventId?: string) => {
  //
  return {
    eventRdo: mockEventList.find(event => event.id == eventId),
  };
};
