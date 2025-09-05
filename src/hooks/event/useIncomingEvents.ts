import { EventSeekApi, FindIncomingEventsQuery } from '~/apis';
import { defaultOffset } from '~/hooks';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QueryResponse, Offset, EventRdo } from '~/models';

export const useIncomingEvents = (offset: Offset = defaultOffset) => {
  const query: FindIncomingEventsQuery = { offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventRdo[]>> = useQuery({
    queryKey: ['events', 'incoming', offset],
    queryFn: () => EventSeekApi.findIncomingEvents(query),
  });

  return {
    events: (data?.result || []).map(rdo => rdo.event),
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
