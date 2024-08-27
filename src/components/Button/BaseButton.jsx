import React from 'react'
import { Button } from 'antd'
import './styles.scss'

const BaseButton = ({
  name,
  type,
  backgroundColor,
  htmlType,
  disabled,
  loading,
  ...props
}) => {
  return (
    <Button
      type={type}
      className='base-btn'
      htmlType={htmlType}
      disabled={disabled}
      loading={disabled}
      style={{ backgroundColor }}
      {...props}
      size='large'
    >
      {name}
    </Button>
  )
}

export default BaseButton
