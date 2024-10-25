export interface IDonation {
  id?: number;
  donationName?: string | null;
  contactDetails?: string | null;
  billingAddress?: string | null;
  amount?: string | null;
  description?: string | null;
  donationType?: string | null;
  dateAndTime?: string | null;
  email?: string | null;
}

export const defaultValue: Readonly<IDonation> = {};
