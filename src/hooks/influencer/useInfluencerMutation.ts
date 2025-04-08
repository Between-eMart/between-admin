import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CommandResponse } from '~/models';
import { FirstParameter } from '~/hooks';
import { InfluencerFlowApi } from '~/apis';

export const useInfluencerMutation = () => {
  //
  return {
    mutation: {
      modifyInfluencer: useMutation<
        AxiosResponse<CommandResponse<any>>,
        unknown,
        FirstParameter<typeof InfluencerFlowApi.modifyInfluencer>
      >(InfluencerFlowApi.modifyInfluencer as any, {}),

      modifyInfluencerStatus: useMutation<
        AxiosResponse<CommandResponse<any>>,
        unknown,
        FirstParameter<typeof InfluencerFlowApi.modifyInfluencerStatus>
      >(InfluencerFlowApi.modifyInfluencerStatus as any, {}),

      removeInfluencer: useMutation<
        AxiosResponse<CommandResponse<any>>,
        unknown,
        FirstParameter<typeof InfluencerFlowApi.removeInfluencer>
      >(InfluencerFlowApi.removeInfluencer as any, {}),
    },
  };
};
