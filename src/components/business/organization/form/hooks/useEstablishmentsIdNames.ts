import { IdNameValue, QueryResponse } from '~/models';
import { BusinessSeekApi, FindAllEstablishmentIdNamesQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useEstablishmentsIdNames = () => {
  //
  const query: FindAllEstablishmentIdNamesQuery = {
    //
  };
  
  const { data, refetch }: UseQueryResult<QueryResponse<IdNameValue[]>> = useQuery({
    queryKey: ['BusinessSeekApi', 'findAllEstablishmentIdNames', query],
    queryFn: () => BusinessSeekApi.findAllEstablishmentIdNames(query),
  });
  
  return {
    establishmentIdNames: data?.result,
    refetchEstablishmentsIdName: refetch,
  };
};
