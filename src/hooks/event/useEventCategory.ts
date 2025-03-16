import { FindEventCategoryByIdQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { EventCategory, QueryResponse } from '~/models';
import eventCategorySeekApi from '~/apis/feature/event/rest/EventCategorySeekApi';

export const useEventCategory = (categoryId: number) => {
  const query: FindEventCategoryByIdQuery = { categoryId };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventCategory>> = useQuery(
    ['eventCategories', 'detail', categoryId],
    () => eventCategorySeekApi.findEventCategoryById(query),
    {
      enabled: !!categoryId,
    },
  );
  
  return {
    category: data?.result,
    isLoading,
    error,
    refetchCategory: refetch,
  };
};
