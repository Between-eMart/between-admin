import { InquiryCategory, InquiryRespondForm, InquirySubject } from '~/models/aggregate/support/vo';

export interface InquiryCdo {
  authorName: string;
  authorSurname: string;
  email: string;
  phone: string;
  description: string;
  category: InquiryCategory;
  subject: InquirySubject;
  inquiryRespondForm: InquiryRespondForm;
}
