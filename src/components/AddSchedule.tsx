import React, { useEffect, useState } from "react";
import { Button, Form, Modal, DatePicker, Select, message } from "antd";
import { CreateSchedule } from "@/services/Schedule";
import { getTokenCookie } from "@/utils/cookie.util";
import { MyProfile } from "@/services/Auth";
import { FindOneCompany } from "@/services/Company";
import { AvailabilityI } from "@/interfaces/availability.interface";
import { useMyContext } from "@/context/MainContext";
import { CompanyI } from "@/interfaces/company.interface";

const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    {
      type: "array" as const,
      required: true,
      message: "Please select date!",
    },
  ],
};

const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function AddSchedule() {
  const { setSchedules } = useMyContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [classes, setClasses] = useState<any[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Internal error.",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onCreate = async (values: any) => {
    const scheduleBody: AvailabilityI = {
      startDate: new Date(values.fullDate[0].$d).setSeconds(0, 0),
      endDate: new Date(values.fullDate[1].$d).setSeconds(0, 0),
    };
    
    try {
      const token = getTokenCookie();

      if (token) {
        const res: CompanyI = await CreateSchedule(token, values.class, scheduleBody);

        if (res) {
          setSchedules(res.classes.flatMap((item1: any) => {
            return item1.schedules.map((item2: any) => {
              return {
                event_id: item2._id,
                title: item1.title,
                start: new Date(item2.startDate),
                end: new Date(item2.endDate),
              };
            });
          }));

          setIsModalOpen(false);
        }
      }
    } catch (error) {
      warning();
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const profile = await MyProfile(token);
          const res = await FindOneCompany(token, profile._id);
          setClasses(res.classes.map((item: any) => {
            return {
              value: item._id,
              label: item.title,
            }
          }));
        }
      } catch (error) {
        warning();
      }
    };

    fetchCompanies();
  }, []);

  return (<>
    <Button
      type="primary"
      className="bg-naples-yellow mb-6"
      onClick={showModal}
    >
      Add new schedule
    </Button>
    <Modal
      title="Add new schedule"
      open={isModalOpen}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      maskClosable={false}
      centered={true}
      onCancel={handleCancel}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="class"
          rules={[
            {
              required: true,
              message: "Please select a class!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a class"
            optionFilterProp="children"
            filterOption={filterOption}
            options={classes}
          />
        </Form.Item>
        <Form.Item name="fullDate" {...rangeConfig}>
          <RangePicker className="w-full" showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
      </Form>
    </Modal>
  </>);
};
