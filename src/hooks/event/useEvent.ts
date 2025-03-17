import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindEventByIdQuery } from '~/apis';
import { QueryResponse } from '~/models';
import eventSeekApi from '~/apis/feature/event/rest/EventSeekApi';

export const useEvent = (id: string) => {
  const eventId = parseInt(id);
  const query: FindEventByIdQuery = { eventId };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event>> = useQuery(
    ['events', 'detail', id],
    () => eventSeekApi.findEventById(query),
    {
      enabled: !!id,
    },
  );

  return {
    event: data?.result,
    isLoading,
    error,
    refetchEvent: refetch,
  };
};
