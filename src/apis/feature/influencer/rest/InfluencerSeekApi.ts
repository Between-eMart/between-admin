import { Influencer, InfluencerCategory, InfluencerInfoRdo, QueryResponse } from '~/models';
import axios from 'axios';
import {
  FindInfluencerByIdQuery,
  FindInfluencerByUsernameQuery,
  FindActiveInfluencersQuery,
  FindPreActiveInfluencersQuery,
  FindInfluencerCategoriesQuery,
} from '~/apis/feature/influencer';

const url = (path: string) => `/api/feature/influencer/${path}`;

const findInfluencerById = async (query: FindInfluencerByIdQuery): Promise<QueryResponse<InfluencerInfoRdo>> => {
  //
  const response = await axios.post<QueryResponse<InfluencerInfoRdo>>(url('find-influencer-by-id/query'), query);
  return response.data;
};

const findInfluencerByUsername = async (query: FindInfluencerByUsernameQuery): Promise<QueryResponse<InfluencerInfoRdo>> => {
  //
  const response = await axios.post<QueryResponse<InfluencerInfoRdo>>(url('find-influencer-by-username/query'), query);
  return response.data;
};

const findActiveInfluencers = async (query: FindActiveInfluencersQuery): Promise<QueryResponse<Influencer[]>> => {
  //
  const response = await axios.post<QueryResponse<Influencer[]>>(url('find-active-influencers/query'), query);
  return response.data;
};

const findPreActiveInfluencers = async (query: FindPreActiveInfluencersQuery): Promise<QueryResponse<Influencer[]>> => {
  //
  const response = await axios.post<QueryResponse<Influencer[]>>(url('find-pre-active-influencers/query'), query);
  return response.data;
};

const findInfluencerCategories = async (query: FindInfluencerCategoriesQuery): Promise<QueryResponse<InfluencerCategory[]>> => {
  //
  const response = await axios.post<QueryResponse<InfluencerCategory[]>>(url('find-influencer-categories/query'), query);
  return response.data;
};

export default {
  findInfluencerById,
  findInfluencerByUsername,
  findActiveInfluencers,
  findPreActiveInfluencers,
  findInfluencerCategories,
};
