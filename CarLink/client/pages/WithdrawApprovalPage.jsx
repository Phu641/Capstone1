// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/WithdrawApprovalPage.css";
// import { toast } from "react-toastify";

// const WithdrawApprovalPage = () => {
//   const navigate = useNavigate();
//   const [pendingWithdrawRequests, setPendingWithdrawRequests] = useState([]);

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

//         if (!response.ok) {
//           toast.error(
//             "Không thể truy cập dữ liệu rút tiền. Vui lòng kiểm tra quyền admin."
//           );
//           return;
//         }

//         const data = await response.json();
//         setPendingWithdrawRequests(data);
//       } catch (error) {
//         console.error("Lỗi khi gọi API:", error);
//         toast.error("Đã xảy ra lỗi khi gọi API. Vui lòng thử lại sau.");
//       }
//     };

//     fetchPendingWithdrawRequests();
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

//       if (!response.ok) {
//         toast.error("Không thể duyệt yêu cầu rút tiền. Vui lòng thử lại sau.");
//         return;
//       }

//       toast.success("Yêu cầu rút tiền đã được duyệt thành công.");
//       setPendingWithdrawRequests(
//         pendingWithdrawRequests.filter(
//           (request) => request.withdrawID !== withdrawID
//         )
//       );
//     } catch (error) {
//       console.error("Lỗi khi gọi API:", error);
//       toast.error("Đã xảy ra lỗi khi duyệt yêu cầu. Vui lòng thử lại sau.");
//     }
//   };

//   return (
//     <div className="withdraw-approval-container">
//       <h2>Duyệt yêu cầu rút tiền</h2>
//       <div className="withdraw-tables-container">
//         <div className="withdraw-table pending-table">
//           <h3>Yêu cầu rút tiền đang chờ duyệt</h3>
//           {pendingWithdrawRequests.length === 0 ? (
//             <p>Không có yêu cầu rút tiền nào cần duyệt.</p>
//           ) : (
//             <table className="withdraw-requests-table">
//               <thead>
//                 <tr>
//                   <th>Withdraw ID</th>
//                   <th>Customer ID</th>
//                   <th>Số tiền</th>
//                   <th>Trạng thái</th>
//                   <th>Ngày yêu cầu</th>
//                   <th>Hành động</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pendingWithdrawRequests.map((request) => (
//                   <tr key={request.withdrawID}>
//                     <td>{request.withdrawID}</td>
//                     <td>{request.customerID}</td>
//                     <td>{request.amount} VND</td>
//                     <td>{request.status}</td>
//                     <td>{new Date(request.createdAt).toLocaleDateString()}</td>
//                     <td>
//                       <button
//                         onClick={() => handleApproveRequest(request.withdrawID)}
//                       >
//                         Duyệt
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//         <div className="withdraw-table completed-table">
//           <h3>Yêu cầu rút tiền đang chờ duyệt</h3>
//           <p>Chưa có dữ liệu.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WithdrawApprovalPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WithdrawApprovalPage.css";
import { toast } from "react-toastify";

const WithdrawApprovalPage = () => {
  const navigate = useNavigate();
  const [pendingWithdrawRequests, setPendingWithdrawRequests] = useState([]);
  const [searchCustomerID, setSearchCustomerID] = useState("");

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

        if (!response.ok) {
          toast.error(
            "Không thể truy cập dữ liệu rút tiền. Vui lòng kiểm tra quyền admin."
          );
          return;
        }

        const data = await response.json();
        setPendingWithdrawRequests(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        toast.error("Đã xảy ra lỗi khi gọi API. Vui lòng thử lại sau.");
      }
    };

    fetchPendingWithdrawRequests();
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

      if (!response.ok) {
        toast.error("Không thể duyệt yêu cầu rút tiền. Vui lòng thử lại sau.");
        return;
      }

      toast.success("Yêu cầu rút tiền đã được duyệt thành công.");
      setPendingWithdrawRequests(
        pendingWithdrawRequests.filter(
          (request) => request.withdrawID !== withdrawID
        )
      );
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      toast.error("Đã xảy ra lỗi khi duyệt yêu cầu. Vui lòng thử lại sau.");
    }
  };

  const filteredWithdrawRequests = pendingWithdrawRequests.filter((request) =>
    request.customerID.toString().includes(searchCustomerID)
  );

  return (
    <div className="withdraw-approval-container">
      <h2>Duyệt yêu cầu rút tiền</h2>
      <div className="withdraw-tables-container">
        <div className="withdraw-table pending-table">
          <h3>Yêu cầu rút tiền đang chờ duyệt</h3>
          {filteredWithdrawRequests.length === 0 ? (
            <p>Không có yêu cầu rút tiền nào cần duyệt.</p>
          ) : (
            <table className="withdraw-requests-table">
              <thead>
                <tr>
                  <th>Withdraw ID</th>
                  <th>Customer ID</th>
                  <th>Số tiền</th>
                  <th>Trạng thái</th>
                  <th>Ngày yêu cầu</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredWithdrawRequests.map((request) => (
                  <tr key={request.withdrawID}>
                    <td>{request.withdrawID}</td>
                    <td>{request.customerID}</td>
                    <td>{request.amount} VND</td>
                    <td>{request.status}</td>
                    <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleApproveRequest(request.withdrawID)}
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
          <div className="search-container">
            <input
              type="text"
              placeholder="Tìm kiếm theo Customer ID"
              value={searchCustomerID}
              onChange={(e) => setSearchCustomerID(e.target.value)}
            />
          </div>
          <p>Chưa có dữ liệu.</p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawApprovalPage;
