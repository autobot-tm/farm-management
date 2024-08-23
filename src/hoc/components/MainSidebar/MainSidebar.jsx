import { Layout, Menu } from "antd";
import "./styles.scss";
import { DashboardOutlined, UnorderedListOutlined, BorderInnerOutlined, DatabaseOutlined } from "@ant-design/icons";
const { Sider } = Layout;
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import LOGO from "../../../assets/icons/icons8-avocado-94.png";
import MainUser from "../MainUser/MainUserProfile";

const menuItems = [
  {
    icon: <DashboardOutlined />,
    path: "/",
    label: "Dashboard",
    key: "dashboard",
  },
  {
    icon: <UnorderedListOutlined />,
    path: "/plants",
    label: "Plants",
    key: "plants",
  },
  {
    icon: <BorderInnerOutlined />,
    path: "/farms",
    label: "Farm",
    key: "farms",
  },
  {
    icon: <DatabaseOutlined />,
    path: "/harvests",
    label: "Harvest",
    key: "harvests",
  },
];
const MainSidebar = () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      className="container-sider"
      style={{
        margin: "auto",
      }}
    >
      <Logo />
      <MenuSidebar />
      <MainUser />
    </Sider>
  );
};

const Logo = () => {
  return (
    <Link to={"/"} className="container-logo">
      <img src={LOGO} alt="logo-icon" />
    </Link>
  );
};
const MenuSidebar = () => {
  const location = useLocation();
  const getSelectedKeys = (pathname) => {
    const currentMenuItem = menuItems.find(({ path }) => pathname.includes(path));
    return currentMenuItem ? [currentMenuItem.key] : [];
  };
  const selectedKeys = getSelectedKeys(location.pathname);
  return (
    <div className="container-menu">
      <Menu theme="dark" mode="inline" defaultSelectedKeys={selectedKeys} defaultOpenKeys={selectedKeys} activeKey={selectedKeys}>
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};
export default MainSidebar;
