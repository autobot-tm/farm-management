import React, { useEffect, useState } from "react";
import "./styles.scss";
// import type { RadioChangeEvent } from 'antd';
import { Flex, Form, Input, Radio, Typography } from "antd";
import { BaseButton } from "../../components/Button";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import STRAWBERRY from "../../assets/icons/icons8-fruit-94.png";
import { getUserAdmin, updateProfileService } from "../../services/apis/user.service";

const EditForm = ({ setOption, userInfo, handleGetUser }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      await updateProfileService(values);
      handleGetUser();
      setOption(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-profile-edit">
      <img src={STRAWBERRY} alt="icon" className="strawberry" />
      <span className="title">
        <i className="back-btn" onClick={() => setOption(1)}>
          <ArrowLeftOutlined />
        </i>
        <span>EDIT</span>
      </span>
      <Form
        name="basic"
        onFinish={handleUpdateProfile}
        autoComplete="off"
        initialValues={{
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          gender: userInfo.gender,
          phone: userInfo.phone,
          local: userInfo.local,
        }}
      >
        <Flex vertical className="user-profile-edit-form">
          <Typography.Title level={5}>First Name</Typography.Title>
          <Form.Item
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Typography.Title level={5}>Last Name</Typography.Title>
          <Form.Item
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Typography.Title level={5}>Gender</Typography.Title>
          <Form.Item name="gender">
            <Radio.Group name="gender">
              <Radio value={0}>Male</Radio>
              <Radio value={1}>Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Typography.Title level={5}>Phone</Typography.Title>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input placeholder="Enter your phone" />
          </Form.Item>

          <Typography.Title level={5}>Location</Typography.Title>
          <Form.Item
            name="local"
            rules={[
              {
                required: true,
                message: "Please input your location!",
              },
            ]}
          >
            <Input placeholder="Enter your location" />
          </Form.Item>

          <BaseButton name={loading ? "Saving.." : "Save"} type={"text"} htmlType={"submit"} />
        </Flex>
      </Form>
    </div>
  );
};

const Profile = ({ setOption, userInfo }) => {
  return (
    <div className="user-profile">
      <span>
        <img src="https://avatar.iran.liara.run/public/10" alt="avatar" className="avatar" />
        <h2>
          Hi, {userInfo.first_name} {userInfo.last_name}
        </h2>
        {userInfo.email}
      </span>
      <span onClick={() => setOption(2)} className="edit-btn">
        Edit <EditOutlined />
      </span>
    </div>
  );
};

const UserProfile = () => {
  const [option, setOption] = useState(1);
  const [userInfo, setUserInfo] = useState({
    username: "",
    first_name: "",
    last_name: "",
    gender: 0,
    email: "",
    phone: "",
    url_avatar: "",
    local: "",
  });

  const handleGetUser = async () => {
    try {
      const response = await getUserAdmin();
      const dataUser = response.data.data;
      setUserInfo(dataUser);
      console.log(response.data.data);
    } catch (error) {
      console.log(error, "error get user");
    }
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  console.log(userInfo);

  return (
    <div id="user-profile-page">
      <div className="banner-profile"></div>
      <img src="https://img.freepik.com/free-vector/green-grass-white-background_1308-74063.jpg?w=2000&t=st=1723775462~exp=1723776062~hmac=7af1bcf072b565af7c79836830301c1506be0def1e06bb833cb7906131a7c75a" alt="" className="grass-bg" />
      {option === 1 ? <Profile setOption={setOption} userInfo={userInfo} /> : <EditForm handleGetUser={handleGetUser} setOption={setOption} userInfo={userInfo} />}
    </div>
  );
};

export default UserProfile;
