import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, InputNumber, Select } from 'antd'
import './styleform.scss'
import { fetchPlantTypeService } from '../../services/apis/plant.service'

const PlantForm = ({ visible, onCreate, onCancel, isLoading, plant }) => {
  const [form] = Form.useForm()
  const [plantTypes, setPlantTypes] = useState([])

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

  const fetchPlantType = async () => {
    try {
      const response = await fetchPlantTypeService()
      setPlantTypes(response?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (visible) {
      fetchPlantType()
    }
  }, [visible])

  const numberFormatter = (value) =>
    value ? String(value).replace(/[^0-9.]/g, '') : ''

  const numberParser = (value) => value.replace(/[^0-9.]/g, '')

  const handleNumberChange = (value) => {
    return !isNaN(value) || value === '' ? value : ''
  }

  return (
    <Modal
      visible={visible}
      title='Plant Information'
      okText={isLoading ? 'Submitting..' : 'Submit'}
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={handleOk}
      width={680}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          name: plant?.name || null,
          description: plant?.description || null,
          seedling_day: plant?.seedling_day || null,
          vegetative_stage_day: plant?.vegetative_stage_day || null,
          flowering_stage_day: plant?.flowering_stage_day || null,
          fruiting_stage_day: plant?.fruiting_stage_day || null,
          area: plant?.area || null,
          expected_yield: plant?.expected_yield || null,
          price: plant?.price || null,
          type_plant_id: plant?.type_plant_id || null,
        }}
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input
            placeholder='Enter name&#39;s plant'
            defaultValue={plant?.name}
          />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder='Enter description&#39;s plant'
            defaultValue={plant?.description}
          />
        </Form.Item>
        <div className='select-date'>
          <Form.Item
            name='type_plant_id'
            label='Type Plant'
            rules={[
              { required: true, message: 'Please input the type plant!' },
            ]}
          >
            <Select placeholder="Select type's plant" loading={isLoading}>
              {plantTypes?.map((type) => (
                <Select.Option key={type?.id} value={type?.id}>
                  {type?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='area'
            label='Area'
            rules={[{ required: true, message: 'Please input the area!' }]}
          >
            <InputNumber
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Select area&#39;s plant'
              defaultValue={plant?.area}
            />
          </Form.Item>
        </div>

        <div className='input-number'>
          <Form.Item
            name='seedling_day'
            label='Seedling Phase'
            rules={[{ required: true, message: 'Please input seedling!' }]}
          >
            <InputNumber
              type='number'
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Enter the number of days'
              defaultValue={plant?.seedling_day}
            />
          </Form.Item>
          <Form.Item
            name='vegetative_stage_day'
            label='Vegetative Phase'
            rules={[{ required: true, message: 'Please input vegetative!' }]}
          >
            <InputNumber
              type='number'
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Enter the number of days'
              defaultValue={plant?.vegetative_stage_day}
            />
          </Form.Item>

          <Form.Item
            name='flowering_stage_day'
            label='Flowering Phase'
            rules={[{ required: true, message: 'Please input flowering!' }]}
          >
            <InputNumber
              type='number'
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Enter the number of days'
              defaultValue={plant?.flowering_stage_day}
            />
          </Form.Item>

          <Form.Item
            name='fruiting_stage_day'
            label='Fruiting Phase'
            rules={[{ required: true, message: 'Please input fruiting!' }]}
          >
            <InputNumber
              type='number'
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Enter the number of days'
              defaultValue={plant?.fruiting_stage_day}
            />
          </Form.Item>
        </div>

        <div className='select-farm'>
          <Form.Item
            name='expected_yield'
            label='Expected Yield'
            rules={[
              { required: true, message: 'Please input the expected yield!' },
            ]}
          >
            <InputNumber
              type='number'
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Enter expected yield'
              defaultValue={plant?.expected_yield}
            />
          </Form.Item>

          <Form.Item
            name='price'
            label='Price'
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber
              type='number'
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Enter price&#39;s plant'
              defaultValue={plant?.price}
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default PlantForm
