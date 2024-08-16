import React from 'react'
import { Button } from 'antd'
import './styles.scss'

const BaseButton = ({ name, type, htmlType }) => {
  return (
    <Button type={type} className='base-btn' htmlType={htmlType}>
      {name}
    </Button>
  )
}

export default BaseButton
