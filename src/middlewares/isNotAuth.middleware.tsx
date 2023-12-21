'use client'
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { getTokenCookie } from '@/utils/cookie.util';

interface Props {
  children: ReactNode;
}

const IsNotAuth: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = getTokenCookie();

        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setTimeout(() => {
            router.push('/');
          }, 1000);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return isAuthenticated ? <>{children}</> : <Loading />;
};

export default IsNotAuth;
