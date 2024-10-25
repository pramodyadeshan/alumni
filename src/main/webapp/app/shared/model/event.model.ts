export interface IEvent {
  id?: number;
  eventName?: string | null;
  dateAndTime?: string | null;
  location?: string | null;
  eventType?: string | null;
  description?: string | null;
  targetAudience?: string | null;
  eventCoordinator?: string | null;
  status?: boolean | null;
}

export const defaultValue: Readonly<IEvent> = {
  status: false,
};
