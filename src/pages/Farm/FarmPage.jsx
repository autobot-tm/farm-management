import React, { useState, useContext } from "react";
import { Button, Modal, Form, Input, DatePicker, Select, ConfigProvider, Tag, FloatButton, Dropdown, InputNumber, Divider } from "antd";
import { SubHeading, Paragraph, Caption, Headline } from "../../components/Typography";
import BaseButton from "../../components/Button/BaseButton";
import { FireOutlined, PlusOutlined } from "@ant-design/icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { css } from "@emotion/css";
import "./styles.scss";
ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(ArcElement, Tooltip, Legend);

const { Search } = Input;
const { Option } = Select;

const FarmForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal open={visible} title="Farm Form" okText="Create" cancelText="Cancel" onCancel={onCancel} onOk={handleOk}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: "",
          status: "",
          area: null,
          create_at: null,
          update_at: null,
        }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="area" label="Area" rules={[{ required: true, message: "Please input the area!" }]}>
          <Input type="number" min={0} />
        </Form.Item>
        <div className="section-date-form">
          <Form.Item name="create_at" label="Created At" rules={[{ required: true, message: "Please select the creation date!" }]}>
            <DatePicker style={{ width: "100%" }} showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item name="update_at" label="Updated At" rules={[{ required: true, message: "Please select the update date!" }]}>
            <DatePicker style={{ width: "100%" }} showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
        </div>
        <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the status!" }]}>
          <Select placeholder="Select a status">
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
            <Option value="pending">Pending</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ItemPlant = ({ code }) => {
  return (
    <div className="item-plant">
      <img src="src/assets/icons/icon-pea.png" alt={`Plant ${code}`} /> {/* Add the image source here */}
      <Tag color="green">{code}</Tag>
    </div>
  );
};

