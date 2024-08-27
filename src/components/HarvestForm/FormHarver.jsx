import React from 'react'
import { Button, Form, Input, InputNumber } from 'antd'
import BaseButton from '../Button/BaseButton'

const HarvestForm = ({ onCreate, isHarvestNumber, loading }) => {
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

  const numberFormatter = (value) =>
    value ? String(value).replace(/[^0-9]/g, '') : ''
  const numberParser = (value) => value.replace(/[^0-9]/g, '')

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleOk}
      style={{ textAlign: 'center' }}
    >
      {/* Use isHarvestNumber to conditionally render the Quantity field */}
      {isHarvestNumber && (
        <Form.Item
          name='quantity'
          label='Quantity'
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <InputNumber
            type='number'
            formatter={numberFormatter}
            parser={numberParser}
            min={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      <Form.Item
        type='number'
        name='yield_actual'
        label='Total Yield Actual'
        rules={[
          { required: true, message: 'Please input the total yield actual!' },
        ]}
      >
        <InputNumber
          formatter={numberFormatter}
          parser={numberParser}
          min={0}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        type='number'
        name='price_actual'
        label='Total Price Actual'
        rules={[
          { required: true, message: 'Please input the total price actual!' },
        ]}
      >
        <InputNumber
          formatter={numberFormatter}
          parser={numberParser}
          min={0}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        name='description'
        label='Description'
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <BaseButton
        backgroundColor={'#e68a8c'}
        name={loading ? 'Harvestting..' : 'Harvest all'}
        type={'text'}
        htmlType={'submit'}
      />
    </Form>
  )
}

export default HarvestForm
