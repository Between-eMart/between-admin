import { Influencer, QueryResponse } from '~/models';
import { FindActiveInfluencersQuery, InfluencerSeekApi } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';
import { exportInfluencersToExcel } from '~/utils/excelExport';

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
    const updateFn = (prev: FindActiveInfluencersQuery) => {
      if (prev.offset) {
        return {
          ...prev,
          offset: { ...prev.offset, offset },
        };
      }
      return prev;
    };
    setQuery(updateFn);
    setSearchQuery(updateFn);
  };

  const changePageLimit = (limit: number) => {
    //
    const updateFn = (prev: FindActiveInfluencersQuery) => {
      if (prev.offset) {
        return {
          ...prev,
          offset: { offset: 0, limit },
        };
      }
      return prev;
    };
    setQuery(updateFn);
    setSearchQuery(updateFn);
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

  const downloadAllInfluencers = async () => {
    try {
      // Fetch all influencers with a high limit
      const allInfluencersQuery: FindActiveInfluencersQuery = {
        ...searchQuery,
        offset: {
          offset: 0,
          limit: 10000,
        },
      };

      const response = await InfluencerSeekApi.findActiveInfluencers(allInfluencersQuery);
      const allInfluencers = response.result || [];

      // Export to Excel
      const timestamp = new Date().toISOString().split('T')[0];
      exportInfluencersToExcel(allInfluencers, `influencers_${timestamp}.xlsx`);
    } catch (error) {
      console.error('Error downloading influencers:', error);
      throw error;
    }
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
    downloadAllInfluencers,
  };
};
