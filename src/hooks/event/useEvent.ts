import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindEventByIdQuery } from '~/apis';
import { QueryResponse } from '~/models';
import eventSeekApi from '~/apis/feature/event/rest/EventSeekApi';
import { EventRdo } from '~/hooks/rdo/EventRdo';

export const useEvent = (id: string) => {
  const eventId = parseInt(id);
  const query: FindEventByIdQuery = { eventId };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventRdo>> = useQuery(
    ['event', 'detail', id],
    () => eventSeekApi.findEventById(query),
    {
      enabled: !!id,
    },
  );

  return {
    eventInfo: data?.result,
    isLoading,
    error,
    refetchEvent: refetch,
  };
};
