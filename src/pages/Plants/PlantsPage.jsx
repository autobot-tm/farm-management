import React, { useEffect, useState } from "react";
import { fetchFilteredData, getPlantsService } from "../../services/apis/plant.service";
import { FilterOutlined } from "@ant-design/icons";
import { Table, Input, Button, Dropdown, Space } from "antd";
import PlantForm from "../Plants/PlantsCreateBtn";
import "./styles.scss";

const { Search } = Input;

// Component hiển thị bảng với dữ liệu cây trồng
const PlantsTable = ({ data, loading }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="plants-name">{text}</span>,
    },
    {
      title: "Date Planted",
      dataIndex: "date_planted",
      key: "date_planted",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      filtes: [
        { text: "Small (Below 1m²)", value: "small" },
        { text: "Medium (1 - 5m²)", value: "medium" },
        { text: "Large (Above 5m²)", value: "large" },
      ],
      onFilter: (value, record) => {
        if (value === "small") return record.area < 100;
        if (value === "medium") return record.area >= 100 && record.area <= 500;
        if (value === "large") return record.area > 500;
        return false;
      },
    },
    {
      title: "Expected Yield",
      dataIndex: "expected_yield",
      key: "expected_yield",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      filters: [
        { text: "Below 50K", value: "below50" },
        { text: "50K - 100K", value: "50to100" },
        { text: "Above 100K", value: "above100" },
      ],
      onFilter: (value, record) => {
        if (value === "below50") return record.Price < 50;
        if (value === "50to100") return record.Price >= 50 && record.Price <= 100;
        if (value === "above100") return record.Price > 100;
        return false;
      },
    },
    {
      title: "Type Plant ID",
      dataIndex: "type_plant_id",
      key: "type_plant_id",
      filters: [
        { text: "Type 1", value: 1 },
        { text: "Type 2", value: 2 },
        { text: "Type 3", value: 3 },
      ],
      onFilter: (value, record) => record.type_plant_id === value,
    },
  ];

  return (
    <div className="container-table">
      <Table columns={columns} dataSource={data} loading={loading} rowKey={(record) => record.id} pagination={{ pageSize: 10 }} />
    </div>
  );
};

// Component cho bộ lọc và tìm kiếm
const InputFilterPlants = ({ onFilterData }) => {
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const [searchText, setSearchText] = useState("");

  const filters = [
    {
      key: "1",
      label: <p>1st menu item</p>,
    },
    {
      key: "2",
      label: <p>2nd menu item</p>,
    },
    {
      key: "3",
      label: <p>3rd menu item</p>,
    },
  ];

  // Xử lý khi chọn bộ lọc
  const handleFilterClick = async (e) => {
    const filter = e.domEvent.target.innerText;
    setSelectedFilter(filter);

    try {
      const response = await fetchFilteredData(filter === "Filter" ? "" : filter, "");
      onFilterData(response.data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  // Xử lý khi tìm kiếm
  const handleSearch = async (value) => {
    setSearchText(value);

    try {
      const response = await fetchFilteredData(searchText, selectedFilter === "Filter" ? "" : selectedFilter);
      onFilterData(response.data);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  return (
    <div className="input-filter-plants">
      <Dropdown
        menu={{
          items: filters,
          onClick: handleFilterClick,
        }}
      >
        <Button>
          <Space>
            {selectedFilter}
            <FilterOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Search placeholder="Search plants" allowClear onSearch={handleSearch} style={{ width: 500 }} />
      <PlantForm />
    </div>
  );
};

// Component chính cho trang Plants
const PlantsPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPlantsService();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="plants-page">
      <h1 className="title-lst-of-plants">List of Plants</h1>
      <InputFilterPlants onFilterData={setFilteredData} />
      <PlantsTable data={filteredData.length > 0 ? filteredData : data} loading={loading} />
    </div>
  );
};

export default PlantsPage;
