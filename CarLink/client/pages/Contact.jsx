import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "../styles/Contact.css";

const Contact = () => {
    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_0v1l5na",
                "template_49sji9x",
                formRef.current,
                "v-1EKWmhCYYyHgQ2y"
            )
            .then(
                (result) => {
                    alert("Email đã được gửi thành công!");
                    console.log(result.text);
                },
                (error) => {
                    alert("Đã xảy ra lỗi khi gửi email.");
                    console.log(error.text);
                }
            );

        e.target.reset();
    };

    return (
        <div className="contactContainer">
            <h1 className="heading">Liên hệ với chúng tôi</h1>
            <p className="description">
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
