import React from "react";
import { Line, Pie } from "react-chartjs-2";//import thư viện: npm install chart.js react-chartjs-2 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// thành phần cần thiết của chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const RevenueChart = () => {
  // Biểu đồ tròn
  const carBrandsData = {
    labels: ["Brand A", "Brand B", "Brand C", "Brand D", "Khác"],
    datasets: [
      {
        label: "Thị phần (%)",
        data: [25, 35, 20, 15, 5], // Fill data phần trăm cho từng hãng xe
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#0dcaf0", "#4bc0c0"], // Màu cho từng phần của biểu đồ
        borderWidth: 1, // Độ dày đường viền
      },
    ],
  };

  // Biểu đồ đường
  const lineData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
    datasets: [
      {
        label: " Danh thu (VND)",
        data: [10000, 20000, 10000, 40000], // fill data cho biểu đồ đường
        fill: false, // Không tô màu dưới biểu đồ
        backgroundColor: "#0dcaf0", // Màu nền cho các điểm
        borderColor: "#0dcaf0", // Màu viền cho đường biểu đồ
      },
    ],
  };

  // Cấu hình cho biểu đồ đường
  const lineOptions = {
    responsive: true, // Biểu đồ sẽ phản hồi theo kích thước của container
    maintainAspectRatio: false, // Không giữ tỉ lệ mặc định
    plugins: {
      legend: {
        position: "top", // Vị trí của legend
      },
      title: {
        display: true, // Hiển thị tiêu đề
        text: "Tổng danh thu theo từng tháng", // Nội dung tiêu đề
      },
    },
  };

  // Cấu hình cho biểu đồ tròn
  const pieOptions = {
    responsive: true, // Biểu đồ sẽ phản hồi theo kích thước của container
    plugins: {
      legend: {
        position: "top", // Vị trí của legend
      },
      title: {
        display: true, // Hiển thị tiêu đề
        text: "Thị phần các hãng xe ô tô", // Nội dung tiêu đề
      },
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
      {/* Tạo khối cho biểu đồ đường*/}
      <div style={{ position: "relative", height: "500px", width: "700px", border: "1px solid #ccc", borderRadius: "8px", padding: "20px", flex: "1" }}>
        <Line data={lineData} options={lineOptions} />
      </div>

      {/* Tạo khối cho biểu đồ */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "500px", width: "400px", border: "1px solid #ccc", borderRadius: "8px", padding: "20px", flex: "1" }}>
        <Pie data={carBrandsData} options={pieOptions} />
      </div>
    </div>
  );
};

export default RevenueChart;
