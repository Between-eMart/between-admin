import { Offset } from '~/models';

export interface FindOrganizationNestedRdosQuery {
  searchKey?: string;
  categoryIds?: string[];
  offset?: Offset;
}
