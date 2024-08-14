import { Button, Layout, Menu } from 'antd'
import {
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { useAuthSlice } from '../../../store/slices/auth.slice.js'
const { Header } = Layout

const MainHeader = () => {
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
    <Header
      style={{
        padding: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Menu
          theme='dark'
          mode='horizontal'
          items={items}
          onClick={onItemClick}
          inlineCollapsed={false}
          disabledOverflow={true}
        />
      </div>
    </Header>
  )
}

export default MainHeader
