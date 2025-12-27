export interface Announcement {
  id: number;
  type: 'richiesta' | 'offerta';
  title: string;
  subtitle?: string | null;
  description: string;
  category?: string | null;
  duration_hours: number;
  total_spots: number;
  remaining_spots: number;
  credits: number;
  event_date?: string | null;
  event_time?: string | null;
  expires_at?: string | null;
  cta_label: string;
  cta_action?: string | null;
  priority?: number;
  created_at?: string;
}
