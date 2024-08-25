import React, { useState } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  FloatButton,
  Dropdown,
  InputNumber,
  Divider,
  Row,
  Col,
} from 'antd'
import { SubHeading, Paragraph, Headline } from '../../components/Typography'
import BaseButton from '../../components/Button/BaseButton'
import { FireOutlined, PlusOutlined } from '@ant-design/icons'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import HarvestForm from '../../components/HarvestForm/FormHarver'
import './styles.scss'

ChartJS.register(ArcElement, Tooltip, Legend)

const { Search } = Input

// Farm Form Component
const FarmForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields()
        onCreate(values)
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  return (
    <Modal
      open={visible}
      title='Farm Form'
      okText='Create'
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          name: '',
          status: '',
          area: null,
          create_at: null,
          update_at: null,
        }}
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='area'
          label='Area'
          rules={[{ required: true, message: 'Please input the area!' }]}
        >
          <Input type='number' min={0} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

// Item Plant Component
const ItemPlant = ({ code }) => (
  <div className='item-plant'>
    <img src='src/assets/icons/icon-pea.png' alt={`Plant ${code}`} />{' '}
    {/* Placeholder for plant icon */}
    <Tag color='green'>{code}</Tag>
  </div>
)

// Search Plants Tag Component
const SearchPlantsTag = ({ onFilterData }) => {
  const [searchText, setSearchText] = useState('')

  const items = [
    {
      key: '1',
      label: (
        <div>
          <Paragraph>Add number of plants</Paragraph>
          <div className='item-dropdown'>
            <InputNumber style={{ width: '90%' }} type='number' />
            <Button style={{ background: 'white' }} icon={<PlusOutlined />} />
          </div>
        </div>
      ),
    },
  ]

  const items2 = [
    {
      key: '1',
      label: (
        <div>
          <Paragraph>Select your plants</Paragraph>
          <div className='item-dropdown'>
            <Select style={{ width: 250 }} />
            <InputNumber style={{ width: '30%' }} type='number' />
            <Button style={{ background: 'white' }} icon={<PlusOutlined />} />
          </div>
        </div>
      ),
    },
  ]

  // Handle search functionality
  const handleSearch = async (value) => {
    setSearchText(value)

    try {
      const response = await fetchFilteredData(
        searchText,
        selectedFilter === selectedFilter
      )
      onFilterData(response.data)
    } catch (error) {
      console.error('Error fetching search data:', error)
    }
  }

  return (
    <div className='input-filter-plants-farm'>
      <Search
        placeholder='Search plants'
        allowClear
        onSearch={handleSearch}
        style={{ width: 500 }}
      />
      <Dropdown
        menu={{ items: items2 }}
        placement='bottomRight'
        trigger={['click']}
        arrow={{ pointAtCenter: false }}
      >
        <Button type='primary' size='large' icon={<PlusOutlined />}>
          Add Plant
        </Button>
      </Dropdown>
      <Dropdown
        menu={{ items }}
        placement='bottomRight'
        trigger={['click']}
        arrow={{ pointAtCenter: false }}
      >
        <Button type='primary' size='large' icon={<PlusOutlined />}>
          Add Plant
        </Button>
      </Dropdown>
    </div>
  )
}

