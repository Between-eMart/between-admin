import { FindIncomingEventsQuery } from '~/apis';
import { Offset } from '~/models/aggregate/shared/Offset';
import { defaultOffset } from './useEvents';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QueryResponse } from '~/models';
import eventSeekApi from '~/apis/feature/event/rest/EventSeekApi';

export const useIncomingEvents = (offset: Offset = defaultOffset) => {
  const query: FindIncomingEventsQuery = { offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event[]>> = useQuery(
    ['events', 'incoming', offset],
    () => eventSeekApi.findIncomingEvents(query),
  );
  
  return {
    events: data?.result || [],
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
