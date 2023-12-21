'use client'
import theme from '@/theme/themeConfig'
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input, InputRef, Space, Table } from 'antd'
import Highlighter from 'react-highlight-words';
import { useEffect, useRef, useState } from 'react';
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import AddInstructor from './AddInstructor';
import { FindAllInstructors } from '@/services/Instructor';
import { useMyContext } from '@/context/MainContext';
import { getTokenCookie } from '@/utils/cookie.util';
import UpdateInstructor from './UpdateInstructor';
import DeleteInstructor from './DeleteInstructor';
import Link from 'next/link';

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
}

type DataIndex = keyof DataType;

export default function Instructors() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const { instructors, setInstructors } = useMyContext();

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  useEffect(() => {
    try {
      const instructors = async (token: string) => {
        const data = await FindAllInstructors(token);

        setInstructors(data.map((item: any) => {
          return {
            key: item._id,
            firstName: item.firstName,
            lastName: item.lastName,
            phone: item.phone,
            email: item.user.email,
            address: item.address,
          }
        }));
      };

      const token = getTokenCookie();

      if(token) {
        instructors(token);
      }
    } catch (error) {
      
    }
  }, []);

  const getColumnSearchProps = (dataIndex: DataIndex, name: string): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${name}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            ghost
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
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
      <SearchOutlined style={{ color: filtered ? '#EFCB68' : undefined }} />
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
          highlightStyle={{ backgroundColor: '#EFCB68', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      ellipsis: true,
      ...getColumnSearchProps('firstName', 'First Name'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      ellipsis: true,
      ...getColumnSearchProps('lastName', 'Last Name'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      ellipsis: true,
      fixed: 'right',
      width: 150,
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Link href={`/instructor/${record.key}`}>
            <EyeOutlined />
          </Link>
          <UpdateInstructor id={record.key.toString()} />
          <DeleteInstructor id={record.key.toString()} firstName={record.firstName} lastName={record.lastName} />
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider theme={theme}>
      <AddInstructor />
      <Table dataSource={instructors} columns={columns}>
        
      </Table>
    </ConfigProvider>
  )
}
