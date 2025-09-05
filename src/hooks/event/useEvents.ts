import { EventSeekApi, FindAllEventsQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QueryResponse, Offset, EventRdo } from '~/models';

export const defaultOffset: Offset = {
  offset: 0,
  limit: 100,
};

export const useEvents = (offset: Offset = defaultOffset) => {
  //
  const query: FindAllEventsQuery = { offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventRdo[]>> = useQuery({
    queryKey: ['events', 'list', offset],
    queryFn: () => EventSeekApi.findAllEvents(query),
  });

  return {
    events: (data?.result || []).map(rdo => rdo.event),
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
