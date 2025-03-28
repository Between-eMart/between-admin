import { OrganizationNestedRdo, QueryResponse } from '~/models';
import { BusinessSeekApi, FindOrganizationNestedRdosQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

export const useOrganizationRdos = () => {
  //
  const initialQuery: FindOrganizationNestedRdosQuery = {
    offset: {
      offset: 0,
      limit: 10,
    },
  };

  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data, isLoading, error, refetch }: UseQueryResult<QueryResponse<OrganizationNestedRdo[]>> = useQuery({
    queryKey: ['BusinessSeekApi', 'findOrganizationNestedRdos', query],
    queryFn: () => BusinessSeekApi.findOrganizationNestedRdos(query),
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
    key: keyof FindOrganizationNestedRdosQuery,
    value: string | number | number[] | boolean | undefined,
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
    key?: keyof FindOrganizationNestedRdosQuery,
    value?: string | number | number[] | boolean | undefined,
  ) => {
    //
    setSearchQuery(prev => {
      let newSearchQuery = {
        ...searchQuery,
        offset: { limit: prev.offset?.limit || 10, offset: 0 },
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
        offset: { limit: prev.offset?.limit || 10, offset: 0 },
      };
      setQuery(newQuery);
      return newQuery;
    });
  };

  return {
    query: searchQuery,
    organizationRdos: data?.result || [],
    total: data?.offset?.totalCount || 0,
    offset: data?.offset?.offset || 0,
    limit: data?.offset?.limit || 10,
    changeCurrentPage,
    changePageLimit,
    changeSearchProperties,
    fetchByNewQuery,
    resetQuery,
    refetchOrganizationRdos: refetch,
  };
};
