import React, { useEffect, useRef, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import CircleType from "circletype";
import { Paragraph } from "../../components/Typography";
import { Button, DatePicker } from "antd";
import { fetchMonthlyPlantAndHarverstSummaryData, fetchReportDashboard, fetchTotalPlantedAreaAllFarm } from "../../services/apis/dashboard.service";
import "./styles.scss";
import { ControlOutlined } from "@ant-design/icons";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    //dữ liệu sản lượng dự kiến
    {
      label: "Đào Tiên",
      data: [3000, 2000, 1000, 4000, 1500, 2200, 3100],
      backgroundColor: "#8884d8",
      stack: "Group A",
    },
    {
      label: "Mía",
      data: [2000, 1500, 500, 3200, 1000, 1700, 2600],
      backgroundColor: "#82eeee",
      stack: "Group A",
    },
    {
      label: "Đậu Xanh",
      data: [2000, 1500, 500, 3200, 1000, 1700, 2600],
      backgroundColor: "#82ca9f",
      stack: "Group A",
      borderRadius: "12",
    },

    // Dữ liệu sản lượng thực tế
    {
      label: "Đào Tiên",
      data: [1000, 3000, 4000, 2000, 2500, 1800, 2700],
      backgroundColor: "#ffc658",
      stack: "Group B",
    },
    {
      label: "Mía",
      data: [1500, 1200, 3400, 2500, 1400, 2900, 3300],
      backgroundColor: "#ff2365",
      stack: "Group B",
    },
    {
      label: "Đậu Xanh",
      data: [1500, 1200, 3400, 2500, 1400, 2900, 3300],
      backgroundColor: "#ff7908",
      borderRadius: "12",
      stack: "Group B",
    },
  ],
};
const mapData = (rawData) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const labels = [];
  const plannedData = {};
  const actualData = {};

  // Khởi tạo các mảng trống cho từng loại cây trồng
  rawData.data.monthly_plant_harvest_summary_dtoarray_list.forEach((item) => {
    const month = monthNames[item.month - 1];

    if (!labels.includes(month)) {
      labels.push(month);
    }

    if (item.type_plant_name) {
      if (!plannedData[item.type_plant_name]) {
        plannedData[item.type_plant_name] = Array(12).fill(null);
        actualData[item.type_plant_name] = Array(12).fill(null);
      }

      plannedData[item.type_plant_name][item.month - 1] = item.total_yield_planned;
      actualData[item.type_plant_name][item.month - 1] = item.total_yield_actual;
    }
  });

  const datasets = [];

  // Dữ liệu sản lượng dự kiến
  for (const plant in plannedData) {
    datasets.push({
      label: plant + " (Planned)",
      data: plannedData[plant],
      backgroundColor: "#8884d8", // Màu sắc có thể tùy chỉnh
      stack: "Group A",
    });
  }

  // Dữ liệu sản lượng thực tế
  for (const plant in actualData) {
    datasets.push({
      label: plant + " (Actual)",
      data: actualData[plant],
      backgroundColor: "#ffc658", // Màu sắc có thể tùy chỉnh
      stack: "Group B",
    });
  }

  return {
    labels: labels,
    datasets: datasets,
  };
};

// Dữ liệu ban đầu
const rawData = {
  status: 200,
  code: 1200,
  message_eng: "OK",
  data: {
    monthly_plant_harvest_summary_dtoarray_list: [
      {
        month: 1,
        type_plant_id: "DRA",
        type_plant_name: "Dragonfruit",
        total_yield_planned: 890.0,
        total_money_planned: 3294.0,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 1,
        type_plant_id: "DUR",
        type_plant_name: "Drurian",
        total_yield_planned: 890.0,
        total_money_planned: 3294.0,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 2,
        type_plant_id: "DUR",
        type_plant_name: "Durian",
        total_yield_planned: 8100.0,
        total_money_planned: 46625.0,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 3,
        type_plant_id: "PLANT_ID_" + Math.floor(Math.random() * 100),
        type_plant_name: "Plant Name " + Math.floor(Math.random() * 100),
        total_yield_planned: Math.random() * 10000,
        total_money_planned: Math.random() * 10000,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 4,
        type_plant_id: "PLANT_ID_" + Math.floor(Math.random() * 100),
        type_plant_name: "Plant Name " + Math.floor(Math.random() * 100),
        total_yield_planned: Math.random() * 10000,
        total_money_planned: Math.random() * 10000,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 5,
        type_plant_id: "PLANT_ID_" + Math.floor(Math.random() * 100),
        type_plant_name: "Plant Name " + Math.floor(Math.random() * 100),
        total_yield_planned: Math.random() * 10000,
        total_money_planned: Math.random() * 10000,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 6,
        type_plant_id: "PLANT_ID_" + Math.floor(Math.random() * 100),
        type_plant_name: "Plant Name " + Math.floor(Math.random() * 100),
        total_yield_planned: Math.random() * 10000,
        total_money_planned: Math.random() * 10000,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 7,
        type_plant_id: "PLANT_ID_" + Math.floor(Math.random() * 100),
        type_plant_name: "Plant Name " + Math.floor(Math.random() * 100),
        total_yield_planned: Math.random() * 10000,
        total_money_planned: Math.random() * 10000,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 8,
        type_plant_id: "PLANT_ID_" + Math.floor(Math.random() * 100),
        type_plant_name: "Plant Name " + Math.floor(Math.random() * 100),
        total_yield_planned: Math.random() * 10000,
        total_money_planned: Math.random() * 10000,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 9,
        type_plant_id: "AVO",
        type_plant_name: "Avocado",
        total_yield_planned: 300.0,
        total_money_planned: 300.0,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 10,
        type_plant_id: "STR",
        type_plant_name: "Strawberry",
        total_yield_planned: 0.5,
        total_money_planned: 15615.5,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 11,
        type_plant_id: "STR",
        type_plant_name: "Strawberry",
        total_yield_planned: 1100.0,
        total_money_planned: 3350.0,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 11,
        type_plant_id: "WAT",
        type_plant_name: "Watermelon",
        total_yield_planned: 360.0,
        total_money_planned: 8280000.0,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
      {
        month: 12,
        type_plant_id: "WAT",
        type_plant_name: "Watermelon",
        total_yield_planned: 1100.0,
        total_money_planned: 1925.0,
        total_yield_actual: Math.random() * 1000,
        total_money_actual: Math.random() * 5000,
      },
    ],
  },
  timestamp: "2024-08-26T10:59:52.492255",
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Biểu Đồ So Sánh Sản Lượng Nông Sản Thực Tế",
    },
  },
  scales: {
    x: {
      stacked: true,
      categoryPercentage: 0.4,
    },
    y: {
      stacked: true,
    },
  },
  barPercentage: 0.7,
};

