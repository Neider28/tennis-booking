"use client"
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTokenCookie } from "@/utils/cookie.util";
import Loading from "@/components/Loading";
import { checkUserRole } from "@/utils/checkRole.util";

interface Props {
  children: ReactNode,
};

const IsAdmin: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsAdmin = async () => {
      const token = getTokenCookie();

      if (token) {
        const role = await checkUserRole(token);
  
        if (role === "company") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }
      }
    };
    
    checkIsAdmin();
  }, []);

  if (isAdmin === null) {
    return <Loading />;
  }

  return isAdmin ? <>{children}</> : <Loading />;
};

export default IsAdmin;
