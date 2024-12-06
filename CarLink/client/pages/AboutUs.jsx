import React from "react";
import "../styles/about-us.css";

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-us-header">
                <h1>CarLink - Kết nối hành trình, tối ưu trải nghiệm!</h1>
                <p>Đồng hành cùng bạn trên mọi hành trình!</p>
            </div>

            <div className="about-us-content">
                <section className="mission">
                    <h2 className="about-us__heading--mission">Sứ mệnh của chúng tôi</h2>
                    <p>
                        CarLink hướng đến việc kết nối những chủ sở hữu xe ít sử dụng xe của họ với những người có nhu cầu thuê xe, phục vụ mục đích du lịch, khám phá, hay di chuyển đi phượt trong thành phố một mình, cùng bạn bè hay gia đình,vv. Chúng tôi hướng đến việc tối ưu hóa nguồn tài nguyên, giảm thiểu lãng phí và mang lại trải nghiệm thuê xe tiện lợi, an toàn, và đáng tin cậy cho mọi khách hàng.
                    </p>
                </section>

                <section className="how-we-work">
                    <h2 className="about-us__heading--work">Cách chúng tôi hoạt động</h2>
                    <ul>
                        <li>
                            <strong>Dành cho chủ xe:</strong> Đăng ký xe của bạn trên CarLink để biến những chiếc xe <strong>"nhàn rỗi"</strong> thành nguồn thu nhập dễ dàng.
                        </li>
                        <li>
                            <strong>Dành cho người thuê xe:</strong> Tìm chiếc xe hoàn hảo cho nhu cầu của bạn, đặt thuê nhanh chóng và tận hưởng hành trình trọn vẹn.
                        </li>
                    </ul>
                </section>

                <section className="commitments">
                    <h2 className="about-us__heading--commit">Cam kết của chúng tôi</h2>
                    <p>
                        Tại CarLink, chúng tôi cam kết đảm bảo:
                    </p>
                    <ul>
                        <li>An toàn và bảo mật thông tin.</li>
                        <li>Dịch vụ hỗ trợ khách hàng tận tâm 24/7.</li>
                        <li>Quy trình đặt xe và thanh toán tiện lợi.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
