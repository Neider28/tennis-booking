import React, { useState } from 'react';
import { Button, Form, Input, Modal, DatePicker, Select, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { RangePicker } = DatePicker;

const AddInstructor: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" className='bg-naples-yellow mb-6' onClick={showModal}>
        Add new instructor
      </Button>
      <Modal title="Add new instructor" open={isModalOpen} onOk={handleOk} maskClosable={false} centered={true} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Input placeholder="First Name" className='mb-4' />
          <Input placeholder="Last Name" className='mb-4' />
          <Input placeholder="Email" className='mb-4' />
          <TextArea placeholder="Bio" className='mb-4' rows={4} />
          <Input placeholder="Phone" type='tel' className='mb-4' />
          <Input placeholder="Address" className='mb-4' />
        </Form>
      </Modal>
    </>
  );
};

export default AddInstructor;
