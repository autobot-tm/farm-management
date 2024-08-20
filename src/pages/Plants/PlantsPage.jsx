import React, { useState } from 'react'
import {
  fetchFilteredData,
  getPlantsService,
} from '../../services/apis/plant.service'
import { FilterOutlined } from '@ant-design/icons'
import { Table, Input, Button, Dropdown, Space, Spin, Alert } from 'antd'
import './styles.scss'
// import PlantsManagerment from '../PlantsManagerment/PlantsManagerment'
import useSWR from 'swr'

const { Search } = Input

// Component hiển thị bảng với dữ liệu cây trồng
const PlantsTable = ({
  data,
  loading,
  handleTableChange,
  pageSize,
  currentPage,
  totalElements,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className='plants-name'>{text}</span>,
    },
    {
      title: 'Type Plant ID',
      dataIndex: 'type_plant_id',
      key: 'type_plant_id',
      filters: [
        { text: 'Type 1', value: 1 },
        { text: 'Type 2', value: 2 },
        { text: 'Type 3', value: 3 },
      ],
      onFilter: (value, record) => record.type_plant_id === value,
    },
    {
      title: 'Date Planted',
      dataIndex: 'date_planted',
      key: 'date_planted',
      render: (text) => text || 'Not yet',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      filtes: [
        { text: 'Small (Below 1m²)', value: 'small' },
        { text: 'Medium (1 - 5m²)', value: 'medium' },
        { text: 'Large (Above 5m²)', value: 'large' },
      ],
      onFilter: (value, record) => {
        if (value === 'small') return record.area < 100
        if (value === 'medium') return record.area >= 100 && record.area <= 500
        if (value === 'large') return record.area > 500
        return false
      },
    },
    {
      title: 'Expected Yield',
      dataIndex: 'expected_yield',
      key: 'expected_yield',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      filters: [
        { text: 'Below 50K', value: 'below50' },
        { text: '50K - 100K', value: '50to100' },
        { text: 'Above 100K', value: 'above100' },
      ],
      onFilter: (value, record) => {
        if (value === 'below50') return record.Price < 50
        if (value === '50to100')
          return record.Price >= 50 && record.Price <= 100
        if (value === 'above100') return record.Price > 100
        return false
      },
    },
  ]

  return (
    <div className='container-table'>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={{
          current: currentPage + 1, // Adjusting for 1-based index required by antd
          pageSize: pageSize,
          total: totalElements,
        }}
        onChange={handleTableChange} // Truyền đúng handleTableChange
      />
    </div>
  )
}

// Component cho bộ lọc và tìm kiếm
const InputFilterPlants = ({ onFilterData }) => {
  const [selectedFilter, setSelectedFilter] = useState('Filter')
  const [searchText, setSearchText] = useState('')

  const filters = [
    {
      key: '1',
      label: <p>1st menu item</p>,
    },
    {
      key: '2',
      label: <p>2nd menu item</p>,
    },
    {
      key: '3',
      label: <p>3rd menu item</p>,
    },
  ]

  // Xử lý khi chọn bộ lọc
  const handleFilterClick = async (e) => {
    const filter = e.domEvent.target.innerText
    setSelectedFilter(filter)

    try {
      const response = await fetchFilteredData(
        filter === 'Filter' ? '' : filter,
        ''
      )
      onFilterData(response.data)
    } catch (error) {
      console.error('Error fetching filtered data:', error)
    }
  }

  // Xử lý khi tìm kiếm
  const handleSearch = async (value) => {
    setSearchText(value)

    try {
      const response = await fetchFilteredData(
        searchText,
        selectedFilter === 'Filter' ? '' : selectedFilter
      )
      onFilterData(response.data)
    } catch (error) {
      console.error('Error fetching search data:', error)
    }
  }

  return (
    <div className='input-filter-plants'>
      <Dropdown
        menu={{
          items: filters,
          onClick: handleFilterClick,
        }}
      >
        <Button>
          <Space>
            {selectedFilter}
            <FilterOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Search
        placeholder='Search plants'
        allowClear
        onSearch={handleSearch}
        style={{ width: 500 }}
      />
    </div>
  )
}

// Component chính cho trang Plants
const PlantsPage = () => {
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(0) // Start at 0 since page_no starts at 0
  const [pageSize, setPageSize] = useState(10) // Default page size

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current - 1) // Adjusting for 0-based index
    setPageSize(pagination.pageSize)
    console.log('hi')
  }

  const fetchData = async ({ pageSize, pageNo }) => {
    try {
      const response = await getPlantsService({ pageSize, pageNo })
      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const {
    data: plants,
    error,
    isLoading,
  } = useSWR(`/api/getPlants?page=${currentPage}&size=${pageSize}`, () =>
    fetchData({ pageSize, pageNo: currentPage })
  )
  if (isLoading) {
    return <Spin />
  }

  if (error) {
    return (
      <Alert
        message='Error'
        description='Failed to fetch plants.'
        type='error'
        showIcon
      />
    )
  }

  return (
    <div className='plants-page'>
      <h1 className='title-lst-of-plants'>List of Plants</h1>
      <InputFilterPlants onFilterData={setFilteredData} />
      <PlantsTable
        data={filteredData.length > 0 ? filteredData : plants.results}
        loading={isLoading}
        currentPage={currentPage}
        pageSize={pageSize}
        totalElements={plants?.total_pages * plants?.page_size}
        handleTableChange={handleTableChange}
      />
    </div>
  )
}

export default PlantsPage
