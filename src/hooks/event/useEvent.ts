import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventSeekApi, FindEventByIdQuery } from '~/apis';
import { QueryResponse, EventRdo } from '~/models';

export const useEvent = (id: string) => {
  //
  const eventId = parseInt(id);
  const query: FindEventByIdQuery = { eventId };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventRdo>> = useQuery({
    queryKey: ['event', 'detail', id],
    queryFn: () => EventSeekApi.findEventById(query),
    enabled: !!id,
  });

  return {
    eventInfo: data?.result,
    isLoading,
    error,
    refetchEvent: refetch,
  };
};
