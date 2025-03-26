import { BrandDetailRdo, QueryResponse } from '~/models';
import { BusinessSeekApi, FindBrandDetailRdoQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useBrandRdo = (brandId: number) => {
  //
  const query: FindBrandDetailRdoQuery = {
    brandId,
  };

  const { data, refetch }: UseQueryResult<QueryResponse<BrandDetailRdo>> = useQuery({
    queryKey: ['BusinessSeekApi', 'findBrandDetailRdo', query],
    queryFn: () => BusinessSeekApi.findBrandDetailRdo(query),
  });

  return {
    brandRdo: data?.result,
    refetchBrandRdo: refetch,
  };
};
