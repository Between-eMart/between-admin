import { EstablishmentDetailRdo, QueryResponse } from '~/models';
import { BusinessSeekApi, FindEstablishmentDetailRdoQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useEstablishmentRdo = (establishmentId: number) => {
  //
  const query: FindEstablishmentDetailRdoQuery = {
    establishmentId,
  };

  const { data, refetch }: UseQueryResult<QueryResponse<EstablishmentDetailRdo>> = useQuery({
    queryKey: ['BusinessSeekApi', 'findEstablishmentDetailRdo', query],
    queryFn: () => BusinessSeekApi.findEstablishmentDetailRdo(query),
  });

  return {
    establishmentRdo: data?.result,
    refetchEstablishmentRdo: refetch,
  };
};
