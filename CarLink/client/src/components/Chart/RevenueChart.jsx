import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const RevenueChart = () => {
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetch("")// api
      .then(response => response.json())
      .then(data => {
        setLineData(data.lineData);
        setPieData(data.pieData);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const carBrandsData = {
    labels: ["Brand A", "Brand B", "Brand C", "Brand D", "Khác"],
    datasets: [
      {
        label: "Thị phần (%)",
        data: pieData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#0dcaf0", "#4bc0c0"],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],
    datasets: [
      {
        label: "Danh thu (VND)",
        data: lineData,
        fill: false,
        backgroundColor: "#0dcaf0",
        borderColor: "#0dcaf0",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Tổng danh thu theo từng tháng" },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Thị phần các hãng xe ô tô" },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
      <div style={{ position: "relative", height: "500px", width: "700px", border: "1px solid #ccc", borderRadius: "8px", padding: "20px", flex: "1" }}>
        <Line data={lineChartData} options={lineOptions} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "500px", width: "400px", border: "1px solid #ccc", borderRadius: "8px", padding: "20px", flex: "1" }}>
        <Pie data={carBrandsData} options={pieOptions} />
      </div>
    </div>
  );
};

export default RevenueChart;
