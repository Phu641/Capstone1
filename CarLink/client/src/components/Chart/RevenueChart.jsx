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
  const [lineData, setLineData] = useState(Array(12).fill(0)); // Doanh thu từng tháng
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
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
          return;
        }

        // Gọi API booking-completed
        const bookingResponse = await fetch(
          "http://localhost:3000/admin/booking-completed",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!bookingResponse.ok) {
          console.error(
            "Không thể truy cập dữ liệu booking. Vui lòng kiểm tra quyền admin."
          );
          return;
        }

        const bookingData = await bookingResponse.json();

        // Tính doanh thu từng tháng
        const monthlyRevenue = Array(12).fill(0); // Mảng doanh thu từ tháng 1 đến 12
        bookingData.data.forEach((booking) => {
          const month = new Date(booking.bookingDate).getMonth(); // Xác định tháng (0-11)
          const amount = parseFloat(booking.totalAmount) * 0.1; // Áp dụng 10%
          monthlyRevenue[month] += amount;
        });

        setLineData(monthlyRevenue);

        // Tính toán thị phần xe (dữ liệu đã có từ trước, không thay đổi)
        const carsResponse = await fetch(
          "http://localhost:3000/admin/all-cars-availability",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!carsResponse.ok) {
          console.error(
            "Không thể truy cập dữ liệu xe. Vui lòng kiểm tra quyền admin."
          );
          return;
        }

        const carsData = await carsResponse.json();

        const carModelCount = {};
        carsData.forEach((car) => {
          const model = car.overview.model;
          const brandName = model.split(" ")[0];
          const formattedBrandName =
            brandName.charAt(0).toUpperCase() +
            brandName.slice(1).toLowerCase();

          if (carModelCount[formattedBrandName]) {
            carModelCount[formattedBrandName]++;
          } else {
            carModelCount[formattedBrandName] = 1;
          }
        });

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
        label: "Doanh thu (VND)",
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
      title: { display: true, text: "Tổng doanh thu theo từng tháng (10%)" },
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
