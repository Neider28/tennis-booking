import React, { useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { getTokenCookie } from "@/utils/cookie.util";
import { CreateInstructor } from "@/services/Instructor";
import { useMyContext } from "@/context/MainContext";
import { CreateInstructorI, InstructorI } from "@/interfaces/instructor.interface";

export default function AddInstructor() {
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

  const onCreate = async (values: any) => {
    const instructor: CreateInstructorI = {
      firstName: values.firstName,
      lastName: values.lastName,
      bio: values.bio,
      phone: values.phone,
      address: values.address,
      user: {
        email: values.email,
        password: `${values.firstName}@${values.lastName}:123`,
      },
    };

    try {
      const token = getTokenCookie();

      if (token) {
        const res: InstructorI = await CreateInstructor(token, instructor);

        if (res) {
          setIsModalOpen(false);
          setInstructorsTable([...instructorsTable, {
            key: res._id,
            firstName: res.firstName,
            lastName: res.lastName,
            phone: res.phone,
            address: res.address,
            email: res.user.email,
          }]);
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
      Add new instructor
    </Button>
    <Modal
      title="Add new instructor"
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
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter first name!",
            },
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
              required: true,
              message: "Please enter last name!",
            },
            {
              type: "string",
              min: 3,
            },
          ]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email!",
            },
            {
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="bio"
          rules={[
            {
              required: true,
              message: "Please enter bio!",
            },
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
              required: true,
              message: "Please enter phone!",
            },
            {
              type: "string",
              min: 10,
            }
          ]}
        >
          <Input placeholder="Phone" />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Please enter address!",
            },
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
