import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindEventsByLocationQuery } from '~/apis';
import { QueryResponse } from '~/models';
import eventSeekApi from '~/apis/feature/event/rest/EventSeekApi';

export const useEventsByLocation = (location: string) => {
  const query: FindEventsByLocationQuery = { location };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event[]>> = useQuery(
    ['events', 'byLocation', location],
    () => eventSeekApi.findEventsByLocation(query),
    {
      enabled: !!location,
    },
  );
  
  return {
    events: data?.result || [],
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
