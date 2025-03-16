import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindEventsByNameQuery } from '~/apis';
import { QueryResponse } from '~/models';
import eventSeekApi from '~/apis/feature/event/rest/EventSeekApi';

export const useEventsByName = (name: string) => {
  const query: FindEventsByNameQuery = { name };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event[]>> = useQuery(
    ['events', 'byName', name],
    () => eventSeekApi.findEventsByName(query),
    {
      enabled: !!name,
    },
  );
  
  return {
    events: data?.result || [],
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
