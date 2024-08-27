import React, { Fragment, useEffect, useState } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  FloatButton,
  Dropdown,
  Divider,
  Row,
  Col,
  Alert,
  Spin,
  Popconfirm,
  notification,
  Space,
} from 'antd'
import {
  SubHeading,
  Paragraph,
  Headline,
  Caption,
} from '../../components/Typography'
import BaseButton from '../../components/Button/BaseButton'
import {
  FireOutlined,
  PlusOutlined,
  RadiusSettingOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import HarvestForm from '../../components/HarvestForm/FormHarver'
import './styles.scss'
import {
  createFarmService,
  deleteFarmService,
  editFarmService,
  editPlantToFarmService,
  getAllFarmService,
  getFarmByIdService,
  getPlantsOnFarmByIdService,
  getPlantsToFarmByType,
} from '../../services/apis/farm.service'
import useSWR from 'swr'
import { ICON_MAPPING, TYPE_MAPPING } from '../../utils/icon-mapping'
import { createAllHarvestsService } from '../../services/apis/harvest.service'

ChartJS.register(ArcElement, Tooltip, Legend)

// Farm Form Component
const FarmForm = ({ visible, onCreate, onCancel, farm, isLoading }) => {
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
      okText={isLoading ? 'Submitting..' : 'Submit'}
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          name: farm?.name,
          status: farm?.status,
          area: farm?.area,
          description: farm?.description,
        }}
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input defaultValue={farm?.name} />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input defaultValue={farm?.description} />
        </Form.Item>
        <Form.Item
          name='area'
          label='Area'
          rules={[{ required: true, message: 'Please input the area!' }]}
        >
          <Input type='number' min={0} defaultValue={farm?.area} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

// Item Plant Component
const ItemPlant = ({ code, type, status }) => (
  <div className='item-plant'>
    <div className='status'>{status}</div>
    <img src={ICON_MAPPING[type]} alt={`Plant ${code}`} />{' '}
    {/* Placeholder for plant icon */}
    <Tag color='green'>{code}</Tag>
  </div>
)

