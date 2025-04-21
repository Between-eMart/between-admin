import { useMutation } from '@tanstack/react-query';
import {
  BrandCdo,
  EstablishmentCategoryCdo,
  EstablishmentCdo,
  OrganizationCdo,
  PhysicalAddressCdo,
  VirtualAddressCdo,
} from '~/models';
import { BusinessFlowApi } from '~/apis';

export const useBusinessMutation = () => {
  //
  const defaultOrganizationCdo: OrganizationCdo = {
    name: '',
    password: '123456',
    phone: '',
    phoneVerified: true,
    email: '',
    emailVerified: true,
  };

  const defaultBrandCdo: BrandCdo = {
    name: '',
    organizationId: 0,
  };

  const defaultEstablishmentCdo: EstablishmentCdo = {
    brandId: 0,
    categoryIds: [],
    contactName: '',
    contactPhone: '',
    description: '',
    instagramUsername: '',
    photos: [],
  };

  const defaultEstablishmentCategoryCdo: EstablishmentCategoryCdo = {
    name: '',
    note: '',
  };

  const defaultPhysicalAddressCdo: PhysicalAddressCdo = {
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    establishmentId: 0,
    location: '',
    mapUrl: '',
    postIndex: '',
  };

  const defaultVirtualAddressCdo: VirtualAddressCdo = {
    establishmentId: 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    webUrl: '' };

  return {
    defaultOrganizationCdo,
    defaultBrandCdo,
    defaultEstablishmentCdo,
    defaultEstablishmentCategoryCdo,
    defaultPhysicalAddressCdo,
    defaultVirtualAddressCdo,

    mutation: {
      registerOrganization: useMutation({
        mutationFn: BusinessFlowApi.registerOrganization,
      }),
      modifyOrganization: useMutation({
        mutationFn: BusinessFlowApi.modifyOrganization,
      }),
      removeOrganization: useMutation({
        mutationFn: BusinessFlowApi.removeOrganization,
      }),
      registerBrand: useMutation({
        mutationFn: BusinessFlowApi.registerBrand,
      }),
      modifyBrand: useMutation({
        mutationFn: BusinessFlowApi.modifyBrand,
      }),
      removeBrand: useMutation({
        mutationFn: BusinessFlowApi.removeBrand,
      }),
      registerEstablishment: useMutation({
        mutationFn: BusinessFlowApi.registerEstablishment,
      }),
      modifyEstablishment: useMutation({
        mutationFn: BusinessFlowApi.modifyEstablishment,
      }),
      removeEstablishment: useMutation({
        mutationFn: BusinessFlowApi.removeEstablishment,
      }),
      registerEstablishmentCategory: useMutation({
        mutationFn: BusinessFlowApi.registerEstablishmentCategory,
      }),
      modifyEstablishmentCategory: useMutation({
        mutationFn: BusinessFlowApi.modifyEstablishmentCategory,
      }),
      removeEstablishmentCategory: useMutation({
        mutationFn: BusinessFlowApi.removeEstablishmentCategory,
      }),
      registerPhysicalAddress: useMutation({
        mutationFn: BusinessFlowApi.registerPhysicalAddress,
      }),
      modifyPhysicalAddress: useMutation({
        mutationFn: BusinessFlowApi.modifyPhysicalAddress,
      }),
      removePhysicalAddress: useMutation({
        mutationFn: BusinessFlowApi.removePhysicalAddress,
      }),
      registerVirtualAddress: useMutation({
        mutationFn: BusinessFlowApi.registerVirtualAddress,
      }),
      modifyVirtualAddress: useMutation({
        mutationFn: BusinessFlowApi.modifyVirtualAddress,
      }),
      removeVirtualAddress: useMutation({
        mutationFn: BusinessFlowApi.removeVirtualAddress,
      }),
    },
  };
};
