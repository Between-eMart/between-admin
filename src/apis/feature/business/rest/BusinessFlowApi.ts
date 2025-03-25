import {
  CommandResponse,
  Organization,
  Brand,
  Establishment,
  EstablishmentCategory,
  PhysicalAddress,
  VirtualAddress
} from '~/models';
import {
  RegisterOrganizationCommand,
  ModifyOrganizationCommand,
  RemoveOrganizationCommand,
  RegisterBrandCommand,
  ModifyBrandCommand,
  RemoveBrandCommand,
  RegisterEstablishmentCommand,
  ModifyEstablishmentCommand,
  RemoveEstablishmentCommand,
  RegisterEstablishmentCategoryCommand,
  ModifyEstablishmentCategoryCommand,
  RemoveEstablishmentCategoryCommand,
  RegisterPhysicalAddressCommand,
  ModifyPhysicalAddressCommand,
  RemovePhysicalAddressCommand,
  RegisterVirtualAddressCommand,
  ModifyVirtualAddressCommand,
  RemoveVirtualAddressCommand
} from '../command';
import axios from 'axios';

const url = (path: string) => `/api/feature/business/${path}`;

const createCommand = async <T, R>(path: string, command: T): Promise<CommandResponse<R>> => {
  const response = await axios.post<CommandResponse<R>>(url(path), command);
  return response.data;
};

// Organization
const registerOrganization = (command: RegisterOrganizationCommand) => createCommand('register-establishmentRdo/command', command);
const modifyOrganization = (command: ModifyOrganizationCommand) => createCommand('modify-establishmentRdo/command', command);
const removeOrganization = (command: RemoveOrganizationCommand) => createCommand('remove-establishmentRdo/command', command);

// Brand
const registerBrand = (command: RegisterBrandCommand) => createCommand('register-brand/command', command);
const modifyBrand = (command: ModifyBrandCommand) => createCommand('modify-brand/command', command);
const removeBrand = (command: RemoveBrandCommand) => createCommand('remove-brand/command', command);

// Establishment
const registerEstablishment = (command: RegisterEstablishmentCommand) => createCommand('register-establishment/command', command);
const modifyEstablishment = (command: ModifyEstablishmentCommand) => createCommand('modify-establishment/command', command);
const removeEstablishment = (command: RemoveEstablishmentCommand) => createCommand('remove-establishment/command', command);

// Establishment Category
const registerEstablishmentCategory = (command: RegisterEstablishmentCategoryCommand) => createCommand('register-establishment-category/command', command);
const modifyEstablishmentCategory = (command: ModifyEstablishmentCategoryCommand) => createCommand('modify-establishment-category/command', command);
const removeEstablishmentCategory = (command: RemoveEstablishmentCategoryCommand) => createCommand('remove-establishment-category/command', command);

// Physical Address
const registerPhysicalAddress = (command: RegisterPhysicalAddressCommand) => createCommand('register-physical-address/command', command);
const modifyPhysicalAddress = (command: ModifyPhysicalAddressCommand) => createCommand('modify-physical-address/command', command);
const removePhysicalAddress = (command: RemovePhysicalAddressCommand) => createCommand('remove-physical-address/command', command);

// Virtual Address
const registerVirtualAddress = (command: RegisterVirtualAddressCommand) => createCommand('register-virtual-address/command', command);
const modifyVirtualAddress = (command: ModifyVirtualAddressCommand) => createCommand('modify-virtual-address/command', command);
const removeVirtualAddress = (command: RemoveVirtualAddressCommand) => createCommand('remove-virtual-address/command', command);

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
