import { Offset } from '~/models/aggregate/shared/Offset';
import { Gender, ProfileStatus } from '~/models';

export interface FindActiveInfluencersQuery {
  //
  searchKey?: string;
  gender?: Gender;
  status?: ProfileStatus;
  categoryIds?: number[];
  offset?: Offset;
}
