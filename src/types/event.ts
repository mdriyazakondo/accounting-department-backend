export interface IEvent {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  organizer: string;
  photo?: string;
  category: string;
  attendees?: string[];
  maxAttendees?: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
