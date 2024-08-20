import { Modal } from 'antd'
import React from 'react'
import { createStyles, useTheme } from 'antd-style'
import './styles.scss'
import { CaretUpOutlined } from '@ant-design/icons'
import BaseButton from '../Button/BaseButton'
import ICON_MAPPING from '../../utils/icon-mapping'
import { Caption } from '../Typography/Caption/Caption'
import { Headline } from '../Typography/Headline/Headline'
import { Paragraph } from '../Typography/Paragraph/Paragraph'
import { SubHeading } from '../Typography/SubHeading/SubHeading'
import { formatCustomCurrency } from '../../utils/number-seperator'

const useStyle = createStyles(({ token }) => ({
  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
  'my-modal-header': {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  'my-modal-footer': {
    color: token.colorPrimary,
  },
  'my-modal-content': {
    border: '1px solid #333',
  },
}))

const PlantsDetailModal = ({ isOpen, onClose, id }) => {
  console.log(id)
  const { styles } = useStyle()
  const token = useTheme()
  const classNames = {
    body: styles['my-modal-body'],
    mask: styles['my-modal-mask'],
    header: styles['my-modal-header'],
    footer: styles['my-modal-footer'],
    content: styles['my-modal-content'],
  }
  const modalStyles = {
    header: {
      borderLeft: `5px solid ${token.colorPrimary}`,
      borderRadius: 0,
      paddingInlineStart: 5,
      backgroundColor: '#e9e9eb',
    },
    // body: {
    //   boxShadow: 'inset 0 0 5px #999',
    //   borderRadius: 5,
    // },
    mask: {
      backdropFilter: 'blur(2px)',
      backgroundColor: 'rgba(red, green, blue, 0.7)',
    },
    footer: {
      // borderTop: '0.2px solid #333',
      paddingTop: '10px',
    },
    content: {
      boxShadow: '0 0 30px #999',
      backgroundColor: '#e9e9eb',
    },
  }
  //   if (!id) return <></>
  return (
    <>
      <Modal
        title='Plant detail'
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={1200}
        footer={
          <BaseButton name={'Edit'} backgroundColor='#e68a8c' type={'text'} />
        }
        classNames={classNames}
        styles={modalStyles}
      >
        <Plant />
      </Modal>
    </>
  )
}

export default PlantsDetailModal

const Plant = () => {
  return (
    <>
      <div className='info-plant'>
        <section className='info-plant-description'>
          <Caption>
            <CaretUpOutlined style={{ color: 'green' }} />
            932,8 ngàn tấn
          </Caption>
          <Headline size={520}>STRAWBERRY</Headline>
          <SubHeading classNames='d-block price'>
            {formatCustomCurrency(230000)}/kg | 50m²
          </SubHeading>
          <Paragraph classNames='color-text-secondary'>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Enim quam ut
            viverra quisque porttitor sodales. Finibus finibus urna egestas
            placerat neque, mauris ad accumsan. Litora vestibulum lobortis
            dictumst eros elit blandit consequat dis nulla?
          </Paragraph>
        </section>

        <figure className='info-plant-icon'>
          <img src={ICON_MAPPING['strawberry_fruit']} alt='dau' />
        </figure>
      </div>
      <SubHeading>Estimated number of days</SubHeading>
      <section className='stage-date'>
        <SubHeading classNames='stage hr' size={260}>
          8<Caption classNames='d-block'>developmental</Caption>
        </SubHeading>
        <SubHeading classNames='stage hr' size={260}>
          22<Caption classNames='d-block'>vegetative</Caption>
        </SubHeading>
        <SubHeading classNames='stage hr' size={260}>
          33<Caption classNames='d-block'>flowering</Caption>
        </SubHeading>
        <SubHeading classNames='stage' size={260}>
          44<Caption classNames='d-block'>fruiting</Caption>
        </SubHeading>
      </section>
    </>
  )
}
