import { CommandResponse } from '~/models';
import { ModifyEventCommand, RegisterEventCommand, RemoveEventCommand } from '../command';
import axios from 'axios';

const url = (path: string) => `/api/feature/event/${path}`;

const registerEvent = async (command: RegisterEventCommand, banners?: File[]): Promise<CommandResponse<Event>> => {
  const formData = new FormData();
  const commandBlob = new Blob([JSON.stringify(command)], { type: 'application/json' });
  formData.append('command', commandBlob);
  
  if (banners && banners.length > 0) {
    banners.forEach((banner) => formData.append('banners', banner));
  }
  
  const response = await axios.post<CommandResponse<Event>>(url('/register-event/command'), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const modifyEvent = async (command: ModifyEventCommand): Promise<CommandResponse<Event>> => {
  const response = await axios.post<CommandResponse<Event>>(url('/modify-event/command'), command);
  return response.data;
};

const removeEvent = async (command: RemoveEventCommand): Promise<CommandResponse<number>> => {
  const response = await axios.post<CommandResponse<number>>(url('/event/remove-event/command'), command);
  return response.data;
};

export default {
  registerEvent,
  modifyEvent,
  removeEvent,
};
