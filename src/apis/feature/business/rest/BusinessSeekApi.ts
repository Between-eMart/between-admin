import axios from 'axios';
import {
  BrandDetailRdo,
  EstablishmentCategory,
  EstablishmentDetailRdo,
  Organization,
  OrganizationNestedRdo,
  QueryResponse,
} from '~/models';
import {
  FindBrandDetailRdoQuery,
  FindEstablishmentCategoriesQuery,
  FindEstablishmentDetailRdoQuery,
  FindEstablishmentDetailRdosQuery,
  FindOrganizationNestedRdosQuery,
  FindOrganizationQuery,
} from '../query';

const url = (path: string) => `/api/feature/business/${path}`;

const sendQuery = async <T, R>(path: string, query: T): Promise<QueryResponse<R>> => {
  const response = await axios.post<QueryResponse<R>>(url(path), query);
  return response.data;
};

const findOrganizationNestedRdos = (query: FindOrganizationNestedRdosQuery) =>
  sendQuery<FindOrganizationNestedRdosQuery, OrganizationNestedRdo[]>('find-organization-nested-rdos/query', query);

const findOrganization = (query: FindOrganizationQuery) =>
  sendQuery<FindOrganizationQuery, Organization>('find-organization/query', query);

const findBrandDetailRdo = (query: FindBrandDetailRdoQuery) =>
  sendQuery<FindBrandDetailRdoQuery, BrandDetailRdo>('find-brand-detail-rdo/query', query);

const findEstablishmentDetailRdos = (query: FindEstablishmentDetailRdosQuery) =>
  sendQuery<FindEstablishmentDetailRdosQuery, EstablishmentDetailRdo[]>('find-establishment-detail-rdos/query', query);

const findEstablishmentDetailRdo = (query: FindEstablishmentDetailRdoQuery) =>
  sendQuery<FindEstablishmentDetailRdoQuery, EstablishmentDetailRdo>('find-establishment-detail-rdo/query', query);

const findEstablishmentCategories = (query: FindEstablishmentCategoriesQuery) =>
  sendQuery<FindEstablishmentCategoriesQuery, EstablishmentCategory[]>('find-establishment-categories/query', query);

export default {
  findOrganizationNestedRdos,
  findOrganization,
  findBrandDetailRdo,
  findEstablishmentDetailRdos,
  findEstablishmentDetailRdo,
  findEstablishmentCategories,
};
