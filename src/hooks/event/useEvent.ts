import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventSeekApi, FindEventDetailQuery } from '~/apis';
import { QueryResponse, EventRdo } from '~/models';

export const useEvent = (eventId: number) => {
  //
  const query: FindEventDetailQuery = { eventId };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventRdo>> = useQuery({
    queryKey: ['event', 'detail', eventId],
    queryFn: () => EventSeekApi.findEventDetail(query),
    enabled: !!eventId,
  });

  return {
    eventInfo: data?.result,
    isLoading,
    error,
    refetchEvent: refetch,
  };
};
