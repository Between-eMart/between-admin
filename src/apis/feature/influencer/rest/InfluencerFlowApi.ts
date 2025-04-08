import {
  ModifyInfluencerCommand,
  ModifyInfluencerStatusCommand,
  RegisterInfluencerCategoryCommand,
  RemoveInfluencerCategoryCommand,
  RemoveInfluencerCommand,
} from '~/apis';
import { CommandResponse, Influencer, InfluencerCategory } from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/influencer/${path}`;

const registerInfluencerCategory = async (
  command: RegisterInfluencerCategoryCommand,
): Promise<CommandResponse<InfluencerCategory>> => {
  //
  const response = await axios.post<CommandResponse<InfluencerCategory>>(
    url('register-influencer-category/command'),
    command,
  );
  return response.data;
};

const removeInfluencerCategory = async (command: RemoveInfluencerCategoryCommand): Promise<CommandResponse<number>> => {
  //
  const response = await axios.post<CommandResponse<number>>(url('remove-influencer-category/command'), command);
  return response.data;
};

const modifyInfluencer = async (command: ModifyInfluencerCommand): Promise<CommandResponse<Influencer>> => {
  //
  const response = await axios.post<CommandResponse<Influencer>>(url('modify-influencer/command'), command);
  return response.data;
};

const modifyInfluencerStatus = async (command: ModifyInfluencerStatusCommand): Promise<CommandResponse<Influencer>> => {
  //
  const response = await axios.post<CommandResponse<Influencer>>(url('modify-influencer-status/command'), command);
  return response.data;
};

const removeInfluencer = async (command: RemoveInfluencerCommand): Promise<CommandResponse<number>> => {
  //
  const response = await axios.post<CommandResponse<number>>(url('remove-influencer/command'), command);
  return response.data;
};

export default {
  modifyInfluencer,
  registerInfluencerCategory,
  modifyInfluencerStatus,
  removeInfluencer,
  removeInfluencerCategory,
};
