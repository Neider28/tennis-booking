"use client"
import { FormEvent, useEffect, useState } from "react";
import Header from "@/components/Header";
import theme from "@/theme/themeConfig";
import { Button, ConfigProvider, message } from "antd";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import { EditProfileCompany, EditProfileStudent } from "@/services/Auth";
import { getTokenCookie } from "@/utils/cookie.util";
import { useMyContext } from "@/context/MainContext";
import { StudentI, UpdateStudentI } from "@/interfaces/student.interface";
import { CompanyI, UpdateCompanyI } from "@/interfaces/company.interface";
import UpdateProfileCover from "@/components/UpdateProfileCover";

export default function Profile() {
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const { profile } = useMyContext();

  const warning = () => {
    messageApi.open({
      type: "error",
      content: "This is a warning message",
    });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const UpdateStudent = async (e: FormEvent) => {
    e.preventDefault();

    setLoad(true);

    const body: UpdateStudentI = {
      firstName,
      lastName,
      phone,
      address,
    };

    try {
      const token = getTokenCookie();

      if (token) {
        const res: StudentI = await EditProfileStudent(token, body);

        if (res) {
          setLoad(false);
          setFirstName("");
          setLastName("");
          setPhone("");
          setAddress("");
          success();
        }
      }
    } catch (error) {
      setTimeout(() => {
        setLoad(false);
        warning();
      }, 2000);
    }
  };

  const UpdateCompany = async (e: FormEvent) => {
    e.preventDefault();

    setLoad(true);

    const body: UpdateCompanyI = {
      name: companyName,
    };

    try {
      const token = getTokenCookie();

      if (token) {
        const res: CompanyI = await EditProfileCompany(token, body);

        if (res) {
          setLoad(false);
          setCompanyName("");
          success();
        }
      }
    } catch (error) {
      setTimeout(() => {
        setLoad(false);
        warning();
      }, 2000);
    }
  };

  useEffect(() => {
    document.title = "Edit Profile";
  }, []);

  return (
    <IsNotAuth>
      <ConfigProvider theme={theme}>
        <Header />
        <main className="w-full h-auto p-2 mt-8 flex justify-center">
          {contextHolder}
          {(profile && profile.user.role === "student") && (
            <div className="w-full sm:w-9/12 lg:w-[60rem] relative mb-28">
              <UpdateProfileCover banner={profile.banner} image={'profileImage' in profile ? profile.profileImage : profile.logo} />
              <div className="w-full mt-14 lg:mt-24">
                <form
                  onSubmit={UpdateStudent}
                  className="w-full md:w-1/2 lg:w-80 flex flex-col justify-center items-center"
                >
                  <input
                    className="w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className="w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    className="w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    className="w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Button
                    className="w-full bg-naples-yellow"
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={load}
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          )}
          {(profile && profile.user.role === "company") && (
            <div className="w-full sm:w-9/12 lg:w-[60rem] relative mb-28">
              <UpdateProfileCover banner={profile.banner} image={'logo' in profile ? profile.logo : profile.profileImage} />
              <div className="w-full mt-14 lg:mt-24">
                <form
                  onSubmit={UpdateCompany}
                  className="w-full md:w-1/2 lg:w-80 flex flex-col justify-center items-center"
                >
                  <input
                    className="w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <Button 
                    className="w-full bg-naples-yellow"
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={load}
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          )}
        </main>
      </ConfigProvider>
    </IsNotAuth>
  );
};
