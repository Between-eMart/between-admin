import { BrandNestedRdo, Organization } from '~/models';

export interface OrganizationNestedRdo {
  organization: Organization;
  brandRdos: BrandNestedRdo[];
}
