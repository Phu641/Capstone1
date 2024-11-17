import React, { useState } from "react";
import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../../styles/payment-method.css";

const PaymentMethod = () => {
  const [bankTransfer, setBankTransfer] = useState(false);
  const [checkPayment, setCheckPayment] = useState(false);
  const [masterCardPayment, setMasterCardPayment] = useState(false);
  const [paypalPayment, setPaypalPayment] = useState(false);
  const [offlinePayment, setOfflinePayment] = useState(false);
  const [error, setError] = useState(""); // State lưu thông báo lỗi

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !bankTransfer &&
      !checkPayment &&
      !masterCardPayment &&
      !paypalPayment &&
      !offlinePayment
    ) {
      setError("Vui lòng chọn một phương thức thanh toán.");
    } else {
      setError(""); // Xóa lỗi nếu có phương thức thanh toán được chọn
      alert("Chưa làm");
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-heading">Chọn Phương Thức Thanh Toán</h2>
      {/* Thêm thẻ h1 */}

      <form onSubmit={handleSubmit}>
        <div className="payment">
          <label className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={bankTransfer}
              onChange={(e) => setBankTransfer(e.target.checked)}
            />
            Chuyển khoản Ngân hàng Trực tiếp
          </label>
        </div>

        <div className="payment mt-3">
          <label className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={checkPayment}
              onChange={(e) => setCheckPayment(e.target.checked)}
            />
            Thanh toán bằng Séc
          </label>
        </div>

        <div className="payment mt-3 d-flex align-items-center justify-content-between">
          <label className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={masterCardPayment}
              onChange={(e) => setMasterCardPayment(e.target.checked)}
            />
            Thẻ MasterCard
          </label>
          <img className="paymment__matterCard-img" src={masterCard} alt="" />
        </div>

        <div className="payment mt-3 d-flex align-items-center justify-content-between">
          <label className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={paypalPayment}
              onChange={(e) => setPaypalPayment(e.target.checked)}
            />
            Paypal
          </label>
          <img src={paypal} alt="" />
        </div>

        <div className="payment mt-3">
          <label className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={offlinePayment}
              onChange={(e) => setOfflinePayment(e.target.checked)}
            />
            Thanh toán Ngoại tuyến
          </label>
        </div>

        {/* Hiển thị lỗi nếu không có phương thức thanh toán nào được chọn */}
        {error && <p className="error">{error}</p>}

        <div className="payment text-end mt-5">
          <button type="submit">Đặt Ngay</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