// Search Plants Tag Component
const SearchPlantsTag = ({
  farmId,
  mutatePlantOnFarm,
  mutate,
  type,
  handleGetPlants,
}) => {
  const [plants, setPlants] = useState([])
  const [typePlant, setTypePlant] = useState(null)
  const [checkedPlant, setCheckedPlant] = useState([])
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({ type, message, description }) => {
    api.open({
      type,
      message,
      description,
      showProgress: true,
      pauseOnHover: false,
      duration: 2,
    })
  }

  const TYPE_PLANT = TYPE_MAPPING[type]

  const opTypePlants = [
    {
      value: 'STR',
      label: 'Strawberry',
    },
    {
      value: 'WAT',
      label: 'Watermelon',
    },
    {
      value: 'AVO',
      label: 'Avocado',
    },
    {
      value: 'DUR',
      label: 'Durian',
    },
    {
      value: 'DRA',
      label: 'Dragonfruit',
    },
  ]

  const renderPlantByType = async () => {
    try {
      const response = await getPlantsToFarmByType({
        typePlantId: TYPE_PLANT ? TYPE_PLANT : typePlant,
      })
      const plantsData = response.data.data.results
      console.log(plantsData)

      const plantOptions = plantsData?.map((plant) => ({
        label: plant.name, // The name of the plant
        value: plant.id, // The ID of the plant
      }))
      setPlants(plantsData ? plantOptions : null)
    } catch (error) {
      setPlants(error.data)
      console.log(error)
    }
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
    setCheckedPlant(value)
  }

  const handleAddPlantToFarm = async () => {
    try {
      if (checkedPlant) {
        setLoading(true)
        await editPlantToFarmService({
          farm_id: farmId,
          plant_id_list: checkedPlant,
        })
        mutatePlantOnFarm()
        handleGetPlants(farmId)
        // mutate()
      }
    } catch (error) {
      console.log(error)
      openNotification({
        type: 'error',
        message: 'Create Failed',
        description: error.response.data.message_vn,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (typePlant || TYPE_PLANT) {
      renderPlantByType()
    }
  }, [typePlant, TYPE_PLANT])

  const items2 = [
    {
      key: '1',
      label: (
        <div onClick={(e) => e.stopPropagation()}>
          <Paragraph>Select your plants</Paragraph>
          <div className='item-dropdown'>
            {TYPE_PLANT ? (
              ''
            ) : (
              <Select
                style={{ width: 250 }}
                options={opTypePlants}
                placeholder='Please select type plants'
                onChange={(e) => setTypePlant(e)}
              />
            )}

            <Select
              mode='multiple'
              style={{
                width: 250,
              }}
              placeholder='Please select plants'
              onChange={handleChange}
              options={plants}
            />
            <Button
              style={{ background: 'white' }}
              icon={loading ? <SyncOutlined spin /> : <PlusOutlined />}
              onClick={handleAddPlantToFarm}
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <Space direction='vertical' className='input-filter-plants-farm'>
      {contextHolder}
      <Space wrap>
        <Dropdown menu={{ items: items2 }} placement='bottom' arrow>
          <Button type='primary' size='large' icon={<PlusOutlined />} />
        </Dropdown>
      </Space>
    </Space>
  )
}

// Pie Chart Component
const PieChart = ({ area, areaPlanted }) => {
  const op = area - areaPlanted
  const data = {
    labels: ['Used land', 'Unused'], // Data labels
    datasets: [
      {
        label: 'Datasets Using Land',
        data: [areaPlanted, op], // Corresponding data
        backgroundColor: ['#dbd468', '#e68a8c'], // Colors for each section
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div className='chart-land'>
      <Pie data={data} />
      <Paragraph>
        <RadiusSettingOutlined /> {area}m²
      </Paragraph>
    </div>
  )
}

// Open Farm Component
const OpenFarm = ({
  visibleOpenFarm,
  onCancel,
  number = 3,
  plantsOnFarm,
  handleGetPlants,
  mutate,
}) => {
  const [visibleOpenHarvestByNumber, setVisibleOpenHarvestByNumber] =
    useState(false)
  const [isHarvestNumber, setIsHarvestNumber] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const [plants, setPlants] = useState([])
  const [loadingFetch, setLoadingFetch] = useState(false)

  const openNotification = ({ type, message, description }) => {
    api.open({
      type,
      message,
      description,
      showProgress: true,
      pauseOnHover: false,
    })
  }

  const onEdit = async (values) => {
    console.log(values)
    const params = {
      ...values,
      status: plantsOnFarm.status.toUpperCase(),
      id: plantsOnFarm.id,
    }

    try {
      setLoading(true)
      await editFarmService(params)
      handleGetPlants(plantsOnFarm.id)
      openNotification({
        type: 'success',
        message: 'Edit Successful',
        description: 'You already edit farm successful',
      })
    } catch (error) {
      openNotification({
        type: 'error',
        message: 'Edit failed',
        description: error.response.data.message_vn,
      })
      console.log(error)
    } finally {
      setLoading(false)
      setVisible(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteFarmService({ id: plantsOnFarm.id })
      mutate()
      openNotification({
        type: 'success',
        message: 'Delete Successful',
        description: 'You already delete farm successful',
      })
    } catch (error) {
      openNotification({
        type: 'error',
        message: 'Delete Failed',
        description: error.response.data.message_vn,
      })
      console.log(error)
    } finally {
      setVisible(false)
      onCancel()
    }
  }

  const fetchPlantsOnFarmDetail = async () => {
    try {
      setLoadingFetch(true)
      const response = await getPlantsOnFarmByIdService({
        id: plantsOnFarm?.id,
      })
      setPlants(response.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingFetch(false)
    }
  }

  useEffect(() => {
    if (plantsOnFarm?.id) {
      fetchPlantsOnFarmDetail()
    }
  }, [plantsOnFarm?.id, visibleOpenFarm])

  if (loadingFetch)
    return (
      <div className='loading-container'>
        <Spin />
      </div>
    )

  if (!plantsOnFarm) return <></>

  return (
    <>
      {contextHolder}
      <Modal
        className='open-farm-modal'
        footer={null}
        // centered
        // width={1280}
        open={visibleOpenFarm}
        onCancel={onCancel}
      >
        <Row
          className='content-farm-popup'
          justify={'center'}
          gutter={[24, 16]}
        >
          <Col md={24} lg={16}>
            <SearchPlantsTag
              farmId={plantsOnFarm?.id}
              mutatePlantOnFarm={fetchPlantsOnFarmDetail}
              handleGetPlants={handleGetPlants}
              mutate={mutate}
              type={plantsOnFarm?.type_plant_name}
            />
            <div className='grid-item-plant'>
              {plants?.map((item, index) => (
                <ItemPlant
                  key={index}
                  code={index}
                  type={item?.type_plant_id}
                  status={item?.status_name}
                />
              ))}
            </div>
          </Col>
          <Col className='detail-plant' md={24} lg={8}>
            <Headline style={{ textAlign: 'center' }} strong>
              {plantsOnFarm.name}
            </Headline>
            <Divider variant='dashed' style={{ borderColor: '#7cb305' }} dashed>
              Details Farm
            </Divider>
            <div className='detail-content'>
              <div className='label-content'>
                <Paragraph>Description: </Paragraph>
                <Caption>{plantsOnFarm.description}</Caption>
                <Paragraph>Yield quantity: </Paragraph>
                <SubHeading size={260} classNames='item-plant-content'>
                  {plantsOnFarm.harvestable_plant_count || 'Not yet'}
                </SubHeading>
                <Paragraph>Date harvest: </Paragraph>
                <SubHeading size={260} classNames='item-plant-content'>
                  {new Date(plantsOnFarm.date_harvest)
                    .toISOString()
                    .split('T')[0] || 'Not yet'}
                </SubHeading>
              </div>
            </div>
            <PieChart
              areaPlanted={plantsOnFarm.area_planted}
              area={plantsOnFarm.area}
            />
            <div className='status-farm'>
              <Paragraph>Status: </Paragraph>
              <SubHeading size={260} classNames='status-farm-content'>
                {plantsOnFarm.status}
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
                  onClick={() => alert('comming soon')}
                  // onClick={() => {
                  //   setVisibleOpenHarvestByNumber(true)
                  //   setIsHarvestNumber(true)
                  // }}
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
              farmId={plantsOnFarm?.id}
              handleGetPlants={handleGetPlants}
            />
          </Col>
          <Col lg={24} className='button-container'>
            <BaseButton
              backgroundColor='#e68a8c'
              type={'text'}
              name={'Edit'}
              onClick={() => setVisible(true)}
            />
            <Popconfirm
              title='Are you sure you want to delete this farm?'
              onConfirm={handleDelete}
              okText='Yes'
              cancelText='No'
            >
              <BaseButton
                name={'Delete'}
                style={{ color: 'black' }}
                type={'text'}
              />
            </Popconfirm>
          </Col>
        </Row>
      </Modal>
      <FarmForm
        visible={visible}
        onCreate={onEdit}
        onCancel={() => setVisible(false)}
        isLoading={loading}
        farm={plantsOnFarm}
      />
    </>
  )
}

// Open Harvest Number Component
const OpenHarvestNumber = ({
  visibleOpenHarvestByNumber,
  onCancel,
  isHarvestNumber,
  farmId,
  handleGetPlants,
}) => {
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({ type, message, description }) => {
    api.open({
      type,
      message,
      description,
      showProgress: true,
      pauseOnHover: false,
      duration: 2,
    })
  }
  const submitForm = async ({ description, yield_actual, price_actual }) => {
    try {
      setLoading(true)
      await createAllHarvestsService({
        farm_id: farmId,
        description,
        yield_actual,
        price_actual,
      })
      handleGetPlants()
      onCancel()
      openNotification({
        type: 'success',
        message: 'Harvest Successful',
        description: 'You already harvest successful',
      })
    } catch (error) {
      console.log(error)
      openNotification({
        type: 'error',
        message: 'Harvest Failed',
        description: error.response.data.message_vn,
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal
      className='open-harvest-by-number'
      footer={null}
      open={visibleOpenHarvestByNumber}
      onCancel={onCancel}
    >
      {contextHolder}
      <div className='open-harvest-number'>
        <HarvestForm
          isHarvestNumber={isHarvestNumber}
          onCreate={submitForm}
          loading={loading}
        />
      </div>
    </Modal>
  )
}

const ItemFarmBtn = ({ title, area, onClick, status, id }) => {
  return (
    <Col md={24} lg={12}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClick(id)
        }}
        className='item-farm'
      >
        <div className='img-background'>
          <SubHeading classNames='subheading-img' size={260}>
            {status === 'Active' ? 'Hoạt động' : 'Bỏ hoang'}
          </SubHeading>
        </div>
        <div className='item-content-farm'>
          <div className='sub-heading-content-farms'>
            <SubHeading size={260}>{title}</SubHeading>
            <Paragraph classNames='sub-heading-content-farm'>
              <RadiusSettingOutlined /> {area}m²
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
  const [plantsOnFarm, setPlantsOnFarm] = useState(null)

  const handleGetPlants = async (id) => {
    try {
      const response = await getFarmByIdService({ id })
      setPlantsOnFarm(response.data.data)
      setVisibleOpenFarm(true) // Open the modal once data is fetched
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAllFarms = async () => {
    try {
      const response = await getAllFarmService()
      return response.data.data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const {
    data: farms,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/getAllFarms', fetchAllFarms)

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
        description='Failed to fetch farms.'
        type='error'
        showIcon
      />
    )
  }

  // Handle creation of new farm
  const onCreate = async (values) => {
    console.log('Received values of form: ', values)
    setVisible(false)
    try {
      await createFarmService(values)
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Row className='farm-page' gutter={[24, 16]}>
        {farms?.map((item) => (
          <Fragment key={item.id}>
            <ItemFarmBtn
              id={item.id}
              title={item.name}
              area={item.area}
              status={item.status}
              onClick={handleGetPlants}
            />
          </Fragment>
        ))}

        <Col md={24} lg={12}>
          <Button className='add-button' onClick={() => setVisible(true)}>
            <span className='plus-sign'>+</span>
          </Button>
        </Col>

        <FarmForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => setVisible(false)}
        />

        <OpenFarm
          plantsOnFarm={plantsOnFarm}
          visibleOpenFarm={visibleOpenFarm}
          onCancel={() => setVisibleOpenFarm(false)}
          handleGetPlants={handleGetPlants}
          mutate={mutate}
        />
      </Row>
    </>
  )
}

export default FarmPage
