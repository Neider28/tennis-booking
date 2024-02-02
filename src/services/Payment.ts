import { CreatePaymentI, PaymentI } from "@/interfaces/payment.interface";

export const CreatePaymentStripe = async (token: string, body: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/payment/stripe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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

export const CreatePayment = async (token: string, body: CreatePaymentI): Promise<PaymentI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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

export const FindOnePayment = async (token: string, id: string): Promise<PaymentI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/payment/${id}`, {
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

export const ConfirmPayment = async (token: string, id: string): Promise<PaymentI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/payment/${id}`, {
      method: 'PUT',
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
