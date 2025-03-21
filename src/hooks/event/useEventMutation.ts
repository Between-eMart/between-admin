import { CommandResponse, EventCdo } from '~/models';
import { useMutation } from '@tanstack/react-query';
import { EventFlowApi } from '~/apis';
import { AxiosResponse } from 'axios';

export type FirstParameter<F extends Function> = F extends (firstArgs: infer U, ...restArgs: any[]) => any ? U : any;

export const useEventMutation = () => {
  //
  return {
    mutation: {
      registerEvent: useMutation<
        AxiosResponse<CommandResponse<any>>,
        unknown,
        FirstParameter<typeof EventFlowApi.registerEvent>
      >(EventFlowApi.registerEvent as any, {}),

      modifyEvent: useMutation<
        AxiosResponse<CommandResponse<any>>,
        unknown,
        FirstParameter<typeof EventFlowApi.modifyEvent>
      >(EventFlowApi.modifyEvent as any, {}),

      removeEvent: useMutation<
        AxiosResponse<CommandResponse<any>>,
        unknown,
        FirstParameter<typeof EventFlowApi.removeEvent>
      >(EventFlowApi.removeEvent as any, {}),
    },
  };
};
