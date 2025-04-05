import { RegisterInfluencerCategoryCommand, RemoveInfluencerCategoryCommand } from '~/apis';
import { CommandResponse,  InfluencerCategory } from '~/models';
import axios from 'axios';

const url = (path: string) => `/api/feature/influencer/${path}`;

const registerInfluencerCategory = async (command: RegisterInfluencerCategoryCommand): Promise<CommandResponse<InfluencerCategory>> => {
  //
  const response = await axios.post<CommandResponse<InfluencerCategory>>(url('register-influencer-category/command'), command);
  return response.data;
};

const removeInfluencerCategory = async (command: RemoveInfluencerCategoryCommand): Promise<CommandResponse<number>> => {
  //
  const response = await axios.post<CommandResponse<number>>(url('remove-influencer-category/command'), command);
  return response.data;
};

export default {
  registerInfluencerCategory,
  removeInfluencerCategory,
};
