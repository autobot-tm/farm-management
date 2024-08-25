import { Modal, notification, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
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
import PlantForm from '../../pages/Plants/PlantForm'
import {
  deletePlant,
  getPlantDetailById,
  updatePlant,
} from '../../services/apis/plant.service'

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

const PlantsDetailModal = ({ isOpen, onClose, id, mutate }) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { styles } = useStyle()
  const [plant, setPlant] = useState(null)
  const [api, contextHolder] = notification.useNotification()
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
  const openNotification = ({ type, message, description }) => {
    api.open({
      type,
      message,
      description,
      showProgress: true,
      pauseOnHover: false,
    })
  }
  const handleEdit = async (values) => {
    try {
      let params = { ...values, id }
      setLoading(true)
      await updatePlant(params)
      handleDetailPlant()
      openNotification({
        type: 'success',
        message: 'Edit Successful',
        description: 'You already edit plant successful',
      })
      mutate()
    } catch (error) {
      openNotification({
        type: 'error',
        message: 'Edit Failed',
        description: 'You failed to edit it.',
      })
      console.log(error)
    } finally {
      setLoading(false)
      setVisible(false)
    }
  }
  const handleDelete = async () => {
    try {
      await deletePlant({ id })
      openNotification({
        type: 'success',
        message: 'Delete Successful',
        description: 'You already delete plant successful',
      })
      mutate()
    } catch (error) {
      openNotification({
        type: 'error',
        message: 'Delete Failed',
        description: 'You failed to delete it.',
      })
      console.log(error)
    } finally {
      setTimeout(() => {
        onClose()
      }, '5000')
    }
  }
  const handleDetailPlant = async () => {
    try {
      const response = await getPlantDetailById({ id })
      setPlant(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (isOpen) {
      handleDetailPlant()
    }
  }, [isOpen])

  if (!plant) return <></>
  return (
    <>
      {contextHolder}
      <Modal
        title='Plant detail'
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        width={1200}
        footer={
          <>
            <BaseButton
              name={'Edit'}
              backgroundColor='#e68a8c'
              type={'text'}
              onClick={() => setVisible(true)}
            />
            <Popconfirm
              title='Are you sure you want to delete this plant?'
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
          </>
        }
        classNames={classNames}
        styles={modalStyles}
      >
        <Plant plant={plant} />
      </Modal>
      <PlantForm
        id={id}
        visible={visible}
        onCreate={handleEdit}
        onCancel={() => setVisible(false)}
        isLoading={loading}
        plant={plant}
      />
    </>
  )
}

export default PlantsDetailModal

const Plant = ({ plant }) => {
  return (
    <>
      <div className='info-plant'>
        <section className='info-plant-description'>
          <Caption>
            <CaretUpOutlined style={{ color: 'green' }} />
            {plant.yield} kg
          </Caption>
          <Headline size={520}>{plant.name}</Headline>
          <SubHeading classNames='d-block price'>
            {formatCustomCurrency(plant.price)}/kg | {plant.area}m²
          </SubHeading>
          <Paragraph classNames='color-text-secondary'>
            {plant.description}
          </Paragraph>
        </section>

        <figure className='info-plant-icon'>
          <img src={ICON_MAPPING[plant.type_plant_id]} alt='fruit icon' />
        </figure>
      </div>
      <SubHeading>Estimated number of days</SubHeading>
      <section className='stage-date'>
        <SubHeading classNames='stage hr' size={260}>
          {plant.seedling_day}
          <Caption classNames='d-block'>developmental</Caption>
        </SubHeading>
        <SubHeading classNames='stage hr' size={260}>
          {plant.vegetative_stage_day}
          <Caption classNames='d-block'>vegetative</Caption>
        </SubHeading>
        <SubHeading classNames='stage hr' size={260}>
          {plant.flowering_stage_day}
          <Caption classNames='d-block'>flowering</Caption>
        </SubHeading>
        <SubHeading classNames='stage' size={260}>
          {plant.fruiting_stage_day}
          <Caption classNames='d-block'>fruiting</Caption>
        </SubHeading>
      </section>
    </>
  )
}
