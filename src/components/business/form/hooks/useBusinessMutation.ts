import { useMutation } from '@tanstack/react-query';
import { OrganizationCdo } from '~/models';
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

  return {
    defaultOrganizationCdo,
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
      removePhysicalAddress: useMutation({
        mutationFn: BusinessFlowApi.removePhysicalAddress,
      }),
      registerVirtualAddress: useMutation({
        mutationFn: BusinessFlowApi.registerVirtualAddress,
      }),
      removeVirtualAddress: useMutation({
        mutationFn: BusinessFlowApi.removeVirtualAddress,
      }),
    },
  };
};
