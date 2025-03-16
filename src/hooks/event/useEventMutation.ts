import { CommandResponse, EventCdo } from '~/models';
import { useMutation } from '@tanstack/react-query';
import { EventFlowApi } from '~/apis';
import { AxiosResponse } from 'axios';

export type FirstParameter<F extends Function> = F extends (firstArgs: infer U, ...restArgs: any[]) => any ? U : any;

export const useEventMutation = () => {
  // Default values for creating a new event
  const defaultEvent: EventCdo = {
    name: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    location: '',
    dressCode: '',
    adviceForAttenders: '',
    rules: '',
    ageRestriction: '',
    isRepeatable: false,
    establishmentId: 0,
  };

  return {
    defaultEvent,

    mutation: {
      registerEvent: useMutation<
        AxiosResponse<CommandResponse>,
        unknown,
        FirstParameter<typeof EventFlowApi.registerEvent>
      >(EventFlowApi.registerEvent as any, {}),

      modifyEvent: useMutation<
        AxiosResponse<CommandResponse>,
        unknown,
        FirstParameter<typeof EventFlowApi.modifyEvent>
      >(EventFlowApi.modifyEvent as any, {}),

      removeEvent: useMutation<
        AxiosResponse<CommandResponse>,
        unknown,
        FirstParameter<typeof EventFlowApi.removeEvent>
      >(EventFlowApi.removeEvent as any, {}),
    },
  };
};
