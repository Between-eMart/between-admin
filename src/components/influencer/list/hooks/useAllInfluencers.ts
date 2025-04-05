import { IdNameValue, QueryResponse } from '~/models';
import { FindAllInfluencersQuery, InfluencerSeekApi } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useAllInfluencers = () => {
  //
  const query: FindAllInfluencersQuery = {};
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<IdNameValue[]>> = useQuery({
    queryKey: ['allInfluencers', 'influencerList'],
    queryFn: () => InfluencerSeekApi.findAllInfluencers(query),
  });

  return {
    influencers: data?.result || [],
    isLoading,
    error,
    refetchInfluencers: refetch,
  };
};
