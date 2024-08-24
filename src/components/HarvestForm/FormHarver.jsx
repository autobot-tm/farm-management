import React from "react";
import { Button, Form, Input, InputNumber } from "antd";

const HarvestForm = ({ onCreate, isHarvestNumber }) => {
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

  const numberFormatter = (value) => (value ? String(value).replace(/[^0-9]/g, "") : "");
  const numberParser = (value) => value.replace(/[^0-9]/g, "");

  return (
    <Form form={form} layout="vertical">
      {/* Use isHarvestNumber to conditionally render the Quantity field */}
      {isHarvestNumber && (
        <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Please input the quantity!" }]}>
          <InputNumber type="number" formatter={numberFormatter} parser={numberParser} min={0} style={{ width: "100%" }} />
        </Form.Item>
      )}

      <Form.Item type="number" name="totalYield" label="Total Yield" rules={[{ required: true, message: "Please input the total yield!" }]}>
        <InputNumber formatter={numberFormatter} parser={numberParser} min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item type="number" name="priceCurrently" label="Price Currently" rules={[{ required: true, message: "Please input the current price!" }]}>
        <InputNumber formatter={numberFormatter} parser={numberParser} min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input the description!" }]}>
        <Input.TextArea rows={3} />
      </Form.Item>
      <Button>Harvest</Button>
    </Form>
  );
};

export default HarvestForm;
