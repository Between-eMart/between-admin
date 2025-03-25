import { Establishment, IdName, PhysicalAddress, VirtualAddress } from '~/models';

export interface EstablishmentDetailRdo {
  establishment: Establishment;
  brandIdName: IdName;
  organizationIdName: IdName;
  categories: IdName[];
  physicalAddress: PhysicalAddress;
  virtualAddress: VirtualAddress;
}
