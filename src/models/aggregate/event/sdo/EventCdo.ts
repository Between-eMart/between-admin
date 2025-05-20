
export interface EventCdo {
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  numberOfSeats: number;
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
