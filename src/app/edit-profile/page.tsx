'use client'
import Header from '@/components/Header'
import theme from '@/theme/themeConfig'
import { Button, ConfigProvider, message } from 'antd'
import Image from 'next/image'
import IsNotAuth from '@/middlewares/isNotAuth.middleware'
import { FormEvent, useEffect, useState } from 'react'
import { EditProfile, EditProfileCompany, MyProfile } from '@/services/Auth'
import { getTokenCookie } from '@/utils/cookie.util'
import { ProfileI } from '@/interfaces/user'
import { CloudUploadOutlined } from '@ant-design/icons'
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
  const [user, setUser] = useState<ProfileI>();
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const { profile, setProfile } = useMyContext();

  const warning = () => {
    messageApi.open({
      type: 'error',
      content: 'This is a warning message',
    });
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoad(true);

    const body: any = {
      firstName,
      lastName,
      phone,
      address,
    };

    try {
      const token = getTokenCookie();

      const data = await EditProfile(token, body);
      
      setTimeout(() => {
        if (data) {
          setLoad(false);
          setFirstName('');
          setLastName('');
          setPhone('');
          setAddress('');
          success();
        } else {
          setLoad(false);
          warning();
        }
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoad(false);
        warning();
      }, 2000);
    }
  };

  const handleSubmitCompany = async (e: FormEvent) => {
    e.preventDefault();

    setLoad(true);

    const body: any = {
      name: companyName,
    };

    try {
      const token = getTokenCookie();

      const data = await EditProfileCompany(token, body);
      
      setTimeout(() => {
        if (data) {
          setLoad(false);
          setCompanyName('');
          success();
        } else {
          setLoad(false);
          warning();
        }
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoad(false);
        warning();
      }, 2000);
    }
  };

  useEffect(() => {
    document.title = 'Edit Profile';

    try {
      const profile = async (token: string) => {
        const data = await MyProfile(token);

        setProfile(data);
        setUser(data);

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
          {contextHolder}
          {(user && user.user.role === 'student') && (
            <div className='w-full sm:w-9/12 lg:w-[60rem] relative mb-28'>
              <div className='w-full h-40 lg:h-56 relative'>
                <div className='flex justify-center items-center absolute w-full h-full bg-black rounded-lg bg-opacity-60'>
                  <CloudUploadOutlined style={{
                    color: '#E1EFE6',
                    fontSize: '3rem',
                  }} />
                </div>
                <input type="file" accept="image/*" className='absolute w-full h-full cursor-pointer opacity-0' />
                <Image src={user.banner} alt='Banner' style={contentStyle} quality={100} width={1000} height={1000} priority />
              </div>
              <div className='absolute top-[5rem] left-[1rem] w-28 h-28 lg:w-40 lg:h-40 lg:top-[8rem] lg:left-[2rem]'>
                <div className='flex justify-center items-center absolute w-full h-full bg-black rounded-full bg-opacity-60'>
                  <CloudUploadOutlined style={{
                    color: '#E1EFE6',
                    fontSize: '3rem',
                  }} />
                </div>
                <input type="file" accept="image/*" className='absolute w-full h-full cursor-pointer opacity-0' />
                <Image src={user.profileImage} alt='Profile' style={profileStyle} quality={100} width={500} height={500} />
              </div>
              <div className='w-full mt-14 lg:mt-24'>
                <form onSubmit={handleSubmit} className='w-full md:w-1/2 lg:w-80 flex flex-col justify-center items-center'>
                  <input className='w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow'
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input className='w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow'
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input className='w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow'
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder='Phone Number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input className='w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow'
                    type="text"
                    name="address"
                    id="address"
                    placeholder='Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Button className='w-full bg-naples-yellow' type='primary' htmlType='submit' size='large' loading={load}>
                    Update
                  </Button>
                </form>
              </div>
            </div>
          )}
          {(user && user.user.role === 'company') && (
            <div className='w-full sm:w-9/12 lg:w-[60rem] relative mb-28'>
              <div className='w-full h-40 lg:h-56 relative'>
                <div className='flex justify-center items-center absolute w-full h-full bg-black rounded-lg bg-opacity-60'>
                  <CloudUploadOutlined style={{
                    color: '#E1EFE6',
                    fontSize: '3rem',
                  }} />
                </div>
                <input type="file" className='absolute w-full h-full cursor-pointer opacity-0' />
                <Image src={user.banner} alt='Banner' style={contentStyle} quality={100} width={1000} height={1000} priority />
              </div>
              <div className='absolute top-[5rem] left-[1rem] w-28 h-28 lg:w-40 lg:h-40 lg:top-[8rem] lg:left-[2rem]'>
                <div className='flex justify-center items-center absolute w-full h-full bg-black rounded-full bg-opacity-60'>
                  <CloudUploadOutlined style={{
                    color: '#E1EFE6',
                    fontSize: '3rem',
                  }} />
                </div>
                <input type="file" className='absolute w-full h-full cursor-pointer opacity-0' />
                <Image src={user.logo} alt='Profile' style={profileStyle} quality={100} width={500} height={500} />
              </div>
              <div className='w-full mt-14 lg:mt-24'>
                <form onSubmit={handleSubmitCompany} className='w-full md:w-1/2 lg:w-80 flex flex-col justify-center items-center'>
                  <input className='w-full h-10 px-2 mb-4 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow'
                    type="text"
                    name="name"
                    id="name"
                    placeholder='Company Name'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <Button className='w-full bg-naples-yellow' type='primary' htmlType='submit' size='large' loading={load}>
                    Update
                  </Button>
                </form>
              </div>
            </div>
          )}
        </main>
      </ConfigProvider>
    </IsNotAuth>
  )
}
