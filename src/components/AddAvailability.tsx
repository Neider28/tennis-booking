import React, { useState } from "react";
import { Button, Form, Modal, DatePicker, message } from "antd";
import { getTokenCookie } from "@/utils/cookie.util";
import { AddAvailabilityToInstructor } from "@/services/Instructor";
import { AvailabilityI } from "@/interfaces/availability.interface";
import { InstructorI } from "@/interfaces/instructor.interface";
import { useMyContext } from "@/context/MainContext";

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

export default function AddAvailability({ id } : { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setAvailabilities } = useMyContext();
  const [form] = Form.useForm();
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
    const availability: AvailabilityI = {
      startDate: new Date(values.fullDate[0].$d).setSeconds(0, 0),
      endDate: new Date(values.fullDate[1].$d).setSeconds(0, 0),
    };
    
    try {
      const token = getTokenCookie();

      if (token) {
        const res: InstructorI = await AddAvailabilityToInstructor(token, id, availability);

        if (res) {
          setAvailabilities(res.availability.map((item: any) => {
            return {
              event_id: item._id,
              title: `${res.firstName} ${res.lastName}`,
              start: new Date(item.startDate),
              end: new Date(item.endDate),
            }
          }));
          setIsModalOpen(false);
        }
      }      
    } catch (error) {
      warning();
    }
  };

  return (<>
    <Button
      type="primary"
      className="bg-naples-yellow mb-6"
      onClick={showModal}
    >
      Add new availability
    </Button>
    <Modal
      title="Add new availability"
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
      centered={false}
      onCancel={handleCancel}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item name="fullDate" {...rangeConfig}>
          <RangePicker className="w-full" showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
      </Form>
    </Modal>
  </>);
};
