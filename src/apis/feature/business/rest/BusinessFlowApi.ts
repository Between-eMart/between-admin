import { CommandResponse, Establishment, EstablishmentCategory, PhysicalAddress, VirtualAddress } from '~/models';
import {
  ModifyBrandCommand,
  ModifyEstablishmentCategoryCommand,
  ModifyEstablishmentCommand,
  ModifyOrganizationCommand,
  ModifyPhysicalAddressCommand,
  ModifyVirtualAddressCommand,
  RegisterBrandCommand,
  RegisterEstablishmentCategoryCommand,
  RegisterEstablishmentCommand,
  RegisterOrganizationCommand,
  RegisterPhysicalAddressCommand,
  RegisterVirtualAddressCommand,
  RemoveBrandCommand,
  RemoveEstablishmentCategoryCommand,
  RemoveEstablishmentCommand,
  RemoveOrganizationCommand,
  RemovePhysicalAddressCommand,
  RemoveVirtualAddressCommand,
} from '../command';
import axios from 'axios';

const url = (path: string) => `/api/feature/business/${path}`;

const createCommand = async <T, R>(path: string, command: T): Promise<CommandResponse<R>> => {
  const response = await axios.post<CommandResponse<R>>(url(path), command);
  return response.data;
};

// Organization
const registerOrganization = (command: RegisterOrganizationCommand) => createCommand<RegisterOrganizationCommand, unknown>('register-organization/command', command);
const modifyOrganization = (command: ModifyOrganizationCommand) => createCommand<ModifyOrganizationCommand, unknown>('modify-organization/command', command);
const removeOrganization = (command: RemoveOrganizationCommand) => createCommand<RemoveOrganizationCommand, unknown>('remove-organization/command', command);

// Brand
const registerBrand = (command: RegisterBrandCommand) => createCommand<RegisterBrandCommand, unknown>('register-brand/command', command);
const modifyBrand = (command: ModifyBrandCommand) => createCommand<ModifyBrandCommand, unknown>('modify-brand/command', command);
const removeBrand = (command: RemoveBrandCommand) => createCommand<RemoveBrandCommand, unknown>('remove-brand/command', command);

// Establishment
const registerEstablishment = async (command: RegisterEstablishmentCommand) => {
  const formData = new FormData();
  const commandBlob = new Blob([JSON.stringify(command)], { type: 'application/json' });
  formData.append('command', commandBlob);

  if (command.establishmentCdo.logo) {
    formData.append('logo', command.establishmentCdo.logo);
  }
  if (command.establishmentCdo.photos && command.establishmentCdo.photos.length > 0) {
    command.establishmentCdo.photos.forEach((banner) => formData.append('photos', banner));
  }

  const response = await axios.post<CommandResponse<Establishment>>(url('register-establishment/command'), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
const modifyEstablishment = (command: ModifyEstablishmentCommand) => createCommand<ModifyEstablishmentCommand, Establishment>('modify-establishment/command', command);
const removeEstablishment = (command: RemoveEstablishmentCommand) => createCommand<RemoveEstablishmentCommand, number>('remove-establishment/command', command);

// Establishment Category
const registerEstablishmentCategory = (command: RegisterEstablishmentCategoryCommand) => createCommand<RegisterEstablishmentCategoryCommand, EstablishmentCategory>('register-establishment-category/command', command);
const modifyEstablishmentCategory = (command: ModifyEstablishmentCategoryCommand) => createCommand<ModifyEstablishmentCategoryCommand, EstablishmentCategory>('modify-establishment-category/command', command);
const removeEstablishmentCategory = (command: RemoveEstablishmentCategoryCommand) => createCommand<RemoveEstablishmentCategoryCommand, number>('remove-establishment-category/command', command);

// Physical Address
const registerPhysicalAddress = (command: RegisterPhysicalAddressCommand) => createCommand<RegisterPhysicalAddressCommand, PhysicalAddress>('register-physical-address/command', command);
const modifyPhysicalAddress = (command: ModifyPhysicalAddressCommand) => createCommand<ModifyPhysicalAddressCommand, number>('modify-physical-address/command', command);
const removePhysicalAddress = (command: RemovePhysicalAddressCommand) => createCommand<RemovePhysicalAddressCommand, number>('remove-physical-address/command', command);

// Virtual Address
const registerVirtualAddress = (command: RegisterVirtualAddressCommand) => createCommand<RegisterVirtualAddressCommand, VirtualAddress>('register-virtual-address/command', command);
const modifyVirtualAddress = (command: ModifyVirtualAddressCommand) => createCommand<ModifyVirtualAddressCommand, number>('modify-virtual-address/command', command);
const removeVirtualAddress = (command: RemoveVirtualAddressCommand) => createCommand<RemoveVirtualAddressCommand, number>('remove-virtual-address/command', command);

export default {
  // Organization
  registerOrganization,
  modifyOrganization,
  removeOrganization,

  // Brand
  registerBrand,
  modifyBrand,
  removeBrand,

  // Establishment
  registerEstablishment,
  modifyEstablishment,
  removeEstablishment,

  // Establishment Category
  registerEstablishmentCategory,
  modifyEstablishmentCategory,
  removeEstablishmentCategory,

  // Physical Address
  registerPhysicalAddress,
  modifyPhysicalAddress,
  removePhysicalAddress,

  // Virtual Address
  registerVirtualAddress,
  modifyVirtualAddress,
  removeVirtualAddress,
};
