"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import { FindOneInstructor } from "@/services/Instructor";
import theme from "@/theme/themeConfig";
import { getTokenCookie } from "@/utils/cookie.util";
import { ConfigProvider } from "antd";
import ProfileCover from "@/components/ProfileCover";
import NotFound from "@/components/NotFound";
import { InstructorI } from "@/interfaces/instructor.interface";

export default function InstructorDetail({ params }: { params: { id: string } }) {
  const [instructorProfile, setInstructorProfile] = useState<any>(null);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const res: InstructorI = await FindOneInstructor(token, params.id);

          document.title = `Instructor | ${res.firstName} ${res.lastName}`;

          setInstructorProfile(res);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchInstructor();
  }, []);

  return (
    <IsNotAuth>
      <ConfigProvider theme={theme}>
        <Header />
        <main className="w-full h-auto p-2 mt-8 flex justify-center">
          {(instructorProfile && !error) && (
            <div className="w-full sm:w-9/12 lg:w-[60rem] relative mb-28">
              <ProfileCover banner={instructorProfile.banner} image={instructorProfile.profileImage} />
              <div className="w-full mt-14 lg:mt-24">
                <h2 className="text-3xl font-semibold text-honeydew capitalize">{instructorProfile?.firstName} {instructorProfile?.lastName}</h2>
                <span className="text-base lg:text-lg font-medium text-naples-yellow capitalize">{instructorProfile.user.role}</span>
              </div>
              <div className="w-full mt-10">
                <span className="text-base font-semibold text-honeydew">Company</span>
                <p className="text-base font-normal text-honeydew mb-6">{instructorProfile?.company?.name}</p>
                <span className="text-base font-semibold text-honeydew">Email</span>
                <p className="text-base font-normal text-honeydew mb-6">{instructorProfile?.user?.email}</p>
                <span className="text-base font-semibold text-honeydew">Phone number</span>
                <p className="text-base font-normal text-honeydew mb-6">{instructorProfile?.phone}</p>
                <span className="text-base font-semibold text-honeydew">Address</span>
                <p className="text-base font-normal text-honeydew">{instructorProfile?.address}</p>
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
