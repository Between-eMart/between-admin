import axios from 'axios';
import { QueryResponse } from '~/models';
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
import { EventRdo } from '~/models/feature/event/rdo/EventRdo';

const url = (path: string) => `/api/feature/event/${path}`;

const findAllEvents = async (query: FindAllEventsQuery): Promise<QueryResponse<Event[]>> => {
  const response = await axios.post<QueryResponse<Event[]>>(url('find-all-events/query'), query);
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

const findEventsByCategory = async (query: FindEventsByCategoryQuery): Promise<QueryResponse<Event[]>> => {
  const response = await axios.post<QueryResponse<Event[]>>(url('find-event-by-category/query'), query);
  return response.data;
};

const findEventsByLocation = async (query: FindEventsByLocationQuery): Promise<QueryResponse<Event[]>> => {
  const response = await axios.post<QueryResponse<Event[]>>(url('find-event-by-location/query'), query);
  return response.data;
};

const findEventsByName = async (query: FindEventsByNameQuery): Promise<QueryResponse<Event[]>> => {
  const response = await axios.post<QueryResponse<Event[]>>(url('find-event-by-name/query'), query);
  return response.data;
};

const findIncomingEvents = async (query: FindIncomingEventsQuery): Promise<QueryResponse<Event[]>> => {
  const response = await axios.post<QueryResponse<Event[]>>(url('find-incoming-events/query'), query);
  return response.data;
};

const findEventsByEstablishment = async (query: FindEventsByEstablishmentQuery): Promise<QueryResponse<Event[]>> => {
  const response = await axios.post<QueryResponse<Event[]>>(url('find-events-by-establishment/query'), query);
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
