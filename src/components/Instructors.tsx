'use client'
import theme from '@/theme/themeConfig'
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input, InputRef, Space, Table } from 'antd'
import Highlighter from 'react-highlight-words';
import { useRef, useState } from 'react';
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import AddInstructor from './AddInstructor';


interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  email: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    email: 'jbrown@email.com',
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    email: 'jgreen@email.com',
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 24,
    address: 'Sydney No. 1 Lake Park',
    email: 'jblack@email.com',
  },
];

export default function Instructors() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

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
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
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
      width: 125,
      render: (_: any) => (
        <Space size="middle">
          <a className='text-rich-black hover:text-naples-yellow'><EyeOutlined /></a>
          <a className='text-rich-black hover:text-naples-yellow'><EditOutlined /></a>
          <a className='text-rich-black hover:text-naples-yellow'><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider theme={theme}>
      <AddInstructor />
      <Table dataSource={data} columns={columns}>
        
      </Table>
    </ConfigProvider>
  )
}
