import React, { useState } from 'react'
import {
  Table,
  Input,
  Spin,
  Alert,
  Modal,
  Popconfirm,
  Form,
  InputNumber,
  notification,
} from 'antd'
import './styles.scss'
import useSWR from 'swr'
import {
  getAllHarvestService,
  getDetailHarvestService,
  updateHarvestService,
} from '../../services/apis/harvest.service'
import { formatCustomCurrency } from '../../utils/number-seperator'
import { useModal } from '../../hooks/useModal'
import BaseButton from '../../components/Button/BaseButton'

const { Search } = Input

// Columns for the main harvest table
const columns = (handleDateClick) => [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <a onClick={() => handleDateClick(text)}>{text}</a>, // Make the date clickable
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

// Columns for the detailed harvest data table in the modal
const detailColumns = (handleEdit) => [
  {
    title: 'Plant Name',
    dataIndex: 'plant_name',
    key: 'plant_name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Yield Actual',
    dataIndex: 'yield_actual',
    key: 'yield_actual',
  },
  {
    title: 'Price Actual',
    dataIndex: 'price_actual',
    key: 'price_actual',
    render: (text) => formatCustomCurrency(text),
  },
  {
    title: 'Farm Name',
    dataIndex: 'farm_name',
    key: 'farm_name',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <span className='container-btn'>
        <BaseButton
          backgroundColor='#e68a8c'
          type='text'
          name='Edit'
          onClick={() => handleEdit(record)} // Pass the record to the handleEdit function
        />
      </span>
    ),
  },
]
// Component to display the main harvest table
const Harvestable = ({ data, handleDateClick }) => {
  return (
    <div className='container-table'>
      <Table dataSource={data} columns={columns(handleDateClick)} />
    </div>
  )
}

const HarvestPage = () => {
  const { isModalVisible, openModal, closeModal } = useModal()
  const [isEditVisible, setIsEditVisible] = useState(false) // State for edit form visibility
  const [currentRecord, setCurrentRecord] = useState(null) // State for the current record being edited
  const [modalData, setModalData] = useState([])
  const [api, contextHolder] = notification.useNotification()
  const [form] = Form.useForm() // State to store the detailed harvest data

  const fetchAllHarvest = async () => {
    try {
      const response = await getAllHarvestService()
      return response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  // Function to fetch detailed harvest data based on the selected date
  const fetchDetailHarvest = async (date) => {
    try {
      const response = await getDetailHarvestService({ date })
      console.log(response.data.data.results)

      setModalData(response.data.data.results) // Update modalData with the detailed results
      openModal() // Open the modal
    } catch (error) {
      console.log(error)
    }
  }

  // Using SWR to fetch all harvest data
  const {
    data: harvest,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/getAllHarvest', fetchAllHarvest)

  // Loading state
  if (isLoading) {
    return (
      <div className='loading-container'>
        <Spin />
      </div>
    )
  }

  // Error state
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

  const openNotification = ({ type, message, description }) => {
    api.open({
      type,
      message,
      description,
      showProgress: true,
      pauseOnHover: false,
    })
  }

  // Function to handle date click and fetch detailed data
  const handleDateClick = (date) => {
    fetchDetailHarvest(date)
  }

  const handleEdit = (record) => {
    setCurrentRecord(record)
    setIsEditVisible(true) // Show the edit form
    form.setFieldsValue({
      description: record.description,
      yield_actual: record.yield_actual,
      price_actual: record.price_actual,
    })
  }

  // Handle form submission
  const handleFormSubmit = async (values) => {
    console.log('Updated values:', values)
    const params = { ...values, id: currentRecord.id }
    try {
      await updateHarvestService(params)
      openNotification({
        type: 'success',
        message: 'Edit Successful',
        description: 'You already edit harvest detail successful',
      })
      mutate()
    } catch (error) {
      openNotification({
        type: 'error',
        message: 'Edit Successful',
        description: error.response.data.message_vn,
      })
      console.log(error)
    } finally {
      setIsEditVisible(false)
    }
  }

  return (
    <>
      {contextHolder}
      <div className='harvest-page'>
        <div className='input-filter-plants'>
          <Search placeholder='Search harvest' style={{ width: 500 }} />
        </div>
        <Harvestable data={harvest} handleDateClick={handleDateClick} />
        <Modal
          // title='Harvest Details'
          visible={isModalVisible}
          onCancel={closeModal}
          footer={null}
          width={800} // Adjust the modal width as needed
        >
          <Table
            dataSource={modalData}
            columns={detailColumns(handleEdit)}
            pagination={false}
          />
        </Modal>

        <Modal
          title='Edit Harvest'
          visible={isEditVisible}
          onCancel={() => setIsEditVisible(false)}
          onOk={() => form.submit()} // Trigger form submission when the "OK" button is clicked
        >
          <Form
            form={form}
            layout='vertical'
            onFinish={handleFormSubmit} // Handle form submission
          >
            <Form.Item
              name='description'
              label='Description'
              rules={[
                { required: true, message: 'Please input the description!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='yield_actual'
              label='Yield Actual'
              rules={[
                { required: true, message: 'Please input the yield actual!' },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name='price_actual'
              label='Price Actual'
              rules={[
                { required: true, message: 'Please input the price actual!' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) =>
                  `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  )
}

export default HarvestPage
