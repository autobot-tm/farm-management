import React, { useContext, useState } from 'react'
import { ConfigProvider, Space, Input, notification } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { css } from '@emotion/css'
import PlantForm from './PlantForm'
import { createPlant } from '../../services/apis/plant.service'
import BaseButton from '../../components/Button/BaseButton'

const PlantsCreateBtn = ({ mutate }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext)
  const rootPrefixCls = getPrefixCls()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({ type, message, description }) => {
    api.open({
      type,
      message,
      description,
      showProgress: true,
      pauseOnHover: false,
    })
  }

  const onCreate = async (values) => {
    try {
      setLoading(true)
      await createPlant(values)
      openNotification({
        type: 'success',
        message: 'Create Successful',
        description: 'You already create plant successful',
      })
      mutate()
    } catch (error) {
      openNotification({
        type: 'error',
        message: 'Create Failed',
        description: 'You failed to create it.',
      })
      console.log(error)
    } finally {
      setLoading(false)
      setTimeout(() => {
        setVisible(false)
      }, '5000')
    }
  }

  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(
        .${rootPrefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(50deg, #407f3e, #89b449);

        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `

  const inputBorderColor = css`
    &.${rootPrefixCls}-input {
      &:hover {
        border-color: #407f3e;
      }

      &:focus {
        border-color: #407f3e;
        box-shadow: 0 0 0 2px rgba(0, 90, 0, 0.2);
      }
    }
  `

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#407f3e',
          },
          components: {
            Button: {
              className: linearGradientButton,
            },
            Input: {
              className: inputBorderColor,
            },
          },
        }}
      >
        <Space>
          <BaseButton
            type='primary'
            onClick={() => setVisible(true)}
            icon={<PlusCircleOutlined />}
          >
            Create Plant
          </BaseButton>
        </Space>
        <PlantForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => setVisible(false)}
          isLoading={loading}
        />
      </ConfigProvider>
    </>
  )
}

export default PlantsCreateBtn
