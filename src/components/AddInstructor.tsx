import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getTokenCookie } from '@/utils/cookie.util';
import { CreateInstructor } from '@/services/Instructor';
import { useMyContext } from '@/context/MainContext';

const AddInstructor: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { instructors, setInstructors } = useMyContext();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCreate = async (values: any) => {
    const instructor = {
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
        const data = await CreateInstructor(token, instructor);

        if (data) {
          setIsModalOpen(false);
          setInstructors([...instructors, {
            key: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            address: data.address,
            email: data.user.email,
          }]);
        } else {

        }
      }  
    } catch (error) {
      setTimeout(() => {
      }, 2000);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" className='bg-naples-yellow mb-6' onClick={showModal}>
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
              console.log('Validate Failed:', info);
            });
        }}
        maskClosable={false}
        centered={true}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please enter first name!' }, { type: 'string', min: 3 }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please enter last name!' }, { type: 'string', min: 3 }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter email!' }, { type: 'email' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="bio"
            rules={[{ required: true, message: 'Please enter bio!' }, { type: 'string', min: 50 }]}
          >
            <TextArea placeholder="Bio" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Please enter phone!' }, { type: 'string', min: 10 }]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please enter address!' }, { type: 'string', min: 20 }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddInstructor;
