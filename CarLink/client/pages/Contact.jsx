import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Contact.css";

const TOAST_CONFIG = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }; 

const Contact = () => {
    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_imf3avt",
                "template_ipcd8mi",
                formRef.current,
                "xHQp6Hajb2cutV_uO"
            )
            .then(
                (result) => {
                    toast.success("🎉 Email đã được gửi thành công!", TOAST_CONFIG);
                    console.log(result.text);
                },
                (error) => {
                    toast.error("Đã xảy ra lỗi khi gửi email.", TOAST_CONFIG);
                    console.log(error.text);
                }
            );

        e.target.reset();
    };

    return (
        <div className="contactContainer">
            <ToastContainer />
            <h1 className="heading">Liên hệ với chúng tôi</h1>
            <p className="description1">
                Nếu bạn có câu hỏi hoặc góp ý về website, hãy liên hệ với chúng tôi. Chúng tôi luôn sẵn sàng lắng nghe!
            </p>
            <form ref={formRef} onSubmit={sendEmail} className="contactForm">
                <div className="formGroup">
                    <label htmlFor="name">Họ và tên</label>
                    <input type="text" id="name" name="user_name" placeholder="Nhập họ và tên của bạn" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="user_email" placeholder="Nhập email của bạn" required />
                </div>
                <div className="formGroup">
                    <label htmlFor="message">Tin nhắn</label>
                    <textarea id="message" name="message" rows="5" placeholder="Nhập tin nhắn của bạn" required></textarea>
                </div>
                <button type="submit" className="submitButton">
                    Gửi
                </button>
            </form>
            <div className="contactDetails">
                <p>📞 Hotline: +84 123 456 789</p>
                <p>📧 Email: rentalCar@gmail.com</p>
                <p>🏢 Địa chỉ: 123 Đường Ông Ích Khiêm, Phường abc, Quận XYZ, Đà Nẵng</p>
            </div>
        </div>
    );
};

export default Contact;
