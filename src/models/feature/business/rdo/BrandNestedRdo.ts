import { Brand, EstablishmentDetailRdo } from '~/models';

export interface BrandNestedRdo {
  brand: Brand;
  establishmentRdos: EstablishmentDetailRdo[];
}
