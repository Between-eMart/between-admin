import axios from 'axios';
import { EventRdo, QueryResponse } from '~/models';
import {
  FindAllEventsQuery,
  FindEventByIdQuery,
  FindEventDetailQuery,
  FindEventsByCategoryQuery,
  FindEventsByEstablishmentQuery,
  FindEventsByLocationQuery,
  FindEventsByNameQuery,
  FindIncomingEventsQuery,
} from '~/apis';

const url = (path: string) => `/api/feature/event/${path}`;

const findAllEvents = async (query: FindAllEventsQuery): Promise<QueryResponse<EventRdo[]>> => {
  const response = await axios.post<QueryResponse<EventRdo[]>>(url('find-all-events/query'), query);
  return response.data;
};

const findEventById = async (query: FindEventByIdQuery): Promise<QueryResponse<EventRdo>> => {
  //
  const response = await axios.post<QueryResponse<EventRdo>>(url('find-event-by-id/query'), query);
  return response.data;
};

const findEventDetail = async (query: FindEventDetailQuery): Promise<QueryResponse<EventRdo>> => {
  //
  const response = await axios.post<QueryResponse<EventRdo>>(url('find-event-detail/query'), query);
  return response.data;
};

const findEventsByCategory = async (query: FindEventsByCategoryQuery): Promise<QueryResponse<EventRdo[]>> => {
  const response = await axios.post<QueryResponse<EventRdo[]>>(url('find-event-by-category/query'), query);
  return response.data;
};

const findEventsByLocation = async (query: FindEventsByLocationQuery): Promise<QueryResponse<EventRdo[]>> => {
  const response = await axios.post<QueryResponse<EventRdo[]>>(url('find-event-by-location/query'), query);
  return response.data;
};

const findEventsByName = async (query: FindEventsByNameQuery): Promise<QueryResponse<EventRdo[]>> => {
  const response = await axios.post<QueryResponse<EventRdo[]>>(url('find-event-by-name/query'), query);
  return response.data;
};

const findIncomingEvents = async (query: FindIncomingEventsQuery): Promise<QueryResponse<EventRdo[]>> => {
  const response = await axios.post<QueryResponse<EventRdo[]>>(url('find-incoming-events/query'), query);
  return response.data;
};

const findEventsByEstablishment = async (query: FindEventsByEstablishmentQuery): Promise<QueryResponse<EventRdo[]>> => {
  const response = await axios.post<QueryResponse<EventRdo[]>>(url('find-events-by-establishment/query'), query);
  return response.data;
};

export default {
  findAllEvents,
  findEventById,
  findEventDetail,
  findEventsByCategory,
  findEventsByLocation,
  findEventsByName,
  findIncomingEvents,
  findEventsByEstablishment,
};
