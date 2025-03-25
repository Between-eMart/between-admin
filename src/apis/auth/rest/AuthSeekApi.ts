import axios from 'axios';
import { QueryResponse, SignInRdo } from '~/models';
import { SignInQuery } from '~/apis';

const url = (path: string) => `/api/auth/${path}`;

const signIn = async (query: SignInQuery): Promise<QueryResponse<SignInRdo>> => {
  //
  const response = await axios.post<QueryResponse<SignInRdo>>(url('sign-in/query'), query);
  return response.data;
};

export default {
  signIn,
};
