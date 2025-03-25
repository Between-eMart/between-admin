import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CommandResponse } from '~/models';
import { FirstParameter } from '~/hooks';
import { InvolvementFlowApi } from '~/apis';

export const useInvolvementMutation = () => {
  //
  return {
    mutation: {
      inviteToEvent: useMutation<
      AxiosResponse<CommandResponse<any>>,
      unknown,
      FirstParameter<typeof InvolvementFlowApi.inviteToEvent>
      >(InvolvementFlowApi.inviteToEvent as any),

      respondToJoin: useMutation<
      AxiosResponse<CommandResponse<any>>,
      unknown,
      FirstParameter<typeof InvolvementFlowApi.respondToJoin>
      >(InvolvementFlowApi.respondToJoin as any),
    },
  };
};
