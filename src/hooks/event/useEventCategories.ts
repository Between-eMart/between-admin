import { Offset } from '~/models/aggregate/shared/Offset';
import { defaultOffset } from '~/hooks/event/useEvents';
import { EventCategory, QueryResponse } from '~/models';
import { FindAllEventCategoriesQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import eventCategorySeekApi from '~/apis/feature/event/rest/EventCategorySeekApi';
import { useState } from 'react';

export const useEventCategories = (offset: Offset = defaultOffset) => {
  const [page, setPage] = useState(1);
  
  const query: FindAllEventCategoriesQuery = { offset };
  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EventCategory[]>> = useQuery(
    ['eventCategories', 'list', offset],
    () => eventCategorySeekApi.findAllEventCategories(query),
  );
  
  return {
    categories: data?.result || [],
    pagination: data?.offset,
    isLoading,
    error,
    setPage,
    page,
    refetchCategories: refetch,
  };
};
