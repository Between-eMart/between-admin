import { EventSeekApi, FindIncomingEventsQuery } from '~/apis';
import { defaultOffset } from '~/hooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QueryResponse, Offset } from '~/models';

export const useIncomingEvents = (offset: Offset = defaultOffset) => {
  const query: FindIncomingEventsQuery = { offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event[]>> = useQuery({
    queryKey: ['events', 'incoming', offset],
    queryFn: () => EventSeekApi.findIncomingEvents(query),
  });

  return {
    events: data?.result || [],
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
