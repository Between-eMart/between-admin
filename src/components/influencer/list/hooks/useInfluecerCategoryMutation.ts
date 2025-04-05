import { useMutation } from '@tanstack/react-query';
import { CommandResponse, InfluencerCategoryCdo } from '~/models';
import { InfluencerFlowApi } from '~/apis';
import { AxiosResponse } from 'axios';
import { FirstParameter } from '~/hooks';

export const useInfluencerCategoryMutation = () => {
  //
  const defaultInfluencerCategory: InfluencerCategoryCdo = {
    name: '',
    description: '',
    code: '',
  };

  return {
    defaultInfluencerCategory,
    mutation: {
      registerInfluencerCategory: useMutation<
      AxiosResponse<CommandResponse<any>>,
      unknown,
      FirstParameter<typeof InfluencerFlowApi.registerInfluencerCategory>
      >(InfluencerFlowApi.registerInfluencerCategory as any, {}),
      
      removeInfluencerCategory: useMutation<
      AxiosResponse<CommandResponse<any>>,
      unknown,
      FirstParameter<typeof InfluencerFlowApi.removeInfluencerCategory>
      >(InfluencerFlowApi.removeInfluencerCategory as any, {}),
    },
  };
};
