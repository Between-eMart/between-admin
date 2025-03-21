
export interface EventCdo {
  name: string;
  description: string;
  date: string;
  time: string;
  dressCode: string;
  adviceForAttenders: string;
  rules: string;
  venue: string;
  location: string;
  ageRestriction: string;
  isRepeatable: boolean;
  categoryIds: number[];
  establishmentId: number;
  banners: File[],
}
