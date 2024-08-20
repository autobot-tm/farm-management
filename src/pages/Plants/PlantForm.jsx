import React from "react";
import { Modal, Form, Input, DatePicker, InputNumber } from "antd";
import "./styleform.scss";
// Component to display the plant form in a modal
const PlantForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  // Handle the form submission
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

  // Formatter to ensure only numeric values are displayed
  const numberFormatter = (value) => (value ? String(value).replace(/[^0-9.]/g, "") : "");

  // Parser to ensure only numeric values are parsed
  const numberParser = (value) => value.replace(/[^0-9.]/g, "");

  // Custom onChange handler to filter out non-numeric input
  const handleNumberChange = (value) => {
    // Ensure the value is a number or an empty string
    return !isNaN(value) || value === "" ? value : "";
  };

  return (
    <Modal visible={visible} title="Plant Information" okText="Create" cancelText="Cancel" onCancel={onCancel} onOk={handleOk}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          date_planted: "",
          selling_date: null,
          vegetative_stage_date: null,
          flowering_stage_date: null,
          fruiting_stage_date: null,
          area: null,
          expected_yield: null,
          price: null,
          type_plant_id: "",
          farm_id: "",
        }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please input the description!" }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <div className="select-date">
          <Form.Item name="date_planted" label="Date Planted" rules={[{ required: true, message: "Please select the date planted!" }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="area" label="Area" rules={[{ required: true, message: "Please input the area!" }]}>
            <InputNumber
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: "100%" }}
              onChange={handleNumberChange} // Filter out non-numeric input
            />
          </Form.Item>
        </div>

        <div className="input-number">
          <Form.Item name="selling_date" label="Selling Date">
            <InputNumber
              type="number"
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: "100%" }}
              onChange={handleNumberChange} // Filter out non-numeric input
            />
          </Form.Item>
          <Form.Item name="vegetative_stage_date" label="Vegetative Stage Date">
            <InputNumber
              type="number"
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: "100%" }}
              onChange={handleNumberChange} // Filter out non-numeric input
            />
          </Form.Item>

          <Form.Item name="flowering_stage_date" label="Flowering Stage Date">
            <InputNumber
              type="number"
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: "100%" }}
              onChange={handleNumberChange} // Filter out non-numeric input
            />
          </Form.Item>

          <Form.Item name="fruiting_stage_date" label="Fruiting Stage Date">
            <InputNumber
              type="number"
              formatter={numberFormatter}
              parser={numberParser}
              min={0}
              style={{ width: "100%" }}
              onChange={handleNumberChange} // Filter out non-numeric input
            />
          </Form.Item>
        </div>

        <div className="select-farm">
          <Form.Item name="type_plant_id" label="Type Plant">
            <Input />
          </Form.Item>
          <Form.Item name="farm_id" label="Farm">
            <Input />
          </Form.Item>
        </div>

        <Form.Item name="expected_yield" label="Expected Yield">
          <InputNumber
            type="number"
            formatter={numberFormatter}
            parser={numberParser}
            min={0}
            style={{ width: "100%" }}
            onChange={handleNumberChange} // Filter out non-numeric input
          />
        </Form.Item>

        <Form.Item name="price" label="Price">
          <InputNumber
            type="number"
            formatter={numberFormatter}
            parser={numberParser}
            min={0}
            style={{ width: "100%" }}
            onChange={handleNumberChange} // Filter out non-numeric input
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PlantForm;
