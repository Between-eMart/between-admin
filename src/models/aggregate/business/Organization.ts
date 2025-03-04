import { DomainEntity } from '~/models/aggregate/shared';

export interface Organization extends DomainEntity {
  name: string;
  phone: string;
  password?: string;
  phoneVerified: boolean;
  email: string;
  emailVerified: boolean;
}
