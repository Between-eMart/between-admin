import { Influencer, QueryResponse } from '~/models';
import { FindActiveInfluencersQuery, InfluencerSeekApi } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';

export const useActiveInfluencers = () => {
  //
  const initialQuery: FindActiveInfluencersQuery = {
    offset: {
      offset: 0,
      limit: 10,
    },
  };

  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const { data, refetch }: UseQueryResult<QueryResponse<Influencer[]>> = useQuery({
    queryKey: ['InfluencerSeekApi', 'findActiveInfluencers', query],
    queryFn: () => InfluencerSeekApi.findActiveInfluencers(query),
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
    key: keyof FindActiveInfluencersQuery,
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
    key?: keyof FindActiveInfluencersQuery,
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
    influencers: data?.result || [],
    total: data?.offset?.totalCount || 0,
    offset: data?.offset?.offset || 0,
    limit: data?.offset?.limit || 10,
    changeCurrentPage,
    changePageLimit,
    changeSearchProperties,
    fetchByNewQuery,
    resetQuery,
    refetchInfluencers: refetch,
  };
};
