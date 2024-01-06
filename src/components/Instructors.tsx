"use client"
import theme from "@/theme/themeConfig";
import { ClockCircleOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, InputRef, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { ColumnType, ColumnsType, FilterConfirmProps } from "antd/es/table/interface";
import AddInstructor from "./AddInstructor";
import { useMyContext } from "@/context/MainContext";
import { getTokenCookie } from "@/utils/cookie.util";
import UpdateInstructor from "./UpdateInstructor";
import DeleteInstructor from "./DeleteInstructor";
import Link from "next/link";
import { MyProfile } from "@/services/Auth";
import { FindOneCompany } from "@/services/Company";
import NotFound from "./NotFound";
import { InstructorTableI } from "@/interfaces/instructor.interface";

type DataIndex = keyof InstructorTableI;

export default function Instructors() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const { instructorsTable, setInstructorsTable } = useMyContext();
  const [error, setError] = useState<boolean | null>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const token = getTokenCookie();

        if(token) {
          const profile = await MyProfile(token);
          const res = await FindOneCompany(token, profile._id);
  
          setInstructorsTable(res.instructors.map((item: any) => {
            return {
              key: item._id,
              firstName: item.firstName,
              lastName: item.lastName,
              phone: item.phone,
              email: item.user.email,
              address: item.address,
            }
          }));
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchInstructors();
  }, []);

  const getColumnSearchProps = (dataIndex: DataIndex, name: string): ColumnType<InstructorTableI> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${name}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            ghost
            size="small"
            style={{ width: 100 }}
          >
            Search
          </Button>
          <Button
            type="link"
            size="small"
            style={{ width: 110 }}
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#EFCB68" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#EFCB68", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<InstructorTableI> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      ellipsis: true,
      ...getColumnSearchProps("firstName", "First Name"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      ellipsis: true,
      ...getColumnSearchProps("lastName", "Last Name"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      ellipsis: true,
      fixed: "right",
      width: 180,
      render: (_: any, record: InstructorTableI) => (
        <Space size="middle">
          <Link href={`/instructor/${record.key}`}>
            <EyeOutlined />
          </Link>
          <Link href={`/dashboard/admin/instructor/availability/${record.key}`}>
            <ClockCircleOutlined />
          </Link>
          <UpdateInstructor id={record.key.toString()} />
          <DeleteInstructor
            id={record.key.toString()}
            firstName={record.firstName}
            lastName={record.lastName}
          />
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider theme={theme}>
      {!error && (<>
        <AddInstructor />
        <Table dataSource={instructorsTable} columns={columns} />
      </>)}
      {error && (
        <div className='h-fit w-full'>
          <NotFound />
        </div>
      )}
    </ConfigProvider>
  );
};
