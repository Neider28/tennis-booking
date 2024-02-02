import { AvailabilityI } from "@/interfaces/availability.interface";
import { CreateInstructorI, InstructorI, UpdateInstructorI } from "@/interfaces/instructor.interface";

export const CreateInstructor = async (token: string, instructor: CreateInstructorI): Promise<InstructorI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/instructor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(instructor),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const AddAvailabilityToInstructor = async (token: string, id: string, availability: AvailabilityI): Promise<InstructorI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/instructor/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(availability),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const EditInstructor = async (token: string, id: string, instructor: UpdateInstructorI): Promise<InstructorI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/instructor/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(instructor),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const UpdateAvailabilityToInstructor = async (token: string, idInstructor: string, idAvailability: string, availability: AvailabilityI): Promise<InstructorI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/instructor/${idInstructor}/availability/${idAvailability}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(availability),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const FindAllInstructors = async (token: string): Promise<InstructorI[]> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/instructor`, {
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

export const FindOneInstructor = async (token: string, id: string): Promise<InstructorI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/instructor/${id}`, {
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

export const FindInstructorsAvailable = async (token: string, idClass: string): Promise<InstructorI[]> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/instructor/class/${idClass}`, {
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

export const DeleteAvailabilityToInstructor = async (token: string, idInstructor: string, idAvailability: string): Promise<InstructorI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/instructor/${idInstructor}/availability/${idAvailability}`, {
      method: 'DELETE',
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

export const RemoveInstructor = async (token: string, id: string) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/instructor/${id}`, {
      method: 'DELETE',
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
