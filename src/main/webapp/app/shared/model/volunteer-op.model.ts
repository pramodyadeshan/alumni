export interface IVolunteerOP {
  id?: number;
  volunteerName?: string | null;
  dateAndTime?: string | null;
  location?: string | null;
  timeDuration?: string | null;
  description?: string | null;
  member?: string | null;
  volunteerOpCoordinator?: string | null;
}

export const defaultValue: Readonly<IVolunteerOP> = {};
