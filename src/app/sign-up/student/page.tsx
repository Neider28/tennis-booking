'use client'
import { SignUpGoogleAuth, SignUpStudent } from '@/services/Auth'
import logo from '../../../../public/logo.png'
import theme from '@/theme/themeConfig'
import { GoogleLogin } from '@react-oauth/google'
import { Button, ConfigProvider, message } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import IsAuth from '@/middlewares/isAuth.middleware'

export default function SignUp() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const warning = () => {
    messageApi.open({
      type: 'error',
      content: 'This is a warning message',
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoad(true);

    const user: any = {
      firstName,
      lastName,
      user: {
        email,
        password,
      },
    };

    try {
      const data = await SignUpStudent(user);

      if (data) {
        router.push(`/verify-email/${email}`);
      }
    } catch (error) {
      setLoad(false);
      warning();
    }
  };

  useEffect(() => {
    document.title = 'Sign Up | Student';
  }, []);

  return (
    <IsAuth>
      <ConfigProvider theme={theme}>
        <main className='w-full h-screen p-2 flex justify-center items-center'>
          {contextHolder}
          <div className='w-full flex flex-col justify-center items-center sm:w-2/4 lg:w-80 rounded-lg sm:px-4 sm:py-8 sm:border sm:border-solid sm:border-naples-yellow'>
            <Link href="/">
              <Image src={logo} alt='Logo' width={175} height={175} priority />
            </Link>
            <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center'>
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
                type="email"
                name="email"
                id="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                className='w-full h-10 px-2 mb-6 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow'
                type="password"
                name="password"
                id="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className='w-full bg-naples-yellow' type='primary' htmlType='submit' size='large' loading={load}>
                Sign Up
              </Button>
            </form>
            <span className='my-4 text-honeydew'>or Register with:</span>
            <GoogleLogin
              theme='filled_blue'
              type='icon'
              size='large'
              onSuccess={async (credentialResponse) => {
                try {
                  const data = await SignUpGoogleAuth(credentialResponse);

                  if (data) {
                    router.push('/login');
                  }
                } catch (error) {
                  setLoad(false);
                  warning();
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </main>
      </ConfigProvider>
    </IsAuth>
  )
}
