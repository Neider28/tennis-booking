import React, { useState } from 'react';
import { Button, Form, Input, Modal, DatePicker, Select, InputNumber, SelectProps, message, Alert, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getTokenCookie } from '@/utils/cookie.util';
import { useMyContext } from '@/context/MainContext';
import { EditOutlined } from '@ant-design/icons';
import { EditSchedule } from '@/services/Schedule';

const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [{ type: 'array' as const }],
};

export default function UpdateSchedule({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { schedules, setSchedules, scheduleDetail, setScheduleDetail } = useMyContext();

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
    const removeEmptyValues = (obj: any): any => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined),
      );
    };

    const schedule = removeEmptyValues(values);

    if (schedule.fullDate) {
      schedule.startDate = new Date(schedule.fullDate[0].$d);
      schedule.endDate = new Date(schedule.fullDate[1].$d);
      delete schedule.fullDate;
    }

    try {
      const token = getTokenCookie();

      if (token) {
        const data = await EditSchedule(token, id, schedule);

        if (data) {
          setScheduleDetail(data);
          setIsModalOpen(false);
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
      <Button type="primary" ghost className='bg-naples-yellow mb-6' onClick={showModal} icon={<EditOutlined />} size='large'>
        Edit
      </Button>
      <Modal
        title="Edit class"
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
            rules={[{ type: 'string', min: 10 }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{ type: 'string', min: 50 }]}
          >
            <TextArea
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item
            name="skillLevel"
          >
            <Select
              optionFilterProp="children"
              placeholder='Skill level'
              options={options}
            />
          </Form.Item>
          <Form.Item
            name="cost"
            rules={[{ type: 'number' }]}
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
            rules={[{ type: 'number' }]}
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
}
