import React from "react";
import styles from "../styles/Privacy.module.css";

const Privacy = () => {
    return (
        <div className={styles.privacyContainer}>
            <div className={styles.privacyHeader}>
                <h1>Chính sách & Quy định</h1>
            </div>

            <div className={styles.privacyContent}>
                <section className={styles.policySection}>
                    <h2>1. Trách nhiệm của khách thuê xe và chủ xe trong giao dịch cho thuê xe tự lái</h2>
                    
                    <div className={styles.responsibilityBlock}>
                        <h3>A. Trách nhiệm của chủ xe</h3>
                        <ul>
                            <li>Giao xe và toàn bộ giấy tờ liên quan đến xe đúng thời gian và trong tình trạng an toàn, vệ sinh sạch sẽ nhằm đảm bảo chất lượng dịch vụ.</li>
                            <li>Các giấy tờ xe liên quan bao gồm: giấy đăng ký xe (bản photo công chứng), giấy kiểm định, giấy bảo hiểm xe (bản photo công chứng hoặc bản gốc).</li>
                            <li>Chịu trách nhiệm pháp lý về nguồn gốc và quyền sở hữu của xe.</li>
                        </ul>
                    </div>

                    <div className={styles.responsibilityBlock}>
                        <h3>B. Trách nhiệm khách thuê xe</h3>
                        <ul>
                            <li>Kiểm tra kỹ xe trước khi nhận và trước khi hoàn trả xe. Kí xác nhận biên bản bàn giao về tình trạng xe khi nhận và khi hoàn trả.</li>
                            <li>Thanh toán đầy đủ tiền thuê xe cho Chủ xe khi nhận xe.</li>
                            <li>Xuất trình đầy đủ các giấy tờ liên quan khi nhận xe.</li>
                            <li>Tuân thủ quy định và thời gian trả xe như 2 bên đã thỏa thuận.</li>
                            <li>Chịu trách nhiệm đền bù mọi thất thoát về phụ tùng, phụ kiện của xe.</li>
                        </ul>
                    </div>
                </section>

                <section className={styles.policySection}>
                    <h2>2. Chính sách hủy chuyến</h2>
                    
                    <div className={styles.cancellationBlock}>
                        <h3>A. Dành cho khách thuê xe</h3>
                        <table className={styles.cancellationTable}>
                            <thead>
                                <tr>
                                    <th>Thời điểm hủy chuyến</th>
                                    <th>Phí hủy chuyến</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Trong vòng 1h sau giữ chỗ</td>
                                    <td>Miễn phí</td>
                                </tr>
                                <tr>
                                    <td>Trước chuyến đi (≥7) ngày (Sau 1h Giữ Chỗ)</td>
                                    <td>10% giá trị chuyến đi</td>
                                </tr>
                                <tr>
                                    <td>Trong vòng 7 ngày trước chuyến đi (Sau 1h Giữ Chỗ)</td>
                                    <td>33% giá trị chuyến đi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div className={styles.cancellationBlock}>
                        <h3>B. Dành cho chủ xe</h3>
                        <table className={styles.cancellationTable}>
                            <thead>
                                <tr>
                                    <th>Thời điểm hủy chuyến</th>
                                    <th>Phí hủy chuyến</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Trong vòng 1h sau giữ chỗ</td>
                                    <td>Miễn phí</td>
                                </tr>
                                <tr>
                                    <td>Trước chuyến đi (≥7) ngày (Sau 1h Giữ Chỗ)</td>
                                    <td>10% giá trị chuyến đi</td>
                                </tr>
                                <tr>
                                    <td>Trong vòng 7 ngày trước chuyến đi (Sau 1h Giữ Chỗ)</td>
                                    <td>33% giá trị chuyến đi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className={styles.policySection}>
                    <h2>3. Chính sách thanh toán</h2>
                    <p>Sau khi nhận được sự đồng ý cho thuê xe từ phía chủ xe, khách hàng cần thanh toán:</p>
                    <ul>
                        {/* <li>Phí giữ chỗ: 30% hoặc 100% Giá trị chuyến đi</li> */}
                        <li>Hình thức thanh toán: Chuyển khoản qua ngân hàng trực tuyến hoặc Visa</li>
                        <li>Đối với thanh toán 30%, phần còn lại 70% sẽ thanh toán trực tiếp cho chủ xe khi nhận xe</li>
                    </ul>
                </section>

                <section className={styles.policySection}>
                    <h2>4. Chính sách thời gian giao nhận</h2>
                    <ul>
                        <li>Thời gian thuê xe mặc định: từ 9h tối đến 8h tối ngày kế tiếp</li>
                        <li>Khách hàng có thể tùy chỉnh thời gian theo nhu cầu (trong vòng 24 giờ được tính 1 ngày)</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
