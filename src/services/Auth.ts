export const SignUpStudent = async (student: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/auth/sign-up/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const SignUpCompany = async (company: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/auth/sign-up/company`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const SignUpGoogleAuth = async (credentials: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/auth/sign-up/student/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const SignInAuth = async (user: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const SignInGoogleAuth = async (credentials: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/auth/sign-in/student/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const VerifyUser = async (email: string | string[] | undefined, code: number) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/auth/verify/${email}/${code}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const MyProfile = async (token: String | undefined) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const EditProfile = async (token: String | undefined, body: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/auth/profile/edit/student`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const EditProfileCompany = async (token: String | undefined, body: any) => {
  try {
    const response = await fetch(`${process.env.API_PROD}/auth/profile/edit/company`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
