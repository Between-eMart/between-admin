import axios from 'axios';
import { FindOverallStatisticsRdoQuery } from '~/apis/feature/statistics';
import { OverallStatisticsRdo, QueryResponse } from '~/models';


const url = (path: string) => `/api/feature/statistics/${path}`;

const findOverallStatisticsRdo = async (query: FindOverallStatisticsRdoQuery): Promise<QueryResponse<OverallStatisticsRdo>> => {
  //
  const response = await axios.post<QueryResponse<OverallStatisticsRdo>>(url('find-overall-statistics/query'), query);
  return response.data;
};

export default {
  findOverallStatisticsRdo,
};
