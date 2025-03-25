import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventSeekApi, FindEventsByCategoryQuery } from '~/apis';
import { QueryResponse, Offset } from '~/models';
import { defaultOffset } from '~/hooks';

export const useEventsByCategory = (categoryCodes: string[], offset: Offset = defaultOffset) => {
  //
  const query: FindEventsByCategoryQuery = { categoryCodes, offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event[]>> = useQuery({
    queryKey: ['events', 'byCategory', categoryCodes, offset],
    queryFn: () => EventSeekApi.findEventsByCategory(query),
    enabled: categoryCodes.length > 0,
  });

  return {
    events: data?.result || [],
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
