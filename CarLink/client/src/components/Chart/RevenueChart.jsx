import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const RevenueChart = () => {
  const [lineData, setLineData] = useState([]);
  const [carBrandsData, setCarBrandsData] = useState({
    labels: [],
    datasets: [
      {
        label: "Thị phần (%)",
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#0dcaf0",
          "#4bc0c0",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Gọi API để lấy dữ liệu tổng doanh thu theo tháng và thị phần xe
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
          return;
        }

        // Gọi API để lấy thông tin xe
        const response = await fetch(
          "http://localhost:3000/admin/all-cars-availability",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );

        if (!response.ok) {
          console.error(
            "Không thể truy cập dữ liệu xe. Vui lòng kiểm tra quyền admin."
          );
          return;
        }

        const data = await response.json();

        // Tính toán số lượng xe cho từng model
        const carModelCount = {};
        data.forEach((car) => {
          const model = car.overview.model;

          // Sử dụng Regex để tách lấy tên hãng xe (phần đầu tiên trước dấu cách)
          const brandName = model.split(" ")[0]; // Lấy phần đầu tiên trước dấu cách

          // Chuyển chữ cái đầu của tên hãng thành chữ hoa
          const formattedBrandName =
            brandName.charAt(0).toUpperCase() +
            brandName.slice(1).toLowerCase();

          if (carModelCount[formattedBrandName]) {
            carModelCount[formattedBrandName]++;
          } else {
            carModelCount[formattedBrandName] = 1;
          }
        });

        // Tạo dữ liệu cho biểu đồ Pie chart về thị phần các hãng xe
        const carLabels = Object.keys(carModelCount);
        const carData = Object.values(carModelCount);

        setCarBrandsData({
          labels: carLabels,
          datasets: [
            {
              label: "Thị phần (%)",
              data: carData,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#0dcaf0",
                "#4bc0c0",
              ],
              borderWidth: 1,
            },
          ],
        });

        // Giả lập dữ liệu lineData (doanh thu từng tháng)
        // setLineData([12000, 15000, 13000, 18000, 20000, 22000, 24000, 21000, 25000, 23000, 26000, 27000]);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchStats();
  }, []);

  const lineChartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
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
      title: { display: true, text: "Tổng doanh thu theo từng tháng" },
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
    <div
      style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}
    >
      <div
        style={{
          position: "relative",
          height: "500px",
          width: "700px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          flex: "1",
        }}
      >
        <Line data={lineChartData} options={lineOptions} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "500px",
          width: "400px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          flex: "1",
        }}
      >
        <Pie data={carBrandsData} options={pieOptions} />
      </div>
    </div>
  );
};

export default RevenueChart;
