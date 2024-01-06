import { ScheduleI } from "./schedule.interface";

export interface ClassI {
  _id: string;
  title: string;
  description: string;
  skillLevel: string;
  classType: string;
  cost: number;
  participants: number;
  createdAt: Date;
  updatedAt: Date;
  schedules: ScheduleI[];
};

export interface CreateClassI {
  title: string;
  description: string;
  skillLevel: string;
  classType: string;
  cost: number;
  participants?: number;
};

export interface UpdateClassI {
  title?: string;
  description?: string;
  skillLevel?: string;
  classType?: string;
  cost?: number;
  participants?: number;
};
