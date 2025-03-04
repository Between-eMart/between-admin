import { DomainEntity } from '~/models/aggregate/shared';

export interface EventBanner extends DomainEntity {
  name: string;
  filePath: string;
}
