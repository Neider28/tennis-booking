import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, InputNumber, SelectProps, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CreateClass } from "@/services/Schedule";
import { getTokenCookie } from "@/utils/cookie.util";
import { useMyContext } from "@/context/MainContext";
import { ClassI, CreateClassI } from "@/interfaces/class.interface";

export default function AddClass() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { classes, setClasses } = useMyContext();
  const [classTypeValue, setClassTypeValue] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Internal error.",
    });
  };

  const options1: SelectProps["options"] = [
    {
      value: "beginner",
      label: "Beginner",
    },
    {
      value: "intermediate",
      label: "Intermediate",
    },
    {
      value: "advanced",
      label: "Advanced",
    },
  ];

  const options2: SelectProps["options"] = [
    {
      value: "individual",
      label: "Individual",
    },
    {
      value: "group",
      label: "Group",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setClassTypeValue("");
  };

  const onCreate = async (values: any) => {
    let classBody: CreateClassI = {
      title: values.title,
      description: values.description,
      classType: values.classType,
      skillLevel: values.skillLevel,
      cost: values.cost,
    };

    if (values.classType === "group") {
      classBody.participants = values.participants;
    }

    try {
      const token = getTokenCookie();

      if (token) {
        const res: ClassI = await CreateClass(token, classBody);

        if (res) {
          setIsModalOpen(false);
          setClasses([...classes, res]);
        }
      }      
    } catch (error) {
      warning();
    }
  };

  const onChangeClassType = (value: any) => {
    setClassTypeValue(value);
  };

  return (<>
    <Button
      type="primary"
      className="bg-naples-yellow mb-6"
      onClick={showModal}
    >
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
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title!",
            },
            {
              type: "string",
              min: 10,
            },
          ]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description!",
            },
            {
              type: "string",
              min: 50,
            },
          ]}
        >
          <TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="skillLevel"
          rules={[
            {
              required: true,
              message: "Please select skill level!",
            },
          ]}
        >
          <Select
            optionFilterProp="children"
            placeholder="Skill level"
            options={options1}
          />
        </Form.Item>
        <Form.Item
          name="classType"
          rules={[
            {
              required: true,
              message: "Please select class type!",
            },
          ]}
        >
          <Select
            optionFilterProp="children"
            placeholder="Class type"
            options={options2}
            onChange={onChangeClassType}
          />
        </Form.Item>
        {classTypeValue === "group" && (
          <Form.Item
            name="participants"
            rules={[
              {
                required: true,
                message: "Please enter number of participants!",
              },
              {
                type: "number",
              }
            ]}
          >
            <InputNumber
              className="w-full"
              placeholder="Participants (0-10)"
              min={1}
              max={10}
            />
          </Form.Item>
        )}
        <Form.Item
          name="cost"
          rules={[
            {
              required: true,
              message: "Please enter cost!",
            },
            {
              type: "number",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            placeholder="Cost"
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value: string | undefined) => value!.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
      </Form>
    </Modal>
  </>);
};
