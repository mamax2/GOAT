export interface Announcement {
  id: number;
  type: 'request' | 'offer' | 'lastminute';

  title: string;
  subtitle: string;
  description: string;

  category?: string;
  icon?: string;

  duration_hours: number;
  total_spots: number;
  remaining_spots: number;
  credits: number;

  event_date?: string | null; // solo lastminute
  event_time?: string | null;

  cta_label: string;
  cta_action?: string;
}
