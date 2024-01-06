"use client"
import React, { useEffect, useState } from "react";
import { Card, ConfigProvider } from "antd";
import { FindAllCompanies } from "@/services/Company";
import { getTokenCookie } from "@/utils/cookie.util";
import theme from "@/theme/themeConfig";
import Image from "next/image";
import Link from "next/link";
import NotFound from "./NotFound";
import { CompanyI } from "@/interfaces/company.interface";

const { Meta } = Card;

export default function Companies() {
  const [companies, setCompanies] = useState<CompanyI[]>([]);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const res = await FindAllCompanies(token);
          setCompanies(res);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <ConfigProvider theme={theme}>
      {companies && (
        <div className="flex flex-col gap-y-8 sm:flex-row sm:gap-8">
        {companies.map((item: any) => (
          <Link
            key={item._id}
            href={`/dashboard/company/${item._id}`}
          >
            <Card
              key={item._id}
              hoverable
              style={{ width: 200 }}
              cover={
                <Image
                  alt="example"
                  width={500}
                  height={500}
                  src={item.logo}
                />
              }
            >
              <Meta title={item.name} />
            </Card>
          </Link>
        ))}
        </div>
      )}
      {error && (
        <div className='h-fit w-full'>
          <NotFound />
        </div>
      )}
    </ConfigProvider>
  );
};
