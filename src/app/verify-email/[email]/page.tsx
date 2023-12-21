'use client'
import { VerifyUser } from '@/services/Auth'
import logo from '../../../../public/logo.png'
import theme from '@/theme/themeConfig'
import { Button, ConfigProvider, message } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import IsAuth from '@/middlewares/isAuth.middleware'

export default function VerifyEmail({ params }: { params: { email: string } }) {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [load, setLoad] = useState(false);
  const [code, setCode] = useState('');

  const warning = () => {
    messageApi.open({
      type: 'error',
      content: 'This is a warning message',
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoad(true);

    try {
      const data = await VerifyUser(params.email, parseInt(code, 10));

      setTimeout(() => {
        if (data) {
          router.push('/login');
        } else {
          setLoad(false);
          setCode('');
          warning();
        }
      }, 2000);
    } catch (error) {
      setLoad(false);
      setCode('');
      warning();
    }
  };

  return (
    <IsAuth>
      <ConfigProvider theme={theme}>
        <main className='w-full h-screen p-2 flex justify-center items-center'>
          {contextHolder}
          <div className='w-full flex flex-col justify-center items-center sm:w-2/4 lg:w-80 rounded-lg sm:px-4 sm:py-8 sm:border sm:border-solid sm:border-naples-yellow'>
            <Link href="/">
              <Image src={logo} alt='Logo' width={175} height={175} priority />
            </Link>
            <p className='mb-4 text-sm md:text-base text-honeydew'>Ready! We have sent a verification code to your email address (<span className='text-naples-yellow font-medium'>{params.email.replace(/%40/g, '@')}</span>). This code will be valid for the next 10 minutes.</p>
            <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center'>
              <input className='w-full h-10 px-2 mb-6 bg-transparent text-sm text-honeydew rounded-lg border border-solid border-naples-yellow'
                type="text"
                name="code"
                id="code"
                placeholder='Verification code'
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button className='w-full' type='primary' htmlType='submit' size='large' loading={load}>
                Verify
              </Button>
            </form>
          </div>
        </main>
      </ConfigProvider>
    </IsAuth>
  );
};
