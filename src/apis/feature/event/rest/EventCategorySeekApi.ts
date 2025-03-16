import axios from 'axios';
import { EventCategory, QueryResponse } from '~/models';
import { FindAllEventCategoriesQuery, FindEventCategoryByIdQuery } from '../query';

const url = (path: string) => `/api/feature/event-category/${path}`;

const findEventCategoryById = async (query: FindEventCategoryByIdQuery): Promise<QueryResponse<EventCategory>> => {
  const response = await axios.post<QueryResponse<EventCategory>>(url('find-event-category-by-id/query'), query);
  return response.data;
};

const findAllEventCategories = async (query: FindAllEventCategoriesQuery): Promise<QueryResponse<EventCategory[]>> => {
  const response = await axios.post<QueryResponse<EventCategory[]>>(
    url('find-all-event-categories/query'),
    query,
  );
  return response.data;
};

export default {
  findAllEventCategories,
  findEventCategoryById,
};
