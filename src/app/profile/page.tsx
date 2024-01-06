"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import { MyProfile } from "@/services/Auth";
import { getTokenCookie } from "@/utils/cookie.util";
import { useMyContext } from "@/context/MainContext";
import ProfileCover from "@/components/ProfileCover";
import { StudentI } from "@/interfaces/student.interface";
import { CompanyI } from "@/interfaces/company.interface";
import { InstructorI } from "@/interfaces/instructor.interface";
import NotFound from "@/components/NotFound";

export default function Profile() {
  const { profile, setProfile } = useMyContext();
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getTokenCookie();

        if (token) {
          const res: StudentI | CompanyI | InstructorI = await MyProfile(token);
        
          document.title = `My Profile | ${'name' in res ? `${res?.name}` : `${res?.firstName} ${res?.lastName}`}`;

          setProfile(res);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchProfile();
  }, []);

  return (
    <IsNotAuth>
      <ConfigProvider theme={theme}>
        <Header />
        <main className="w-full h-auto p-2 mt-8 flex justify-center">
          {(profile && !error) && (
            <div className="w-full sm:w-9/12 lg:w-[60rem] relative mb-28">
              <ProfileCover banner={profile.banner} image={'profileImage' in profile ? profile.profileImage : profile.logo} />
              <div className="w-full mt-14 lg:mt-24">
                <h2 className="text-3xl font-semibold text-honeydew capitalize">{'name' in profile ? profile.name : `${profile.firstName} ${profile.lastName}`}</h2>
                <span className="text-base lg:text-lg font-medium text-naples-yellow capitalize">{profile.user.role}</span>
              </div>
              <div className="w-full mt-10">
                <span className="text-base font-semibold text-honeydew">Email</span>
                <p className="text-base font-normal text-honeydew mb-6">{profile.user.email}</p>
                <span className="text-base font-semibold text-honeydew">Phone number</span>
                <p className="text-base font-normal text-honeydew mb-6">{'phone' in profile ? profile.phone : "None"}</p>
                <span className="text-base font-semibold text-honeydew">Address</span>
                <p className="text-base font-normal text-honeydew">{'address' in profile ? profile.address : "None"}</p>
              </div>
            </div>
          )}
          {error && (
            <div className='h-fit w-full sm:w-9/12 lg:w-[60rem] pb-20'>
              <NotFound />
            </div>
          )}
        </main>
      </ConfigProvider>
    </IsNotAuth>
  );
};
