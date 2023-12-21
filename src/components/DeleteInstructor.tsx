import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getTokenCookie } from '@/utils/cookie.util';
import { RemoveInstructor } from '@/services/Instructor';
import { useMyContext } from '@/context/MainContext';

const DeleteInstructor: React.FC<{id: string, firstName: string, lastName: string}> = ({ id, firstName, lastName }) => {
  const [modal, contextHolder] = Modal.useModal();
  const { instructors, setInstructors } = useMyContext();

  const config = {
    title: 'Delete Instructor!',
    content: (
      <>
        <p>Are you sure to eliminate instructor {firstName} {lastName}?</p>
      </>
    ),
    maskClosable: false,
    centered: true,
  };

  const deleteHandle = async (id: string) => {
    try {
      const token = getTokenCookie();

      if (token) {
        const data = await RemoveInstructor(token, id);

        if (data) {
          setInstructors(instructors.filter((item: any) => item.key !== id))
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
      <Button
      type="primary"
      ghost
      className='bg-transparent'
        onClick={async () => {
          const confirmed = await modal.confirm(config);

          if (confirmed) {
            deleteHandle(id);
          }
        }}
        icon={<DeleteOutlined />}
      >
      </Button>
      {contextHolder}
    </>
  );
};

export default DeleteInstructor;