const SearchPlantsTag = ({ onFilterData }) => {
  const [searchText, setSearchText] = useState("");
  const items = [
    {
      key: "1",
      label: (
        <div>
          <Paragraph>Add number of plants</Paragraph>
          <div className="item-dropdown">
            <InputNumber style={{ width: "90%" }} onClick={["disabled"]} type="number" />
            <Button style={{ background: "white" }} icon={<PlusOutlined />}></Button>
          </div>
        </div>
      ),
    },
  ];
  const items2 = [
    {
      key: "1",
      label: (
        <div>
          <Paragraph>Select your plants</Paragraph>
          <div className="item-dropdown">
            <Select style={{ width: 250 }} onClick={["disabled"]} />
            <Button style={{ background: "white" }} icon={<PlusOutlined />}></Button>
          </div>
        </div>
      ),
    },
  ];
  // Xử lý khi tìm kiếm
  const handleSearch = async (value) => {
    setSearchText(value);

    try {
      const response = await fetchFilteredData(searchText, selectedFilter === selectedFilter);
      onFilterData(response.data);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  return (
    <div className="input-filter-plants">
      <Search placeholder="Search plants" allowClear onSearch={handleSearch} style={{ width: 500 }} />
      <Dropdown
        menu={{
          items: items2,
        }}
        placement="bottomRight"
        trigger={["click"]}
        arrow={{
          pointAtCenter: false,
        }}
      >
        <Button type="primary" size="large" onClick={() => {}} icon={<PlusOutlined />}>
          Add Plant
        </Button>
      </Dropdown>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        trigger={["click"]}
        arrow={{
          pointAtCenter: false,
        }}
      >
        <Button type="primary" size="large" onClick={() => {}} icon={<PlusOutlined />}>
          Add Plant
        </Button>
      </Dropdown>
    </div>
  );
};

const PieChart = () => {
  const data = {
    labels: ["Used land", "Unused"], // 2 trường bạn muốn hiển thị
    datasets: [
      {
        label: "Datasets Using Land",
        data: [300, 150], // Dữ liệu tương ứng với các trường
        backgroundColor: ["#dbd468", "#e68a8c"], // Màu tương ứng với các trường
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="chart-land">
      <Pie data={data} />
      <Paragraph>area: 1500ha</Paragraph>
    </div>
  );
};

const OpenFarm = ({ visibleOpenFarm, onCancel, number = 1000 }) => {
  return (
    <Modal className="open-farm-modal" footer={null} open={visibleOpenFarm} onCancel={onCancel}>
      <div className="content-farm-popup">
        <div className="show-all-plant">
          <SearchPlantsTag />
          <div className="grid-item-plant">
            {[...Array(number)].map((_, index) => (
              <ItemPlant key={index} code={index} />
            ))}
          </div>
        </div>
        <div className="detail-plant">
          <Headline>Vườn đào</Headline>
          <Divider variant="dashed" style={{ borderColor: "#7cb305" }} dashed>
            Details Farm
          </Divider>
          <div className="detail-content">
            <div className="label-content">
              <Paragraph>Plant name: </Paragraph>
              <SubHeading size={260} classNames="item-plant-content-name">
                Đào Tiên Siêu Giòn
              </SubHeading>
              <Paragraph>Yield quantity: </Paragraph>
              <SubHeading size={260} classNames="item-plant-content">
                65
              </SubHeading>
              <Paragraph>Date harvest: </Paragraph>

              <SubHeading size={260} classNames="item-plant-content">
                30/02/2025
              </SubHeading>
            </div>
          </div>
          <PieChart />
          <div className="status-farm">
            <Paragraph>status: </Paragraph>
            <SubHeading size={260} classNames="status-farm-content">
              Đang trồng
            </SubHeading>
          </div>
          <FloatButton.Group
            trigger="hover"
            type="primary"
            style={{
              insetInlineEnd: 84,
            }}
            icon={<FireOutlined />}
          >
            <div className="group-button">
              <BaseButton className="item-btn-harvest" name={"Harvest"} />
              <BaseButton className="item-btn-harvest" name={"Harvest all"} />
            </div>
          </FloatButton.Group>
        </div>
      </div>
    </Modal>
  );
};

const FarmPage = () => {
  const [visible, setVisible] = useState(false);
  const [visibleOpenFarm, setVisibleOpenFarm] = useState(false);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const rootPrefixCls = getPrefixCls();

  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(.${rootPrefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(50deg, #407f3e, #89b449);

        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `;

  const inputBorderColor = css`
    &.${rootPrefixCls}-input {
      &:hover {
        border-color: #407f3e;
      }

      &:focus {
        border-color: #407f3e;
        box-shadow: 0 0 0 2px rgba(0, 90, 0, 0.2);
      }
    }
  `;

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };
  return (
    <div className="farm-page">
      <button
        onClick={() => {
          setVisibleOpenFarm(true);
        }}
        className="item-farm"
      >
        <div className="img-background">
          <SubHeading classNames="subheading-img">Vườn đào</SubHeading>
        </div>
        <div className="item-content-farm">
          <div className="sub-heading-content-farms">
            <SubHeading>Vườn đào</SubHeading>
            <Paragraph classNames="sub-heading-content-farm">Đào Tiên Siêu Giòn</Paragraph>
            <Paragraph classNames="sub-heading-content-farm">S: 5000ha</Paragraph>
          </div>
        </div>
      </button>
      <div>
        {" "}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#407f3e",
            },
            components: {
              Button: {
                className: linearGradientButton,
              },
              Input: {
                className: inputBorderColor,
              },
            },
          }}
        >
          <Button
            className="add-button"
            onClick={() => {
              setVisible(true);
            }}
          >
            <span className="plus-sign">+</span>
          </Button>
          <FarmForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
            number={10}
          />
          <OpenFarm visibleOpenFarm={visibleOpenFarm} onCancel={() => setVisibleOpenFarm(false)} />{" "}
        </ConfigProvider>
      </div>
    </div>
  );
};

export default FarmPage;
