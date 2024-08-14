import { Layout, Menu } from 'antd'
import './styles.scss'
import { DashboardOutlined } from '@ant-design/icons'
const { Sider } = Layout
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import LOGO from '../../../assets/images/logo.svg'

const menuItems = [
  {
    icon: <DashboardOutlined />,
    path: '/',
    label: 'Dashboard',
    key: 'dashboard',
  },
]
const MainSidebar = () => {
  return (
    <Sider breakpoint='lg' collapsedWidth='0' className='container-sider'>
      <Logo />
      <MenuSidebar />
    </Sider>
  )
}

const Logo = () => {
  return (
    <Link to={'/'} className='container-logo'>
      {/* <img src={LOGO} alt='logo-img' /> */}
    </Link>
  )
}
const MenuSidebar = () => {
  const location = useLocation()
  const getSelectedKeys = (pathname) => {
    const currentMenuItem = menuItems.find(({ path }) =>
      pathname.includes(path)
    )
    return currentMenuItem ? [currentMenuItem.key] : []
  }
  const selectedKeys = getSelectedKeys(location.pathname)
  return (
    <div className='container-menu'>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={selectedKeys}
        activeKey={selectedKeys}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}
export default MainSidebar
