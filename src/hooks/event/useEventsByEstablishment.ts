import { Offset } from '~/models/aggregate/shared/Offset';
import { defaultOffset } from '~/hooks';
import { FindEventsByEstablishmentQuery } from '~/apis';
import eventSeekApi from '~/apis/feature/event/rest/EventSeekApi';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QueryResponse } from '~/models';

export const useEventsByEstablishment = (establishmentId: number, offset: Offset = defaultOffset) => {
  const query: FindEventsByEstablishmentQuery = { establishmentId, offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Event[]>> = useQuery(
    ['events', 'byEstablishment', establishmentId, offset],
    () => eventSeekApi.findEventsByEstablishment(query),
    {
      enabled: !!establishmentId,
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
