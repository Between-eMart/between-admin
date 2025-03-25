import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventSeekApi, FindEventsByNameQuery } from '~/apis';
import { QueryResponse } from '~/models';

export const useEventsByName = (name: string) => {
  const query: FindEventsByNameQuery = { name };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event[]>> = useQuery({
    queryKey: ['events', 'byName', name],
    queryFn: () => EventSeekApi.findEventsByName(query),
    enabled: !!name,
  });

  return {
    events: data?.result || [],
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
