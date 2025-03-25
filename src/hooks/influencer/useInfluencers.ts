import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { QueryResponse, Offset, Influencer } from '~/models';
import { FindInfluencersQuery, InfluencerSeekApi } from '~/apis/feature/influencer';
import { defaultOffset } from '~/hooks';

export const useInfluencers = (offset: Offset = defaultOffset) => {
  //
  const query: FindInfluencersQuery = { offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<Influencer[]>> = useQuery({
    queryKey: ['influencers', 'list', offset],
    queryFn: () => InfluencerSeekApi.findInfluencers(query),
  });
  
  return {
    influencers: data?.result || [],
    pagination: data?.offset,
    isLoading,
    error,
    refetchEvents: refetch,
  };
};
