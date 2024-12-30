// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "../styles/WithdrawApprovalPage.css";

// const WithdrawApprovalPage = () => {
//   const navigate = useNavigate();
//   const [activePage, setActivePage] = useState("WithdrawOwner");
//   const [pendingWithdrawRequests, setPendingWithdrawRequests] = useState([]);
//   const [completedWithdrawRequests, setCompletedWithdrawRequests] = useState(
//     []
//   );
//   const [otpInputs, setOtpInputs] = useState({});

//   useEffect(() => {
//     const fetchPendingWithdrawRequests = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           toast.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
//           navigate("/login");
//           return;
//         }

//         const response = await fetch(
//           "http://localhost:3000/admin/pending-withdraw",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await response.json();
//         if (!response.ok) {
//           toast.error(
//             data.message ||
//               "Không thể truy cập dữ liệu rút tiền. Vui lòng kiểm tra quyền admin."
//           );
//           return;
//         }

//         setPendingWithdrawRequests(data);
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//         toast.error("Đã xảy ra lỗi khi gọi API. Vui lòng thử lại sau.");
//       }
//     };

//     const fetchCompletedWithdrawRequests = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           toast.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
//           navigate("/login");
//           return;
//         }

//         const response = await fetch(
//           "http://localhost:3000/admin/approval-withdraw",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await response.json();
//         if (!response.ok) {
//           toast.error(
//             data.message ||
//               "Không thể truy cập dữ liệu rút tiền hoàn thành. Vui lòng kiểm tra quyền admin."
//           );
//           return;
//         }

//         setCompletedWithdrawRequests(data);
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//         toast.error("Đã xảy ra lỗi khi gọi API. Vui lòng thử lại sau.");
//       }
//     };

//     fetchPendingWithdrawRequests();
//     fetchCompletedWithdrawRequests();
//   }, [navigate]);

//   const handleApproveRequest = async (withdrawID) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
//         navigate("/login");
//         return;
//       }

//       const response = await fetch(
//         `http://localhost:3000/admin/approve-withdraw/${withdrawID}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();
//       if (!response.ok) {
//         toast.error(
//           data.message ||
//             "Không thể duyệt yêu cầu rút tiền. Vui lòng thử lại sau."
//         );
//         return;
//       }

//       toast.success(
//         data.message || "Yêu cầu rút tiền đã được duyệt thành công."
//       );

//       // Reload the page after approval
//       window.location.reload();
//     } catch (error) {
//       console.error("Lỗi khi gọi API:", error);
//       toast.error("Đã xảy ra lỗi khi duyệt yêu cầu. Vui lòng thử lại sau.");
//     }
//   };

//   const handleConfirmOTP = async (withdrawID) => {
//     try {
//       const token = localStorage.getItem("token");
//       const otp = otpInputs[withdrawID]; // Lấy OTP theo đúng withdrawID

//       if (!token) {
//         toast.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
//         navigate("/login");
//         return;
//       }

//       if (!otp) {
//         toast.error("Vui lòng nhập mã OTP.");
//         return;
//       }

//       const response = await fetch(
//         `http://localhost:3000/admin/confirm-withdraw`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ withdrawID, OTP: Number(otp) }), // Chuyển OTP thành số
//         }
//       );

//       const data = await response.json();
//       if (!response.ok) {
//         toast.error(
//           data.message ||
//             "Không thể xác nhận yêu cầu rút tiền. Vui lòng thử lại sau."
//         );
//         return;
//       }

//       toast.success(
//         data.message || "Yêu cầu rút tiền đã được xác nhận thành công."
//       );
//       setCompletedWithdrawRequests(
//         completedWithdrawRequests.filter(
//           (request) => request.withdrawID !== withdrawID
//         )
//       );
//     } catch (error) {
//       console.error("Lỗi khi gọi API:", error);
//       toast.error("Đã xảy ra lỗi khi xác nhận yêu cầu. Vui lòng thử lại sau.");
//     }
//   };

