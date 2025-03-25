import { Offset } from '~/models';

export interface FindEstablishmentDetailRdosQuery {
  searchKey?: string;
  organizationId?: number;
  brandId?: number;
  offset?: Offset;
}
