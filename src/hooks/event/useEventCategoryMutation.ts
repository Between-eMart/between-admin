import { useMutation } from '@tanstack/react-query';
import { CommandResponse, EventCategoryCdo } from '~/models';
import { EventCategoryFlowApi } from '~/apis';
import { AxiosResponse } from 'axios';
import { FirstParameter } from '~/hooks';

export const useEventCategoryMutation = () => {
  //
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
