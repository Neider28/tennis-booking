"use client"
import React, { useEffect, useState } from "react";
import { Card, ConfigProvider, Tag } from "antd";
import { FindOneCompany } from "@/services/Company";
import { getTokenCookie } from "@/utils/cookie.util";
import theme from "@/theme/themeConfig";
import Link from "next/link";
import { MyProfile } from "@/services/Auth";
import AddClass from "./AddClass";
import NotFound from "./NotFound";
import { CompanyI } from "@/interfaces/company.interface";
import { useMyContext } from "@/context/MainContext";
import { ClassI } from "@/interfaces/class.interface";

export default function Classes() {
  const { company, setCompany, classes, setClasses } = useMyContext();
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const profile = await MyProfile(token);
          const res: CompanyI = await FindOneCompany(token, profile._id);
          setCompany(res);
          setClasses(res.classes);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <ConfigProvider theme={theme}>
      {company && (<>
        <AddClass />
        <div className="flex flex-col gap-y-8 sm:flex-row sm:gap-8">
          {classes.map((item: ClassI) => (
            <Link key={item._id} href={`/dashboard/admin/class-detail/${item._id}`}>
              <Card
                title={item.title}
                hoverable
                bordered={false}
                key={item._id}
                className="w-full"
              >
                <Tag
                  bordered={true}
                  color="#F50"
                  className="mb-2 min-[389px]:mb-0"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  {item.skillLevel}
                </Tag>
                <Tag
                  bordered={true}
                  color="#108ee9"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  {item.classType}
                </Tag>
                <p className="mt-2 text-2xl text-rich-black font-semibold">
                  ${item.cost}
                </p>
              </Card>
            </Link>
          ))}
        </div></>
      )}
      {error && (
        <div className='h-fit w-full'>
          <NotFound />
        </div>
      )}
    </ConfigProvider>
  );
};
