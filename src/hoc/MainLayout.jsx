import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./styles.scss";
import MainSidebar from "./components/MainSidebar/MainSidebar";
const { Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <>
      <Layout className="container-layout">
        <MainSidebar />
        <Layout>
          <Content className="container-content-layout">
            <div className="content-layout">
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Farm ©2024 Created by Like Lion
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
