import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getTokenCookie } from '@/utils/cookie.util';
import { useMyContext } from '@/context/MainContext';
import { EditOutlined } from '@ant-design/icons';
import { EditInstructor } from '@/services/Instructor';

const UpdateInstructor: React.FC<{id: string}> = ({ id }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { instructors, setInstructors } = useMyContext();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCreate = async (values: any, id: string) => {
    const removeEmptyValues = (obj: any): any => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined),
      );
    };

    const instructor = removeEmptyValues(values);

    try {
      const token = getTokenCookie();

      if (token) {
        const data = await EditInstructor(token, id, instructor);

        if (data) {
          setIsModalOpen(false);
          setInstructors(instructors.map((item: any) => {
            if (item.key === id) {
              return { ...item, ...instructor };
            }
            return item;
          }));
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
      <Button type="primary" ghost className='bg-transparent' onClick={showModal} icon={<EditOutlined />}>

      </Button>
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
            rules={[{ type: 'string', min: 3 }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ type: 'string', min: 3 }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="bio"
            rules={[{ type: 'string', min: 50 }]}
          >
            <TextArea placeholder="Bio" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ type: 'string', min: 10 }]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ type: 'string', min: 20 }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateInstructor;
