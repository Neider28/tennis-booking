export const CreatePayment = async (body: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
