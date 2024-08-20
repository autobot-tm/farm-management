import React, { useContext, useState } from "react";
import { Button, ConfigProvider, Space, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";
import PlantForm from "./PlantForm"; // Import the PlantForm component

const PlantsCreateBtn = () => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

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

  return (
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
      <Space>
        <Button type="primary" size="large" onClick={() => setVisible(true)} icon={<EditOutlined />}>
          Create Plant
        </Button>
      </Space>
      <PlantForm visible={visible} onCreate={onCreate} onCancel={() => setVisible(false)} />
    </ConfigProvider>
  );
};

export default PlantsCreateBtn;
