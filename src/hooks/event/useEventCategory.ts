import { EventCategorySeekApi, FindEventCategoryByIdQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventCategory, QueryResponse } from '~/models';

export const useEventCategory = (categoryId: number) => {
  //
  const query: FindEventCategoryByIdQuery = { categoryId };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventCategory>> = useQuery({
    queryKey: ['eventCategories', 'detail', categoryId],
    queryFn: () => EventCategorySeekApi.findEventCategoryById(query),
    enabled: !!categoryId,
  });

  return {
    category: data?.result,
    isLoading,
    error,
    refetchCategory: refetch,
  };
};
