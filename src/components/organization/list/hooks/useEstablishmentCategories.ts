import { defaultOffset } from '~/hooks';
import { EstablishmentCategory, QueryResponse } from '~/models';
import { BusinessSeekApi, FindEstablishmentCategoriesQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

export const useEstablishmentCategories = () => {
  //
  const initialQuery: FindEstablishmentCategoriesQuery = {
    offset: {
      offset: 0,
      limit: 100,
    },
  };

  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<EstablishmentCategory[]>> = useQuery({
    queryKey: ['BusinessSeekApi', 'findEstablishmentCategories', query],
    queryFn: () => BusinessSeekApi.findEstablishmentCategories(query),
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
    key: keyof FindEstablishmentCategoriesQuery,
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
    key?: keyof FindEstablishmentCategoriesQuery,
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
    establishmentCategories: data?.result || [],
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
