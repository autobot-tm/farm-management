import React, { useState } from 'react'
import {
  fetchFilteredData,
  getPlantsService,
} from '../../services/apis/plant.service'
import { Table, Input, Button, Spin, Alert } from 'antd'
import './styles.scss'
import useSWR from 'swr'
import { useModal } from '../../hooks'
import PlantsDetailModal from '../../components/PlantsDetail/PlantsDetailModal'
import PlantsCreateBtn from './PlantsCreateBtn'
import { formatCustomCurrency } from '../../utils/number-seperator'

const { Search } = Input

const PlantsTable = ({
  data,
  handleTableChange,
  pageSize,
  currentPage,
  totalElements,
  onDetailClick,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className='plants-name'>{text}</span>,
    },
    // {
    //   title: 'Type Plant ID',
    //   dataIndex: 'type_plant_id',
    //   key: 'type_plant_id',
    //   filters: [
    //     { text: 'Type 1', value: 1 },
    //     { text: 'Type 2', value: 2 },
    //     { text: 'Type 3', value: 3 },
    //   ],
    //   onFilter: (value, record) => record.type_plant_id === value,
    // },
    {
      title: 'Date Planted',
      dataIndex: 'date_planted',
      key: 'date_planted',
      render: (text) => {
        if (!text) {
          return 'Not yet'
        }
        const date = new Date(text)
        return date.toISOString().split('T')[0]
      },
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      // filtes: [
      //   { text: 'Small (Below 1m²)', value: 'small' },
      //   { text: 'Medium (1 - 5m²)', value: 'medium' },
      //   { text: 'Large (Above 5m²)', value: 'large' },
      // ],
      // onFilter: (value, record) => {
      //   if (value === 'small') return record.area < 100
      //   if (value === 'medium') return record.area >= 100 && record.area <= 500
      //   if (value === 'large') return record.area > 500
      //   return false
      // },
    },
    {
      title: 'Expected Yield',
      dataIndex: 'yield',
      key: 'yield',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      filters: [
        { text: 'Below 500K', value: 'below500' },
        { text: '500K - 1000K', value: '500to1000' },
        { text: 'Above 1000K', value: 'above1000' },
      ],
      onFilter: (value, record) => {
        console.log(record.price)

        if (value === 'below500') return record.price < 500
        if (value === '500to1000')
          return record.price >= 500 && record.price <= 1000
        if (value === 'above1000') return record.price > 1000
        return false
      },
      render: (text) => formatCustomCurrency(text),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => onDetailClick(record.id)}>Detail</Button>
      ),
    },
  ]

  return (
    <div className='container-table'>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        pagination={{
          current: currentPage + 1,
          pageSize: pageSize,
          total: totalElements,
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

const InputFilterPlants = ({ onFilterData, mutate }) => {
  const [searchText, setSearchText] = useState('')

  // Handle search input
  const handleSearch = async (value) => {
    setSearchText(value)

    try {
      const response = await fetchFilteredData(value)
      onFilterData(response.data)
    } catch (error) {
      console.error('Error fetching search data:', error)
    }
  }

  return (
    <div className='input-filter-plants'>
      <Search
        placeholder='Search plants'
        allowClear
        onSearch={handleSearch}
        style={{ width: 500 }}
      />
      <PlantsCreateBtn mutate={mutate} />
    </div>
  )
}

const PlantsPage = () => {
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [selectedPlantId, setSelectedPlantId] = useState(null)
  const { isModalVisible, openModal, closeModal } = useModal()
  const handleDetailClick = (id) => {
    setSelectedPlantId(id)
    openModal()
  }

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current - 1)
    setPageSize(pagination.pageSize)
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
    mutate,
  } = useSWR(`/api/getPlants?page=${currentPage}&size=${pageSize}`, () =>
    fetchData({ pageSize, pageNo: currentPage })
  )
  if (isLoading) {
    return (
      <div className='loading-container'>
        <Spin />
      </div>
    )
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
      {isModalVisible && (
        <PlantsDetailModal
          isOpen={isModalVisible}
          onClose={closeModal}
          id={selectedPlantId}
          mutate={mutate}
        />
      )}
      <InputFilterPlants onFilterData={setFilteredData} mutate={mutate} />
      <PlantsTable
        data={filteredData?.length > 0 ? filteredData : plants?.results}
        currentPage={currentPage}
        pageSize={pageSize}
        totalElements={plants?.total_pages * plants?.page_size}
        handleTableChange={handleTableChange}
        onDetailClick={handleDetailClick}
      />
    </div>
  )
}

export default PlantsPage
