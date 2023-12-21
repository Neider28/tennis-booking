import jwt, { JwtPayload } from 'jsonwebtoken';

export const checkUserRole = async (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload;
  const role = decoded.role;
  
  return role;
};
