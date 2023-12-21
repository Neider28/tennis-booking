'use client'
import React, { useEffect, useState } from 'react';
import logo from '../../../public/logo.png'
import profile from '../../../public/images/Profile.png'
import Image from 'next/image'
import {
  ScheduleOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Layout, Menu } from 'antd';
import theme from '@/theme/themeConfig'
import Schedules from '@/components/Schedules';
import Instructors from '@/components/Instructors'
import Link from 'next/link';
import { MyProfile } from '@/services/Auth';
import { useMyContext } from '@/context/MainContext';
import { getTokenCookie } from '@/utils/cookie.util';
import IsNotAuth from '@/middlewares/isNotAuth.middleware';
import IsUser from '@/middlewares/isUser.middleware';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

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
}

const items: MenuItem[] = [
  getItem('Schedules', '1', <ScheduleOutlined />),
  // getItem('Instructors', '2', (<div>Upcoming...</div>)),
];

const profileStyle: React.CSSProperties = {
  borderRadius: '100%',
  border: '2px solid #EFCB68',
}

const headerStyle: React.CSSProperties = {
  padding: '15px 20px',
  height: '80px',
  display: 'flex',
  justifyContent: 'flex-end',
  background: '#000411',
}

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem]= useState('1');
  const { profile, setProfile } = useMyContext();
  const componentsSwtich = (key: any) => {
    switch (key) {
      case '1':
        return (<Schedules />);
      case '2':
        return (<Instructors />);
      default:
        break;
    }
  };

  useEffect(() => {
    document.title = 'Dashboard Student';

    try {
      const profile = async (token: string) => {
        const data = await MyProfile(token);
        
        setProfile(data);

        return data;
      };

      const token = getTokenCookie();

      if(token) {
        profile(token);
      }
    } catch (error) {
      
    }
  }, []);

  return (
    <IsNotAuth>
      <IsUser>
        <ConfigProvider theme={theme}>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <div className="demo-logo-vertical">
                <Link href='/'>
                  <Image src={logo} alt='Logo' width={175} height={175} priority />
                </Link>
              </div>
              <Menu theme="dark" defaultSelectedKeys={['1']} onClick={(e) => 
                setSelectedMenuItem(e.key)} mode="inline" items={items} />
            </Sider>
            <Layout>
              <Header style={headerStyle}>
                <Link href="/profile">
                  {profile && (
                    <div>
                      <Image src={profile.profileImage || profile.logo} alt='Profile' width={50} height={50} style={profileStyle} priority />
                    </div>
                  )}
                </Link>
              </Header>
              <Content style={{ margin: '20px 16px' }}>
                <div style={{ padding: 12, minHeight: 360 }}>
                  {componentsSwtich(selectedMenuItem)}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center', padding: '24px 12px', fontSize: '0.875rem', fontWeight: 400, color: '#000411' }}>Tennis Booking ©2023 Created by Whynot? mih</Footer>
            </Layout>
          </Layout>
        </ConfigProvider>
      </IsUser>
    </IsNotAuth>
  );
};

export default Dashboard;