const LandUsagePieChart = ({ usedLand, unUsed, totalLand }) => {
  const data = {
    labels: ["Used land", "Unused"], // Data labels
    datasets: [
      {
        label: "Datasets Using Land",
        data: [usedLand, unUsed], // Corresponding data
        backgroundColor: ["#dbd468", "#e68a8c"], // Colors for each section
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="chart-land-used">
      <Pie data={data} />
      <Paragraph>Area: {totalLand}m&sup2;</Paragraph>
    </div>
  );
};

const StackedBarChartWithGroups = () => {
  const dataMapping = mapData(rawData);
  return (
    <div className="container-stack-bar">
      <Bar data={dataMapping} options={options} />
    </div>
  );
};
const disabledDate = (current) => {
  // Kiểm tra nếu năm của ngày hiện tại lớn hơn năm hiện tại thì vô hiệu hóa
  const currentYear = new Date().getFullYear();
  return current && current.year() > currentYear;
};
const ExportBtn = () => {
  const [params, setParams] = useState({
    month: null,
    year: null,
  });
  const handleGetReport = async () => {
    console.log(params);
    try {
      const response = await fetchReportDashboard(params);
      // return response;
    } catch (error) {
      console.log(error, "error export");
    }
  };
  return (
    <div className="container-export-btn">
      <DatePicker
        picker="month"
        format="YYYY-MM"
        placeholder="Chọn tháng và năm"
        disabledDate={disabledDate}
        onChange={(date, dateString) => {
          setParams({
            month: dateString.split("-")[1],
            year: dateString.split("-")[0],
          });
          // console.log(params, "test");
        }}
      />
      <Button onClick={handleGetReport}>export</Button>
    </div>
  );
};
const Dashboard = () => {
  const [usedLand, setUsedLand] = useState(0);
  const [unUsedLand, setUnUsedLand] = useState(0);
  const [totalLand, setTotalLand] = useState(0);
  const titleRef = useRef(null);
  useEffect(() => {
    if (titleRef.current) {
      new CircleType(titleRef.current).radius(1500); // Adjust the radius as needed
    }
  }, []);

  const fetchMonthlyPlantAndHarvestSummary = async () => {
    try {
      const response = await fetchMonthlyPlantAndHarverstSummaryData();
      // console.log(response, "afsd");
    } catch (error) {
      // console.log(error, "dashboard");
    }
  };
  fetchMonthlyPlantAndHarvestSummary();

  const fetchDataTotalPlantedArea = async () => {
    try {
      const response = await fetchTotalPlantedAreaAllFarm();
      let result = response.data.data;
      setTotalLand(result.area);
      // const unuserland = result.area - result.area_planted;
      setUsedLand(result.area_planted);
      setUnUsedLand(result.area - result.area_planted);
      return response.data;
    } catch (error) {
      console.log(error, "area all plant");
    }
  };
  fetchDataTotalPlantedArea();
  return (
    <div className="dashboard-page">
      <h1 id="title-over-view" ref={titleRef}>
        OverView of Farm
      </h1>
      <ExportBtn />
      <div className="group-chart">
        <StackedBarChartWithGroups />
        <LandUsagePieChart usedLand={usedLand} unUsed={unUsedLand} totalLand={totalLand} />
      </div>
    </div>
  );
};

export default Dashboard;