// Pie Chart Component
const PieChart = () => {
  const data = {
    labels: ['Used land', 'Unused'], // Data labels
    datasets: [
      {
        label: 'Datasets Using Land',
        data: [300, 150], // Corresponding data
        backgroundColor: ['#dbd468', '#e68a8c'], // Colors for each section
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div className='chart-land'>
      <Pie data={data} />
      <Paragraph>area: 1500ha</Paragraph>
    </div>
  )
}

// Open Farm Component
const OpenFarm = ({ visibleOpenFarm, onCancel, number = 10 }) => {
  const [visibleOpenHarvestByNumber, setVisibleOpenHarvestByNumber] =
    useState(false)
  const [isHarvestNumber, setIsHarvestNumber] = useState(false)

  return (
    <Modal
      className='open-farm-modal'
      footer={null}
      // centered
      // width={1280}
      open={visibleOpenFarm}
      onCancel={onCancel}
    >
      <Row className='content-farm-popup' justify={'center'} gutter={[24, 16]}>
        <Col md={24} lg={16}>
          <SearchPlantsTag />
          <div className='grid-item-plant'>
            {[...Array(number)].map((_, index) => (
              <ItemPlant key={index} code={index} />
            ))}
          </div>
        </Col>
        <Col className='detail-plant' md={24} lg={8}>
          <Headline>Vườn đào</Headline>
          <Divider variant='dashed' style={{ borderColor: '#7cb305' }} dashed>
            Details Farm
          </Divider>
          <div className='detail-content'>
            <div className='label-content'>
              <Paragraph>Plant name: </Paragraph>
              <SubHeading size={260} classNames='item-plant-content-name'>
                Đào Tiên Siêu Giòn
              </SubHeading>
              <Paragraph>Yield quantity: </Paragraph>
              <SubHeading size={260} classNames='item-plant-content'>
                65
              </SubHeading>
              <Paragraph>Date harvest: </Paragraph>
              <SubHeading size={260} classNames='item-plant-content'>
                30/02/2025
              </SubHeading>
            </div>
          </div>
          <PieChart />
          <div className='status-farm'>
            <Paragraph>status: </Paragraph>
            <SubHeading size={260} classNames='status-farm-content'>
              Đang trồng
            </SubHeading>
          </div>
          <FloatButton.Group
            trigger='hover'
            type='primary'
            style={{ insetInlineEnd: 84 }}
            icon={<FireOutlined />}
          >
            <div className='group-button'>
              <BaseButton
                className='item-btn-harvest'
                onClick={() => {
                  setVisibleOpenHarvestByNumber(true)
                  setIsHarvestNumber(true)
                }}
                name={'Harvest'}
              />
              <BaseButton
                onClick={() => {
                  setVisibleOpenHarvestByNumber(true)
                  setIsHarvestNumber(false)
                }}
                className='item-btn-harvest'
                name={'Harvest all'}
              />
            </div>
          </FloatButton.Group>
          <OpenHarvestNumber
            visibleOpenHarvestByNumber={visibleOpenHarvestByNumber}
            onCancel={() => setVisibleOpenHarvestByNumber(false)}
          />
        </Col>
      </Row>
    </Modal>
  )
}

// Open Harvest Number Component
const OpenHarvestNumber = ({
  visibleOpenHarvestByNumber,
  onCancel,
  isHarvestNumber,
}) => {
  return (
    <Modal
      className='open-harvest-by-number'
      footer={null}
      open={visibleOpenHarvestByNumber}
      onCancel={onCancel}
    >
      <div className='open-harvest-number'>
        <Paragraph>Harvest Now</Paragraph>
        <HarvestForm isHarvestNumber={isHarvestNumber} />
      </div>
    </Modal>
  )
}

const ItemFarmBtn = ({ title, subTitle, area, onClick }) => {
  return (
    <Col md={24} lg={12}>
      <button onClick={onClick} className='item-farm'>
        <div className='img-background'>
          <SubHeading classNames='subheading-img'>{title}</SubHeading>
        </div>
        <div className='item-content-farm'>
          <div className='sub-heading-content-farms'>
            <SubHeading>{title}</SubHeading>
            <Paragraph classNames='sub-heading-content-farm'>
              {subTitle}
            </Paragraph>
            <Paragraph classNames='sub-heading-content-farm'>
              S: {area}
            </Paragraph>
          </div>
        </div>
      </button>
    </Col>
  )
}

// Main FarmPage Component
const FarmPage = () => {
  const [visible, setVisible] = useState(false)
  const [visibleOpenFarm, setVisibleOpenFarm] = useState(false)

  // Handle creation of new farm
  const onCreate = (values) => {
    console.log('Received values of form: ', values)
    setVisible(false)
  }

  return (
    <>
      <Row className='farm-page' gutter={[24, 16]}>
        <ItemFarmBtn
          title='Vườn đào'
          subTitle='Đào Tiên Siêu Giòn'
          area='5000ha'
          onClick={() => setVisibleOpenFarm(true)}
        />
        <ItemFarmBtn
          title='Vườn đào'
          subTitle='Đào Tiên Siêu Giòn'
          area='5000ha'
          onClick={() => setVisibleOpenFarm(true)}
        />
        <ItemFarmBtn
          title='Vườn đào'
          subTitle='Đào Tiên Siêu Giòn'
          area='5000ha'
          onClick={() => setVisibleOpenFarm(true)}
        />
        <ItemFarmBtn
          title='Vườn đào'
          subTitle='Đào Tiên Siêu Giòn'
          area='5000ha'
          onClick={() => setVisibleOpenFarm(true)}
        />{' '}
        <Col md={24} lg={12}>
          <Button
            className='add-button'
            onClick={() => {
              setVisible(true)
            }}
          >
            <span className='plus-sign'>+</span>
          </Button>
        </Col>
        <FarmForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false)
          }}
          number={10}
        />
        <OpenFarm
          visibleOpenFarm={visibleOpenFarm}
          onCancel={() => setVisibleOpenFarm(false)}
        />
      </Row>
    </>
  )
}

export default FarmPage
