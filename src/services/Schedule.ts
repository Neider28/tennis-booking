import { AvailabilityI } from "@/interfaces/availability.interface";
import { ClassI, CreateClassI, UpdateClassI } from "@/interfaces/class.interface";
import { CompanyI } from "@/interfaces/company.interface";
import { ScheduleI } from "@/interfaces/schedule.interface";

export const CreateSchedule = async (token: string, id: string, schedule: AvailabilityI): Promise<CompanyI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/schedule/class/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(schedule),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const CreateClass = async (token: string, classBody: CreateClassI): Promise<ClassI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/schedule/class`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(classBody),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const FindAllSchedule = async (token: string): Promise<ScheduleI[]> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/schedule`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const FindOneSchedule = async (token: string, id: string): Promise<any> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/schedule/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const FindOneClass = async (token: string, id: string): Promise<ClassI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/schedule/class/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const EditSchedule = async (token: string, id: string, schedule: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/schedule/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(schedule),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const EditClass = async (token: string, id: string, classBody: UpdateClassI): Promise<ClassI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/schedule/class/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(classBody),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
