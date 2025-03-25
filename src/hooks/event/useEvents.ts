import {EventSeekApi, FindAllEventsQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QueryResponse, Offset } from '~/models';

export const defaultOffset: Offset = {
  offset: 0,
  limit: 100,
};

export const useEvents = (offset: Offset = defaultOffset) => {
  //
  const query: FindAllEventsQuery = { offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event[]>> = useQuery({
    queryKey: ['events', 'list', offset],
    queryFn: () => EventSeekApi.findAllEvents(query),
  });

  return {
    events: data?.result || [],
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
