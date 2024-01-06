import React from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getTokenCookie } from "@/utils/cookie.util";
import { RemoveInstructor } from "@/services/Instructor";
import { useMyContext } from "@/context/MainContext";

export default function DeleteInstructor({ id, firstName, lastName } : { id: string, firstName: string, lastName: string }) {
  const [modal, contextHolder] = Modal.useModal();
  const { instructorsTable, setInstructorsTable } = useMyContext();

  const config = {
    title: "Delete Instructor!",
    content: (
      <>
        <p>Are you sure to eliminate instructor {firstName} {lastName}?</p>
      </>
    ),
    maskClosable: false,
    centered: true,
  };

  const OnDelete = async (id: string) => {
    const token = getTokenCookie();

    if (token) {
      const res = await RemoveInstructor(token, id);

      if (res) {
        setInstructorsTable(instructorsTable.filter((item: any) => item.key !== id));
      }
    }
  };

  return (<>
    {contextHolder}
    <Button
      type="primary"
      ghost
      className="bg-transparent"
      onClick={
        async () => {
          const confirmed = await modal.confirm(config);

          if (confirmed) {
            OnDelete(id);
          }
        }
      }
      icon={<DeleteOutlined />}
    />
  </>);
};
