import React from "react";

import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../../styles/payment-method.css";

const PaymentMethod = () => {
  return (
    <>
    <div className="payment-container">
        <div className="payment">
          <label htmlFor="" className="d-flex align-items-center gap-2">
            <input type="checkbox" />Chuyển khoản Ngân hàng Trực tiếp
          </label>
        </div>

        <div className="payment mt-3">
          <label htmlFor="" className="d-flex align-items-center gap-2">
            <input type="checkbox" />Thanh toán bằng Séc
          </label>
        </div>

        <div className="payment mt-3 d-flex align-items-center justify-content-between">
          <label htmlFor="" className="d-flex align-items-center gap-2">
            <input type="checkbox" /> Thẻ MasterCard
          </label>
          <img className="paymment__matterCard-img" src={masterCard} alt="" />
        </div>

        <div className="payment mt-3 d-flex align-items-center justify-content-between">
          <label htmlFor="" className="d-flex align-items-center gap-2">
            <input type="checkbox" /> Paypal
          </label>
          <img src={paypal} alt="" />
        </div>

        <div className="payment mt-3">
          <label htmlFor="" className="d-flex align-items-center gap-2">
            <input type="checkbox" /> Thanh toán Ngoại tuyến
          </label>
        </div>

        <div className="payment text-end mt-5">
          <button>Đặt Ngay</button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
