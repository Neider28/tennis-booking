'use client'
import logo from '../../public/logo.png'
import profile from '../../public/images/Profile.png'
import theme from '@/theme/themeConfig'
import { ConfigProvider, Dropdown, MenuProps, Space } from 'antd'
import Image from 'next/image'
import { removeTokenCookie } from '@/utils/cookie.util'
import { useRouter } from 'next/navigation'
import { useMyContext } from '@/context/MainContext'
import Link from 'next/link'

const profileStyle: React.CSSProperties = {
  borderRadius: '100%',
  border: '2px solid #EFCB68'
}

export default function Header() {
  const { profile, setProfile } = useMyContext();
  const router = useRouter();

  const logout = () => {
    removeTokenCookie();
    router.push('/');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Dashboard',
      onClick: () => {
        router.push(profile.user.role === 'company' ? '/dashboard/admin' : '/dashboard');
      },
    },
    {
      key: '2',
      label: 'My Profile',
      onClick: () => {
        router.push('/profile');
      },
    },
    {
      key: '3',
      label: 'Edit Profile',
      onClick: () => {
        router.push('/edit-profile');
      },
    },
    {
      key: '4',
      danger: true,
      label: 'Logout',
      onClick: logout,
    },
  ];

  return (
    <ConfigProvider theme={theme}>
      <header className='w-full shadow-lg shadow-neutral-900 flex justify-center items-center border-solid border-b-2 border-naples-yellow'>
        <nav className='w-full flex justify-between items-center sm:w-9/12 lg:w-[60rem] pr-6 sm:pr-0'>
          <Link href="/">
            <Image src={logo} alt='Logo' width={150} height={150} priority />
          </Link>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {profile && (
                  <div className='cursor-pointer'>
                    <Image src={profile.profileImage || profile.logo} alt='Profile' width={50} height={50} style={profileStyle} priority />
                  </div>
                )}
              </Space>
            </a>
          </Dropdown>
        </nav>
      </header>
    </ConfigProvider>
  )
}
