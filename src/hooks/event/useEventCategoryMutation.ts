import { useMutation } from '@tanstack/react-query';
import { CommandResponse } from '~/models';
import { EventCategoryCdo } from '~/models/aggregate/event/sdo/EventCategoryCdo';
import { EventCategoryFlowApi } from '~/apis';
import { AxiosResponse } from 'axios';
import { FirstParameter } from '~/hooks/event/useEventMutation';

export const useEventCategoryMutation = () => {
  // Default values for creating a new event category
  const defaultEventCategory: EventCategoryCdo = {
    name: '',
    description: '',
    code: '',
  };

  return {
    defaultEventCategory,
    mutation: {
      registerEventCategory: useMutation<
        AxiosResponse<CommandResponse<any>>,
        unknown,
        FirstParameter<typeof EventCategoryFlowApi.registerEventCategory>
      >(EventCategoryFlowApi.registerEventCategory as any, {}),

      modifyEventCategory: useMutation<
        AxiosResponse<CommandResponse<any>>,
        unknown,
        FirstParameter<typeof EventCategoryFlowApi.modifyEventCategory>
      >(EventCategoryFlowApi.modifyEventCategory as any, {}),

      removeEventCategory: useMutation<
        AxiosResponse<CommandResponse<any>>,
        unknown,
        FirstParameter<typeof EventCategoryFlowApi.removeEventCategory>
      >(EventCategoryFlowApi.removeEventCategory as any, {}),
    },
  };
};
