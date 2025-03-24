import { CommandResponse, EventBanner, EventTask } from '~/models';
import {
  AddTasksToEventCommand,
  ModifyEventBannersCommand,
  ModifyEventCommand,
  RegisterEventCommand,
  RemoveEventCommand, RemoveEventTaskCommand,
} from '~/apis';
import axios from 'axios';

const url = (path: string) => `/api/feature/event/${path}`;

const registerEvent = async (command: RegisterEventCommand): Promise<CommandResponse<Event>> => {
  //
  const formData = new FormData();
  const commandBlob = new Blob([JSON.stringify(command)], { type: 'application/json' });
  formData.append('command', commandBlob);
  
  if (command.eventCdo.banners && command.eventCdo.banners.length > 0) {
    command.eventCdo.banners.forEach((banner) => formData.append('banners', banner));
  }
  else {
    alert('Empty file list');
  }
  
  
  const response = await axios.post<CommandResponse<Event>>(url('register-event/command'), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const modifyEvent = async (command: ModifyEventCommand): Promise<CommandResponse<Event>> => {
  //
  const response = await axios.post<CommandResponse<Event>>(url('modify-event/command'), command);
  return response.data;
};

const removeEvent = async (command: RemoveEventCommand): Promise<CommandResponse<number>> => {
  const response = await axios.post<CommandResponse<number>>(url('remove-event/command'), command);
  return response.data;
};

const removeEventTask = async (command: RemoveEventTaskCommand): Promise<CommandResponse<number>> => {
  const response = await axios.post<CommandResponse<number>>(url('remove-event-task/command'), command);
  return response.data;
};

const addTasksToEvent = async (command: AddTasksToEventCommand): Promise<CommandResponse<EventTask[]>> => {
  const response = await axios.post<CommandResponse<EventTask[]>>(url('add-tasks-to-event/command'), command);
  return response.data;
};

const modifyEventBanners = async (command: ModifyEventBannersCommand): Promise<CommandResponse<EventBanner[]>> => {
  const formData = new FormData();
  const commandBlob = new Blob([JSON.stringify(command)], { type: 'application/json' });
  formData.append('command', commandBlob);
  
  if (command.banners && command.banners.length > 0) {
    command.banners.forEach((banner) => formData.append('banners', banner));
  }
  else {
    alert('Empty file list');
  }
  
  const response = await axios.post<CommandResponse<EventBanner[]>>(url('modify-event-banners/command'), formData);
  return response.data;
};

export default {
  registerEvent,
  modifyEvent,
  removeEvent,
  addTasksToEvent,
  modifyEventBanners,
  removeEventTask,
};
