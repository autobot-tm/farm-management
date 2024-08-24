import React from "react";
import { Table, Input } from "antd";
import "./styles.scss";
const { Search } = Input;
// Define columns
const columns = [
  {
    title: "Plant Name",
    dataIndex: "plant_name",
    key: "plant_name",
  },
  {
    title: "Farm Name",
    dataIndex: "farm_name",
    key: "farm_name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Yield Currently",
    dataIndex: "yield_currently",
    key: "yield_currently",
  },
  {
    title: "Price Currently",
    dataIndex: "price_currently",
    key: "price_currently",
  },
];

const Harvestable = () => {
  return (
    <div className="container-table">
      <Table
        columns={columns}
        pagination={{ pageSize: 10 }} // Pagination settings
      />
    </div>
  );
};

const HarvestPage = () => {
  return (
    <div className="harvest-page">
      <div className="input-filter-plants">
        <Search placehoder="Search harvest" style={{ width: 500 }} />
      </div>
      <Harvestable />
    </div>
  );
};

export default HarvestPage;
