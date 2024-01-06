import { CompanyI } from "@/interfaces/company.interface";

export const FindAllCompanies = async (token: string): Promise<CompanyI[]> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/company`, {
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

export const FindOneCompany = async (token: string, id: string): Promise<CompanyI> => {
  try {
    const response = await fetch(`${process.env.API_PROD}/company/${id}`, {
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

export const AddStudentToCompany = async (token: string, id: string) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/company/${id}`, {
      method: 'POST',
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
