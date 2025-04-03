import { InfluencerCategory, QueryResponse } from '~/models';
import { InfluencerSeekApi, FindInfluencerCategoriesQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

export const useInfluencerCategories = () => {
  //
  const initialQuery: FindInfluencerCategoriesQuery = {
    offset: {
      offset: 0,
      limit: 100,
    },
  };

  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data, refetch }: UseQueryResult<QueryResponse<InfluencerCategory[]>> = useQuery({
    queryKey: ['InfluencerSeekApi', 'findInfluencerCategories', query],
    queryFn: () => InfluencerSeekApi.findInfluencerCategories(query),
  });

  const changeCurrentPage = (offset: number) => {
    //
    setQuery((prev) => {
      if (prev.offset) {
        return {
          ...prev,
          offset: { ...prev.offset, offset },
        };
      }
      return prev;
    });
  };

  const changePageLimit = (limit: number) => {
    //
    setQuery((prev) => {
      if (prev.offset) {
        return {
          ...prev,
          offset: { offset: 0, limit },
        };
      }
      return prev;
    });
  };

  const changeSearchProperties = (
    key: keyof FindInfluencerCategoriesQuery,
    value: string | number | boolean | undefined,
  ) => {
    //
    setSearchQuery((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const fetchByNewQuery = (
    key?: keyof FindInfluencerCategoriesQuery,
    value?: string | number | boolean | undefined,
  ) => {
    //
    setSearchQuery(prev => {
      let newSearchQuery = {
        ...searchQuery,
        offset: { limit: prev.offset?.limit || 100, offset: 0 },
      };
      newSearchQuery = !!key ? { ...newSearchQuery, [key]: value } : newSearchQuery;
      setQuery(newSearchQuery);
      return newSearchQuery;
    });
  };

  const resetQuery = () => {
    //
    setSearchQuery(prev => {
      const newQuery = {
        offset: { limit: prev.offset?.limit || 100, offset: 0 },
      };
      setQuery(newQuery);
      return newQuery;
    });
  };

  return {
    query: searchQuery,
    influencerCategories: data?.result || [],
    total: data?.offset?.totalCount || 0,
    offset: data?.offset?.offset || 0,
    limit: data?.offset?.limit || 100,
    changeCurrentPage,
    changePageLimit,
    changeSearchProperties,
    fetchByNewQuery,
    resetQuery,
    refetch,
  };
};
