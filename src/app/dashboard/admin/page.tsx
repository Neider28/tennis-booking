"use client"
import React, { useEffect, useState } from "react";
import logo from "../../../../public/logo.png";
import Image from "next/image";
import {
  BookOutlined,
  ScheduleOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider, Layout, Menu } from "antd";
import theme from "@/theme/themeConfig";
import Schedules from "@/components/Schedules";
import Instructors from "@/components/Instructors";
import Link from "next/link";
import IsNotAuth from "@/middlewares/isNotAuth.middleware";
import IsAdmin from "@/middlewares/isAdmin.middleware";
import Classes from "@/components/Classes";
import DropdownMenu from "@/components/DropdownMenu";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

const items: MenuItem[] = [
  getItem("Classes", "1", <BookOutlined />),
  getItem("Instructors", "2", <TeamOutlined />),
  getItem("Schedules", "3", <ScheduleOutlined />),
];

const headerStyle: React.CSSProperties = {
  padding: "15px 20px",
  height: "80px",
  display: "flex",
  justifyContent: "flex-end",
  background: "#000411",
};

export default function DashboardAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem]= useState("1");

  const componentsSwtich = (key: any) => {
    switch (key) {
      case "1":
        return (<Classes />);
      case "2":
        return (<Instructors />);
      case "3":
        return (<Schedules />)
      default:
        break;
    }
  };

  useEffect(() => {
    document.title = "Dashboard Company";
  }, []);

  return (
    <IsNotAuth>
      <IsAdmin>
        <ConfigProvider theme={theme}>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div className="demo-logo-vertical">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="Logo"
                    width={175}
                    height={175}
                    priority
                  />
                </Link>
              </div>
              <Menu
                theme="dark"
                defaultSelectedKeys={["1"]}
                onClick={(e) => setSelectedMenuItem(e.key)}
                mode="inline"
                items={items}
              />
            </Sider>
            <Layout>
              <Header style={headerStyle}>
                <DropdownMenu />
              </Header>
              <Content style={{ margin: "20px 16px" }}>
                <div style={{ padding: 12, minHeight: 360 }}>
                  {componentsSwtich(selectedMenuItem)}
                </div>
              </Content>
              <Footer
                style={{
                  textAlign: "center",
                  padding: "24px 12px",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  color: "#000411"
                }}
              >
                Tennis Booking © 2024 Created by Whynot? mih
              </Footer>
            </Layout>
          </Layout>
        </ConfigProvider>
      </IsAdmin>
    </IsNotAuth>
  );
};
