import { Organization, QueryResponse } from '~/models';
import { BusinessSeekApi, FindOrganizationQuery } from '~/apis';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useOrganization = (organizationId: number) => {
  //
  const query: FindOrganizationQuery = {
    organizationId,
  };

  const { data, refetch }: UseQueryResult<QueryResponse<Organization>> = useQuery({
    queryKey: ['BusinessSeekApi', 'findOrganization', query],
    queryFn: () => BusinessSeekApi.findOrganization(query),
  });

  return {
    organization: data?.result,
    refetchOrganization: refetch,
  };
};
