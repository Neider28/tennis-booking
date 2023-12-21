'use client'
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTokenCookie } from "@/utils/cookie.util";
import Loading from "@/components/Loading";
import { checkUserRole } from "@/utils/checkRole.util";

interface Props {
  children: ReactNode,
};

const IsUser: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [isUser, setIsUser] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsUser = async () => {
      const token = getTokenCookie();

      if (token) {
        const role = await checkUserRole(token);
  
        if (role === 'student') {
          setIsUser(true);
        } else {
          setIsUser(false);
          setTimeout(() => {
            router.push('/dashboard/admin');
          }, 1000);
        }
      }
    };
    
    checkIsUser();
  }, []);

  if (isUser === null) {
    return <Loading />;
  }

  return isUser ? <>{children}</> : <Loading />;
};

export default IsUser;
