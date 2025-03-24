import axios from 'axios';
import {
  AttendToEventCommand,
  InviteToEventCommand,
  JoinEventCommand,
  RespondToInviteCommand,
  RespondToJoinCommand,
} from '~/apis/feature/involvement';
import { CommandResponse, EventAttendance, EventAttendRequest, EventInviteRequest } from '~/models';

const url = (path: string) => `/api/feature/involvement/${path}`;

const attendToEvent = async (command: AttendToEventCommand): Promise<CommandResponse<EventAttendance>> => {
  const response = await axios.post<CommandResponse<EventAttendance>>(url('attend-to-event/command'), command);
  return response.data;
};

const inviteToEvent = async (command: InviteToEventCommand): Promise<CommandResponse<EventInviteRequest>> => {
  const response = await axios.post<CommandResponse<EventInviteRequest>>(url('invite-event/command'), command);
  return response.data;
};

const joinEvent = async (command: JoinEventCommand): Promise<CommandResponse<EventAttendRequest>> => {
  const response = await axios.post<CommandResponse<EventAttendRequest>>(url('join-event/command'), command);
  return response.data;
};

const respondToInvite = async (command: RespondToInviteCommand): Promise<CommandResponse<EventInviteRequest>> => {
  const response = await axios.post<CommandResponse<EventInviteRequest>>(url('respond-to-invite/command'), command);
  return response.data;
};

const respondToJoin = async (command: RespondToJoinCommand): Promise<CommandResponse<EventInviteRequest>> => {
  const response = await axios.post<CommandResponse<EventInviteRequest>>(url('respond-to-join/command'), command);
  return response.data;
};

export default {
  attendToEvent,
  inviteToEvent,
  joinEvent,
  respondToInvite,
  respondToJoin,
};
