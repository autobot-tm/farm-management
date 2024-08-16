import React, { useState } from 'react'
import './styles.scss'
import { Flex, Form, Input, Typography } from 'antd'
import { BaseButton } from '../../components/Button'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import STRAWBERRY from '../../assets/icons/icons8-fruit-94.png'
import { updateProfileService } from '../../services/apis/user.service'

const EditForm = ({ setOption }) => {
  const [loading, setLoading] = useState(false)
  const handleUpdateProfile = async (values) => {
    console.log(values)
    try {
      setLoading(true)
      await updateProfileService(values)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='user-profile-edit'>
      <img src={STRAWBERRY} alt='icon' className='strawberry' />
      <span className='title'>
        <i className='back-btn' onClick={() => setOption(1)}>
          <ArrowLeftOutlined />
        </i>
        <span>EDIT</span>
      </span>
      <Form name='basic' onFinish={handleUpdateProfile} autoComplete='off'>
        <Flex vertical className='user-profile-edit-form'>
          <Typography.Title level={5}>First Name</Typography.Title>
          <Form.Item
            name='first_name'
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}
          >
            <Input placeholder='Enter your first name' />
          </Form.Item>

          <Typography.Title level={5}>Last Name</Typography.Title>
          <Form.Item
            name='last_name'
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
          >
            <Input placeholder='Enter your last name' />
          </Form.Item>

          <Typography.Title level={5}>Phone</Typography.Title>
          <Form.Item
            name='phone'
            rules={[
              {
                required: true,
                message: 'Please input your phone!',
              },
            ]}
          >
            <Input placeholder='Enter your phone' />
          </Form.Item>

          <Typography.Title level={5}>Location</Typography.Title>
          <Form.Item
            name='location'
            rules={[
              {
                required: true,
                message: 'Please input your location!',
              },
            ]}
          >
            <Input placeholder='Enter your location' />
          </Form.Item>

          <BaseButton
            name={loading ? 'Saving..' : 'Save'}
            type={'text'}
            htmlType={'submit'}
          />
        </Flex>
      </Form>
    </div>
  )
}

const Profile = ({ setOption }) => {
  return (
    <div className='user-profile'>
      <span>
        <img
          src='https://avatar.iran.liara.run/public/10'
          alt='avatar'
          className='avatar'
        />
        <h2>Hi, Admin</h2>
        admin@gmail.com
      </span>
      <span onClick={() => setOption(2)} className='edit-btn'>
        Edit <EditOutlined />
      </span>
    </div>
  )
}

const UserProfile = () => {
  const [option, setOption] = useState(1)
  return (
    <div id='user-profile-page'>
      <div className='banner-profile'></div>
      <img
        src='https://img.freepik.com/free-vector/green-grass-white-background_1308-74063.jpg?w=2000&t=st=1723775462~exp=1723776062~hmac=7af1bcf072b565af7c79836830301c1506be0def1e06bb833cb7906131a7c75a'
        alt=''
        className='grass-bg'
      />
      {option === 1 ? (
        <Profile setOption={setOption} />
      ) : (
        <EditForm setOption={setOption} />
      )}
    </div>
  )
}

export default UserProfile
