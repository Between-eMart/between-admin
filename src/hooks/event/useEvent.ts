import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventSeekApi, FindEventByIdQuery } from '~/apis';
import { QueryResponse, EventRdo } from '~/models';

export const useEvent = (eventId: number) => {
  //
    const query: FindEventByIdQuery = { eventId };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventRdo>> = useQuery({
    queryKey: ['event', 'detail', eventId],
    queryFn: () => EventSeekApi.findEventById(query),
    enabled: !!eventId,
  });

  return {
    eventInfo: data?.result,
    isLoading,
    error,
    refetchEvent: refetch,
  };
};