//   const handlePageClick = (page) => {
//     setActivePage(page);
//     navigate(`/${page}`);
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <ul>
//           <li
//             className={activePage === "DashboardAdmin" ? "active" : ""}
//             onClick={() => handlePageClick("DashboardAdmin")}
//           >
//             Dashboard
//           </li>
//           <li
//             className={activePage === "manageUsers" ? "active" : ""}
//             onClick={() => handlePageClick("user-list")}
//           >
//             Quản lý người dùng
//           </li>
//           <li
//             className={activePage === "vehicleApproval" ? "active" : ""}
//             onClick={() => handlePageClick("vehicle-approval")}
//           >
//             Duyệt xe
//           </li>
//           <li
//             className={activePage === "WithdrawOwner" ? "active" : ""}
//             onClick={() => handlePageClick("withdraw-approval")}
//           >
//             Yêu cầu rút tiền
//           </li>
//         </ul>
//       </div>

//       <div className="main-content">
//         <h2>Duyệt yêu cầu rút tiền</h2>
//         <div className="withdraw-tables-container">
//           <div className="withdraw-table pending-table">
//             <h3>Yêu cầu rút tiền đang chờ duyệt</h3>
//             {pendingWithdrawRequests.length === 0 ? (
//               <p>Không có yêu cầu rút tiền nào cần duyệt.</p>
//             ) : (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>ID Rút tiền</th>
//                     <th>ID Chủ xe</th>
//                     <th>Số tiền</th>
//                     <th>Thời gian yêu cầu</th>
//                     <th>Hành động</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {pendingWithdrawRequests.map((request) => (
//                     <tr key={request.withdrawID}>
//                       <td>{request.withdrawID}</td>
//                       <td>{request.customerID}</td>
//                       <td>{request.amount}</td>
//                       <td>
//                         {new Date(request.createdAt).toLocaleDateString()}
//                       </td>
//                       <td>
//                         <button
//                           onClick={() =>
//                             handleApproveRequest(request.withdrawID)
//                           }
//                         >
//                           Duyệt
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>

//           <div className="withdraw-table completed-table">
//             <h3>Xác nhận hoàn thành</h3>
//             {completedWithdrawRequests.length === 0 ? (
//               <p>Không có yêu cầu nào đã hoàn thành.</p>
//             ) : (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>ID Rút tiền</th>
//                     <th>ID Khách hàng</th>
//                     <th>Số tiền</th>
//                     <th>Thời gian yêu cầu</th>
//                     <th>Mã OTP</th>
//                     <th>Hành động</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {completedWithdrawRequests.map((request) => (
//                     <tr key={request.withdrawID}>
//                       <td>{request.withdrawID}</td>
//                       <td>{request.customerID}</td>
//                       <td>{request.amount}</td>
//                       <td>
//                         {new Date(request.createdAt).toLocaleDateString()}
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={otpInputs[request.withdrawID] || ""}
//                           onChange={(e) =>
//                             setOtpInputs({
//                               ...otpInputs,
//                               [request.withdrawID]: e.target.value,
//                             })
//                           }
//                           placeholder="Nhập mã OTP"
//                         />
//                       </td>
//                       <td>
//                         <button
//                           onClick={() => handleConfirmOTP(request.withdrawID)}
//                         >
//                           Xác Nhận
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WithdrawApprovalPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/WithdrawApprovalPage.css";

