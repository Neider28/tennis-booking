export const CreateInstructor = async (token: string, instructor: any) => {
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
}

export const EditInstructor = async (token: string, id: string, instructor: any) => {
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
}

export const FindAllInstructors = async (token: string) => {
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
}

export const FindOneInstructor = async (token: string, id: string) => {
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
}

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
}
