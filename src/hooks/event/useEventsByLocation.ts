import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventSeekApi, FindEventsByLocationQuery } from '~/apis';
import { EventRdo, QueryResponse } from '~/models';

export const useEventsByLocation = (location: string) => {
  //
  const query: FindEventsByLocationQuery = { location };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventRdo[]>> = useQuery({
    queryKey: ['events', 'byLocation', location],
    queryFn: () => EventSeekApi.findEventsByLocation(query),
    enabled: !!location,
  });

  return {
    events: (data?.result || []).map(rdo => rdo.event),
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
