import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventSeekApi, FindEventsByCategoryQuery } from '~/apis';
import { EventRdo, Offset, QueryResponse } from '~/models';
import { defaultOffset } from '~/hooks';

export const useEventsByCategory = (categoryCodes: string[], offset: Offset = defaultOffset) => {
  //
  const query: FindEventsByCategoryQuery = { categoryCodes, offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventRdo[]>> = useQuery({
    queryKey: ['events', 'byCategory', categoryCodes, offset],
    queryFn: () => EventSeekApi.findEventsByCategory(query),
    enabled: categoryCodes.length > 0,
  });

  return {
    events: (data?.result || []).map(rdo => rdo.event),
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
