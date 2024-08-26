import React, { useEffect, useRef, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import CircleType from "circletype";
import { Paragraph } from "../../components/Typography";
import { Button } from "antd";
import { fetchMonthlyPlantAndHarverstSummaryData, fetchTotalPlantedAreaAllFarm } from "../../services/apis/dashboard.service";
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

const LandUsagePieChart = ({ usedLand, Unused }) => {
  const data = {
    labels: ["Used land", "Unused"], // Data labels
    datasets: [
      {
        label: "Datasets Using Land",
        data: [usedLand, Unused], // Corresponding data
        backgroundColor: ["#dbd468", "#e68a8c"], // Colors for each section
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="chart-land-used">
      <Pie data={data} />
      <Paragraph>Area: 1500ha</Paragraph>
    </div>
  );
};

const StackedBarChartWithGroups = () => {
  return (
    <div className="container-stack-bar">
      <Bar data={data} options={options} />
    </div>
  );
};
const ExportBtn = () => {
  return (
    <div className="container-export-btn">
      <Button>export by month</Button>
      <Button>export by year</Button>
    </div>
  );
};
const Dashboard = () => {
  const [usedLand, setUsedLand] = useState(0);
  const [unUsedLand, setUnUsedLand] = useState(0);
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
      setUsedLand(result.area_planted);
      const unuserland = result.area - result.area_planted;

      setUnUsedLand(unuserland);
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
        <LandUsagePieChart usedLand={usedLand} unUsed={unUsedLand} />
      </div>
    </div>
  );
};

export default Dashboard;
