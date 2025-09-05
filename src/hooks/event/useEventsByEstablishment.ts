import { defaultOffset } from '~/hooks';
import { EventSeekApi, FindEventsByEstablishmentQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QueryResponse, Offset, EventRdo } from '~/models';

export const useEventsByEstablishment = (establishmentId: number, offset: Offset = defaultOffset) => {
  //
  const query: FindEventsByEstablishmentQuery = { establishmentId, offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventRdo[]>> = useQuery({
    queryKey: ['events', 'byEstablishment', establishmentId, offset],
    queryFn: () => EventSeekApi.findEventsByEstablishment(query),
    enabled: !!establishmentId,
  });

  return {
    events: (data?.result || []).map(rdo => rdo.event),
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
