import React, { useState } from 'react';
import { Button, Form, Input, Modal, DatePicker, Select, InputNumber, SelectProps, message, Alert, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CreateSchedule } from '@/services/Schedule';
import { getTokenCookie } from '@/utils/cookie.util';
import { useMyContext } from '@/context/MainContext';

const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [{ type: 'array' as const, required: true, message: 'Please select date!' }],
};

const AddSchedule: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { schedules, setSchedules } = useMyContext();

  const options: SelectProps['options'] = [
    {
      value: 'beginner',
      label: 'Beginner',
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
    },
    {
      value: 'advanced',
      label: 'Advanced',
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCreate = async (values: any) => {
    const schedule = {
      title: values.title,
      description: values.description,
      startDate: new Date(values.fullDate[0].$d),
      endDate: new Date(values.fullDate[1].$d),
      skillLevel: values.skillLevel,
      cost: values.cost,
      participants: values.participants,
    };

    try {
      const token = getTokenCookie();

      if (token) {
        const data = await CreateSchedule(token, schedule);

        if (data) {
          setIsModalOpen(false);
          setSchedules([...schedules, {
            event_id: data._id,
            title: data.title,
            start: new Date(data.startDate),
            end: new Date(data.endDate),
          }])
        } else {

        }
      }      
    } catch (error) {
      setTimeout(() => {
      }, 2000);
    }
  };

  return (
    <>
      <Button type="primary" className='bg-naples-yellow mb-6' onClick={showModal}>
        Add new class
      </Button>
      <Modal
        title="Add new class"
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
            name="title"
            rules={[{ required: true, message: 'Please enter title!' }, { type: 'string', min: 10 }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please enter description!' }, { type: 'string', min: 50 }]}
          >
            <TextArea
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item
            name="skillLevel"
            rules={[{ required: true, message: 'Please select skill level!' }]}
          >
            <Select
              optionFilterProp="children"
              placeholder='Skill level'
              options={options}
            />
          </Form.Item>
          <Form.Item
            name="cost"
            rules={[{ required: true, message: 'Please enter cost!' }, { type: 'number' }]}
          >
            <InputNumber
              className='w-full'
              placeholder='Cost'
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: string | undefined) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            name="participants"
            rules={[{ required: true, message: 'Please enter number of participants!' }, { type: 'number' }]}
          >
            <InputNumber
              className='w-full'
              placeholder='Participants (0-10)'
              min={1}
              max={10}
            />
          </Form.Item>
          <Form.Item name="fullDate" {...rangeConfig}>
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSchedule;
