export interface EventI {
  event_id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  editable?: boolean;
  deletable?: boolean;
};
