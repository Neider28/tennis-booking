export const CreateSchedule = async (token: string, schedule: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/schedule`, {
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
}

export const FindAllSchedule = async (token: string) => {
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
}

export const FindOneSchedule = async (token: string, id: string) => {
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
}

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
}
