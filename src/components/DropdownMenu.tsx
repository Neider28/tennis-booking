import { useMyContext } from "@/context/MainContext";
import { MyProfile } from "@/services/Auth";
import theme from "@/theme/themeConfig";
import { getTokenCookie, removeTokenCookie } from "@/utils/cookie.util";
import { ConfigProvider, Dropdown, MenuProps, Space } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const profileStyle: React.CSSProperties = {
  borderRadius: "100%",
  border: "2px solid #EFCB68",
};

export default function DropdownMenu() {
  const { profile, setProfile } = useMyContext();
  const router = useRouter();

  const logout = () => {
    removeTokenCookie();
    router.push("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Dashboard",
      onClick: () => {
        router.push(profile?.user.role === "company" ? "/dashboard/admin" : "/dashboard");
      },
    },
    {
      key: "2",
      label: "My Profile",
      onClick: () => {
        router.push("/profile");
      },
    },
    {
      key: "3",
      label: "Edit Profile",
      onClick: () => {
        router.push("/edit-profile");
      },
    },
    {
      key: "4",
      danger: true,
      label: "Logout",
      onClick: logout,
    },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getTokenCookie();
  
        if (token) {
          const res = await MyProfile(token);
          setProfile(res);
        }
      } catch (error) {
        console.error("Internal error:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {profile && (
              <div className="cursor-pointer">
                <Image
                  src={'profileImage' in profile ? profile.profileImage : profile.logo}
                  alt="Profile"
                  width={50}
                  height={50}
                  style={profileStyle}
                  priority
                />
              </div>
            )}
          </Space>
        </a>
      </Dropdown>
    </ConfigProvider>
  );
};