const WithdrawApprovalPage = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("WithdrawOwner");
  const [pendingWithdrawRequests, setPendingWithdrawRequests] = useState([]);
  const [completedWithdrawRequests, setCompletedWithdrawRequests] = useState(
    []
  );
  const [otpInputs, setOtpInputs] = useState({});

  useEffect(() => {
    const fetchPendingWithdrawRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/admin/pending-withdraw",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          toast.error(
            data.message ||
              "Không thể truy cập dữ liệu rút tiền. Vui lòng kiểm tra quyền admin."
          );
          return;
        }

        setPendingWithdrawRequests(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Đã xảy ra lỗi khi gọi API. Vui lòng thử lại sau.");
      }
    };

    const fetchCompletedWithdrawRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/admin/approval-withdraw",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          toast.error(
            data.message ||
              "Không thể truy cập dữ liệu rút tiền hoàn thành. Vui lòng kiểm tra quyền admin."
          );
          return;
        }

        setCompletedWithdrawRequests(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Đã xảy ra lỗi khi gọi API. Vui lòng thử lại sau.");
      }
    };

    fetchPendingWithdrawRequests();
    fetchCompletedWithdrawRequests();
  }, [navigate]);

  const handleApproveRequest = async (withdrawID) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
        navigate("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/admin/approve-withdraw/${withdrawID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(
          data.message ||
            "Không thể duyệt yêu cầu rút tiền. Vui lòng thử lại sau."
        );
        return;
      }

      toast.success(
        data.message || "Yêu cầu rút tiền đã được duyệt thành công."
      );

      // Reload the page after approval
      window.location.reload();
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      toast.error("Đã xảy ra lỗi khi duyệt yêu cầu. Vui lòng thử lại sau.");
    }
  };

  const handleConfirmOTP = async (withdrawID) => {
    try {
      const token = localStorage.getItem("token");
      const otp = otpInputs[withdrawID]; // Lấy OTP theo đúng withdrawID

      if (!token) {
        toast.error("Không tìm thấy token admin. Vui lòng đăng nhập lại.");
        navigate("/login");
        return;
      }

      if (!otp) {
        toast.error("Vui lòng nhập mã OTP.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/admin/confirm-withdraw`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ withdrawID, OTP: Number(otp) }), // Chuyển OTP thành số
        }
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(
          data.message ||
            "Không thể xác nhận yêu cầu rút tiền. Vui lòng thử lại sau."
        );
        return;
      }

      toast.success(
        data.message || "Yêu cầu rút tiền đã được xác nhận thành công."
      );
      setCompletedWithdrawRequests(
        completedWithdrawRequests.filter(
          (request) => request.withdrawID !== withdrawID
        )
      );
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      toast.error("Đã xảy ra lỗi khi xác nhận yêu cầu. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li
            className={activePage === "DashboardAdmin" ? "active" : ""}
            onClick={() => navigate("/DashboardAdmin")}
          >
            Dashboard
          </li>
          <li
            className={activePage === "manageUsers" ? "active" : ""}
            onClick={() => navigate("/user-list")}
          >
            Quản lý người dùng
          </li>
          <li
            className={activePage === "vehicleApproval" ? "active" : ""}
            onClick={() => navigate("/vehicle-approval")}
          >
            Duyệt xe
          </li>
          <li
            className={activePage === "WithdrawOwner" ? "active" : ""}
            onClick={() => navigate("/withdraw-approval")}
          >
            Yêu cầu rút tiền
          </li>
          <li
            className={activePage === "ownerReports" ? "active" : ""}
            onClick={() => navigate("/owner-reports")}
          >
            Báo cáo của chủ xe
          </li>
          <li
            className={activePage === "reportHistory" ? "active" : ""}
            onClick={() => navigate("/report-history")}
          >
            Lịch sử báo cáo
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h2>Duyệt yêu cầu rút tiền</h2>
        <div className="withdraw-tables-container">
          <div className="withdraw-table pending-table">
            <h3>Yêu cầu rút tiền đang chờ duyệt</h3>
            {pendingWithdrawRequests.length === 0 ? (
              <p>Không có yêu cầu rút tiền nào cần duyệt.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID Rút tiền</th>
                    <th>ID Chủ xe</th>
                    <th>Số tiền</th>
                    <th>Thời gian yêu cầu</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingWithdrawRequests.map((request) => (
                    <tr key={request.withdrawID}>
                      <td>{request.withdrawID}</td>
                      <td>{request.customerID}</td>
                      <td>{request.amount}</td>
                      <td>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleApproveRequest(request.withdrawID)
                          }
                        >
                          Duyệt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="withdraw-table completed-table">
            <h3>Xác nhận hoàn thành</h3>
            {completedWithdrawRequests.length === 0 ? (
              <p>Không có yêu cầu nào đã hoàn thành.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID Rút tiền</th>
                    <th>ID Khách hàng</th>
                    <th>Số tiền</th>
                    <th>Thời gian yêu cầu</th>
                    <th>Mã OTP</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {completedWithdrawRequests.map((request) => (
                    <tr key={request.withdrawID}>
                      <td>{request.withdrawID}</td>
                      <td>{request.customerID}</td>
                      <td>{request.amount}</td>
                      <td>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <input
                          type="text"
                          value={otpInputs[request.withdrawID] || ""}
                          onChange={(e) =>
                            setOtpInputs({
                              ...otpInputs,
                              [request.withdrawID]: e.target.value,
                            })
                          }
                          placeholder="Nhập mã OTP"
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleConfirmOTP(request.withdrawID)}
                        >
                          Xác Nhận
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawApprovalPage;
