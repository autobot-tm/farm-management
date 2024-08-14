import { Button, Menu } from 'antd'
import {
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
// import { useDispatch, useSelector } from 'react-redux'
// import { useAuthSlice } from '../../../store/slices/auth.slice.js'
// const { Header } = Layout

const MainUser = () => {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const { role } = useSelector((state) => state.auth)
  // const { actions: authActions } = useAuthSlice()
  const onItemClick = (event) => {
    const { key } = event

    if (key === 'logout') {
      const confirmLogout = window.confirm('Do you want logout?')
      if (confirmLogout) {
        dispatch(authActions.signOut())
      }
      return
    }
    navigate(key)
  }

  const items = [
    {
      key: 'SubMenu',
      label: (
        <Button
          type='text'
          icon={<UserOutlined />}
          size='large'
          style={{ color: 'white' }}
        >
          {/* {role} */}
          ADMIN
        </Button>
      ),
      children: [
        {
          label: <span>Profile</span>,
          icon: <EyeOutlined />,
          key: '/user-info',
        },
        {
          label: <span>Edit User</span>,
          icon: <EditOutlined />,
          key: '/user-info/update',
        },
        {
          label: <span>Change Password</span>,
          icon: <LockOutlined />,
          key: '/user-info/change-password',
        },
        {
          label: <span>Sign Out</span>,
          icon: <LogoutOutlined />,
          key: 'logout',
        },
      ],
    },
  ]
  return (
    <div className='main-user'>
      <Menu
        theme='dark'
        items={items}
        onClick={onItemClick}
        inlineCollapsed={false}
        disabledOverflow={true}
      />
    </div>
  )
}

export default MainUser
