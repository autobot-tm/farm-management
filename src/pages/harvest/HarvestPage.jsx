import React from 'react'
import { Table, Input, Spin, Alert } from 'antd'
import './styles.scss'
import useSWR from 'swr'
import { getAllHarvestService } from '../../services/apis/harvest.service'
import { formatCustomCurrency } from '../../utils/number-seperator'
const { Search } = Input

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (text) => (text ? text : 'N/A'),
  },
  {
    title: 'Total Yield Actual',
    dataIndex: 'total_yield_actual',
    key: 'total_yield_actual',
  },
  {
    title: 'Total Money Actual',
    dataIndex: 'total_money_actual',
    key: 'total_money_actual',
    render: (text) => formatCustomCurrency(text),
  },
]

const Harvestable = ({ data }) => {
  return (
    <div className='container-table'>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

const HarvestPage = () => {
  const fetchAllHarvest = async () => {
    try {
      const response = await getAllHarvestService()
      return response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const {
    data: harvest,
    error,
    isLoading,
  } = useSWR('/api/getAllHarvest', fetchAllHarvest)

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
        description='Failed to fetch harvest.'
        type='error'
        showIcon
      />
    )
  }
  return (
    <div className='harvest-page'>
      <div className='input-filter-plants'>
        <Search placehoder='Search harvest' style={{ width: 500 }} />
      </div>
      <Harvestable data={harvest} />
    </div>
  )
}

export default HarvestPage
