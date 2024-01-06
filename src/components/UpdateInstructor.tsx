import React, { useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getTokenCookie } from "@/utils/cookie.util";
import { useMyContext } from "@/context/MainContext";
import { EditOutlined } from "@ant-design/icons";
import { EditInstructor } from "@/services/Instructor";
import { InstructorI, UpdateInstructorI } from "@/interfaces/instructor.interface";

export default function UpdateInstructor({ id } : { id: string }) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { instructorsTable, setInstructorsTable } = useMyContext();
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
  };

  const onCreate = async (values: any, id: string) => {
    const removeEmptyValues = (obj: any): any => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined),
      );
    };

    const instructor: UpdateInstructorI = removeEmptyValues(values);

    try {
      const token = getTokenCookie();

      if (token) {
        const res: InstructorI = await EditInstructor(token, id, instructor);

        if (res) {
          setIsModalOpen(false);
          setInstructorsTable(instructorsTable.map((item: any) => {
            if (item.key === id) {
              return { ...item, ...instructor };
            }
            return item;
          }));
        }
      }  
    } catch (error) {
      warning();
    }
  };

  return (<>
    <Button
      type="primary"
      ghost
      className="bg-transparent"
      onClick={showModal}
      icon={<EditOutlined />}
    />
    <Modal
      title="Edit instructor"
      open={isModalOpen}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values, id);
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
          name="firstName"
          rules={[
            {
              type: "string",
              min: 3,
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              type: "string",
              min: 3,
            },
          ]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="bio"
          rules={[
            {
              type: "string",
              min: 50,
            },
          ]}
        >
          <TextArea placeholder="Bio" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              type: "string",
              min: 10,
            },
          ]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            {
              type: "string",
              min: 20,
            },
          ]}
        >
          <Input placeholder="Address" />
        </Form.Item>
      </Form>
    </Modal>
  </>);
};
