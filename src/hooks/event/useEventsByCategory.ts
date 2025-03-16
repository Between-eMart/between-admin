import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FindEventsByCategoryQuery } from '~/apis';
import { QueryResponse } from '~/models';
import { Offset } from '~/models/aggregate/shared/Offset';
import eventSeekApi from '~/apis/feature/event/rest/EventSeekApi';
import { defaultOffset } from '~/hooks/event/useEvents';

export const useEventsByCategory = (categoryCodes: string[], offset: Offset = defaultOffset) => {
  //
  const query: FindEventsByCategoryQuery = { categoryCodes, offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event[]>> = useQuery(
    ['events', 'byCategory', categoryCodes, offset],
    () => eventSeekApi.findEventsByCategory(query),
    {
      enabled: categoryCodes.length > 0,
    },
  );
  
  return {
    events: data?.result || [],
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
