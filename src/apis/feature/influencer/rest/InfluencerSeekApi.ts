import { Influencer, InfluencerInfoRdo, QueryResponse } from '~/models';
import axios from 'axios';
import {
  FindInfluencerByIdQuery,
  FindInfluencerByUsernameQuery,
  FindInfluencersQuery, FindPreActiveInfluencersQuery,
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

const findInfluencers = async (query: FindInfluencersQuery): Promise<QueryResponse<Influencer[]>> => {
  //
  const response = await axios.post<QueryResponse<Influencer[]>>(url('find-influencers/query'), query);
  return response.data;
};

const findPreActiveInfluencersUsername = async (query: FindPreActiveInfluencersQuery): Promise<QueryResponse<Influencer[]>> => {
  //
  const response = await axios.post<QueryResponse<Influencer[]>>(url('find-pre-active-influencers/query'), query);
  return response.data;
};

export default {
  findInfluencerById,
  findInfluencerByUsername,
  findInfluencers,
  findPreActiveInfluencersUsername,
};
