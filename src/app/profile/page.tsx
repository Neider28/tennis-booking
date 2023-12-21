'use client'
import Header from '@/components/Header'
import theme from '@/theme/themeConfig'
import { ConfigProvider } from 'antd'
import Image from 'next/image'
import IsNotAuth from '@/middlewares/isNotAuth.middleware'
import { useEffect, useState } from 'react'
import { MyProfile } from '@/services/Auth'
import { getTokenCookie } from '@/utils/cookie.util'
import { ProfileI } from '@/interfaces/user'
import { useMyContext } from '@/context/MainContext'

const contentStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
}

const profileStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '100%',
  border: '4px solid #000411'
}

export default function Profile() {
  const { profile, setProfile } = useMyContext();

  useEffect(() => {
    document.title = 'My Profile';

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
      <ConfigProvider theme={theme}>
        <Header />
        <main className='w-full h-auto p-2 mt-8 flex justify-center'>
          {profile && (
            <div className='w-full sm:w-9/12 lg:w-[60rem] relative mb-28'>
              <div className='w-full h-40 lg:h-56'>
                <Image src={profile.banner} alt='Banner' style={contentStyle} width={500} height={500} priority />
              </div>
              <div className='absolute top-[5rem] left-[1rem] w-28 h-28 lg:w-40 lg:h-40 lg:top-[8rem] lg:left-[2rem]'>
                <Image src={profile.profileImage || profile.logo} alt='Profile' style={profileStyle} width={500} height={250} />
              </div>
              <div className='w-full mt-14 lg:mt-24'>
                <h2 className='text-3xl font-semibold text-honeydew capitalize'>{profile?.name ? `${profile?.name}` : `${profile?.firstName} ${profile?.lastName}`}</h2>
                <span className='text-base lg:text-lg font-medium text-naples-yellow capitalize'>{profile.user.role}</span>
              </div>
              <div className='w-full mt-10'>
                <span className='text-base font-semibold text-honeydew'>Email</span>
                <p className='text-base font-normal text-honeydew mb-6'>{profile?.user?.email}</p>
                <span className='text-base font-semibold text-honeydew'>Phone number</span>
                <p className='text-base font-normal text-honeydew mb-6'>{profile?.phone || 'None'}</p>
                <span className='text-base font-semibold text-honeydew'>Address</span>
                <p className='text-base font-normal text-honeydew'>{profile?.address || 'None'}</p>
              </div>
            </div>
          )}
        </main>
      </ConfigProvider>
    </IsNotAuth>
  )
}
