import { Offset } from '~/models/aggregate/shared/Offset';
import { FindAllEventsQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QueryResponse } from '~/models';
import eventSeekApi from '~/apis/feature/event/rest/EventSeekApi';

export const defaultOffset: Offset = {
  offset: 0,
  limit: 100,
};

export const useEvents = (offset: Offset = defaultOffset) => {
  //
  const query: FindAllEventsQuery = { offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event[]>> = useQuery(
    ['events', 'list', offset],
    () => eventSeekApi.findAllEvents(query),
  );
  
  return {
    events: data?.result || [],
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
