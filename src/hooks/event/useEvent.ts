import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindEventByIdQuery } from '~/apis';
import { QueryResponse } from '~/models';
import eventSeekApi from '~/apis/feature/event/rest/EventSeekApi';

export const useEvent = (eventId: number) => {
  const query: FindEventByIdQuery = { eventId };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event>> = useQuery(
    ['events', 'detail', eventId],
    () => eventSeekApi.findEventById(query),
    {
      enabled: !!eventId,
    },
  );
  
  return {
    event: data?.result,
    isLoading,
    error,
    refetchEvent: refetch,
  };
};
