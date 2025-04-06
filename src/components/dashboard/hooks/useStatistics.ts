import { OverallStatisticsRdo, QueryResponse } from '~/models';
import { FindOverallStatisticsRdoQuery, StatisticsSeekApi } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';


export const useStatistics = () => {
  //
  const query: FindOverallStatisticsRdoQuery = {  };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<OverallStatisticsRdo>> = useQuery({
    queryKey: ['statistics'],
    queryFn: () => StatisticsSeekApi.findOverallStatisticsRdo(query),
  });
  
  return {
    overallStatData: data?.result,
    isLoading,
    error,
    refetchData: refetch,
  };
};
