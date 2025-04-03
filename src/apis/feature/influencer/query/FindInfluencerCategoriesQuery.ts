import { Offset } from '~/models/aggregate/shared/Offset';
import { Gender, ProfileStatus } from '~/models';

export interface FindInfluencerCategoriesQuery {
  //
  searchKey?: string;
  offset?: Offset;
}
