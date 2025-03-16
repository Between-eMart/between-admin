import { CommandResponse, EventCategory } from '~/models';
import { ModifyEventCategoryCommand, RegisterEventCategoryCommand, RemoveEventCategoryCommand } from '../command';
import axios from 'axios';

const url = (path: string) => `/api/feature/event-category/${path}`;

const registerEventCategory = async (
  command: RegisterEventCategoryCommand,
): Promise<CommandResponse<EventCategory>> => {
  const response = await axios.post<CommandResponse<EventCategory>>(url('register-event-category/command'), command);
  return response.data;
};

const modifyEventCategory = async (command: ModifyEventCategoryCommand): Promise<CommandResponse<EventCategory>> => {
  const response = await axios.post<CommandResponse<EventCategory>>(url('modify-event-category/command'), command);
  return response.data;
};

const removeEventCategory = async (command: RemoveEventCategoryCommand): Promise<CommandResponse<number>> => {
  const response = await axios.post<CommandResponse<number>>(url('remove-event-category/command'), command);
  return response.data;
};

export default {
  removeEventCategory,
  registerEventCategory,
  modifyEventCategory,
};
