'use client'
import theme from '@/theme/themeConfig'
import { Button, Carousel, ConfigProvider } from 'antd'
import Image from 'next/image'
import image1 from '../../public/images/pexels-matthew-turner-2568551.jpg'
import image2 from '../../public/images/pexels-anna-shvets-5069176.jpg'
import image3 from '../../public/images/pexels-isabella-mendes-342361.jpg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getTokenCookie } from '@/utils/cookie.util'
import { useMyContext } from '@/context/MainContext'
import { MyProfile } from '@/services/Auth'

const contentStyle: React.CSSProperties = {
  width: '100%',
  height: '100vh',
  objectFit: 'cover',
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { profile, setProfile } = useMyContext();

  useEffect(() => {
    document.title = 'Tennis Booking';

    const token = getTokenCookie();

    if (token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }

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
    <ConfigProvider theme={theme}>
      <main className="App w-full h-screen relative">
        <Carousel autoplay className="w-full h-screen">
          <div>
            <Image src={image1} alt='Image 1' style={contentStyle} />
          </div>
          <div>
            <Image src={image2} alt='Image 2' style={contentStyle} />
          </div>
          <div>
            <Image src={image3} alt='Image 3' style={contentStyle} />
          </div>
        </Carousel>
        <div className='p-2 flex flex-col justify-center items-center absolute w-full h-screen top-0 left-0 bg-opacity-60 bg-rich-black'>
          <div className='flex justify-center flex-col w-full md:w-3/4 lg:w-[48rem]'>
            <h1 className='text-naples-yellow text-2xl md:text-4xl font-bold text-center'>
              Discover a new level of play! Register now to secure your place in our exclusive tennis classes
            </h1>
            <p className='mt-3 text-sm md:text-base text-center text-honeydew'>
              Join a passionate community, perfect your technique and experience the excitement of every match. Don&apos;t let this opportunity pass you by! Sign up today and start your journey to success on the court.
            </p>
          </div>
          <div className='mt-8 flex justify-center flex-col md:flex-row w-full md:w-3/4 lg:w-[48rem]'>
            {!isAuthenticated && profile  ? (
              <Link href={profile.user.role === 'company' ? '/dashboard/admin' : '/dashboard'}>
              <Button className='w-full' type='primary' ghost size='large'>
                Dashboard
              </Button>
            </Link>
            ) : (<>
              <Link href="/login">
                <Button className='w-full' type='primary' ghost size='large'>
                  Login
                </Button>
              </Link>
              <Link href="/sign-up/student" className='mt-4 md:mt-0 md:ml-4'>
                <Button type='primary' size='large' className='w-full bg-naples-yellow'>
                  Sign Up
                </Button>
              </Link></>
            )}
          </div>
          {isAuthenticated && (
            <div className='mt-4 flex justify-center flex-col md:flex-row w-full md:w-3/4 lg:w-[48rem]'>
              <Link href="/sign-up/company" className='text-center'>
                <span className='text-naples-yellow font-medium underline'>Register as a company</span>
              </Link>
            </div>
          )}
        </div>
      </main>
    </ConfigProvider>
  )
}
