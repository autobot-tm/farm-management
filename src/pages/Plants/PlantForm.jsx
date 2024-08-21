import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, InputNumber, Select } from 'antd'
import './styleform.scss'
import { fetchPlantTypeService } from '../../services/apis/plant.service'

const PlantForm = ({ visible, onCreate, onCancel, isLoading }) => {
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
      width={570}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          selling_date: null,
          vegetative_stage_date: null,
          flowering_stage_date: null,
          fruiting_stage_date: null,
          area: null,
          expected_yield: null,
          price: null,
          type_plant_id: null,
        }}
      >
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input placeholder='Enter name&#39;s plant' />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder='Enter description&#39;s plant'
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
            />
          </Form.Item>
        </div>

        <div className='input-number'>
          <Form.Item name='selling_day' label='Seedling Phase'>
            <InputNumber
              type='number'
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Enter the number of days'
            />
          </Form.Item>
          <Form.Item name='vegetative_stage_day' label='Vegetative Phase'>
            <InputNumber
              type='number'
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Enter the number of days'
            />
          </Form.Item>

          <Form.Item name='flowering_stage_day' label='Flowering Phase'>
            <InputNumber
              type='number'
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Enter the number of days'
            />
          </Form.Item>

          <Form.Item name='fruiting_stage_day' label='Fruiting Phase'>
            <InputNumber
              type='number'
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: '100%' }}
              onChange={handleNumberChange}
              placeholder='Enter the number of days'
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
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default PlantForm
