import React from "react";
import styles from "../styles/Terms.module.css";

const Terms = () => {
    return (
        <div className={styles.termsContainer}>
            <div className={styles.termsHeader}>
                <h1>Nguyên tắc chung</h1>
            </div>

            <div className={styles.termsContent}>
                <section className={styles.principleSection}>
                    <h2>Trách nhiệm và trung thực</h2>
                    <p>
                        CARLINK hướng đến việc xây dựng một cộng đồng thuê xe với mong muốn mang lại sự tiện ích cho khách thuê xe và chủ xe. 
                        Chính vì vậy, khách thuê xe cần có trách nhiệm giữ gìn xe thuê, và trân trọng như chính xe của bạn. 
                        Nếu có phát sinh vấn đề hay bất cứ sự cố nào đối với xe trên chuyến đi của bạn, 
                        hãy mạnh dạn giải quyết với chủ xe một cách <strong>TRUNG THỰC</strong> và <strong>CÓ TRÁCH NHIỆM</strong>.
                    </p>
                </section>

                <section className={styles.principleSection}>
                    <h2>Tạo sự tin tưởng</h2>
                    <p>
                        Các chủ xe hãy tạo hồ sơ của mình trên ứng dụng CARLINK thật rõ ràng và minh bạch, bao gồm các hình ảnh cá nhân, 
                        tên, thông tin liên lạc của bạn, mô tả kĩ càng và đầu tư nhiều vào chất lượng hình ảnh để chiếc xe của bạn trông thật cuốn hút, 
                        điều này sẽ giúp khách thuê <strong>TIN TƯỞNG</strong> và tỉ lệ thuê xe của bạn sẽ cao hơn.
                    </p>
                    {/* <p>
                        Bạn có thể kiểm tra trực tuyến hồ sơ của Khách hàng trước khi quyết định cho thuê, 
                        điều này sẽ giúp bạn an tâm hơn trước khi giao chìa khóa xe cho những vị khách của mình.
                    </p> */}
                </section>

                <section className={styles.principleSection}>
                    <h2>Hãy giữ xe sạch sẽ</h2>
                    <p>
                        CARLINK hướng đến việc xây dựng một cộng đồng văn minh, vì vậy hãy yêu quý và giữ vệ sinh những chiếc xe bạn thuê. 
                        Việc giao nhận và hoàn trả những chiếc xe <strong>SẠCH SẼ</strong> giúp cả hai bên kết thúc giao dịch một cách tốt đẹp 
                        và sẵn sàng cho những giao dịch tuyệt vời sau này.
                    </p>
                </section>

                <section className={styles.principleSection}>
                    <h2>Thông báo ngay khi có vấn đề phát sinh</h2>
                    <p>
                        Bất kì khi nào có phát sinh vấn đề trong quá trình thuê xe, chủ xe và khách thuê xe nên <strong>THÔNG BÁO</strong> ngay cho nhau, 
                        và sử dụng các điều khoản trong hợp đồng thuê xe hoặc các chính sách của CARLINK được đăng trên website CARLINK.vn 
                        để giải quyết nhanh chóng.
                    </p>
                </section>

                <section className={styles.principleSection}>
                    <h2>Tuân thủ pháp luật</h2>
                    <p>
                        Các chủ xe có trách nhiệm đảm bảo xe của bạn có đầy đủ giấy tờ pháp lý và trong tình trạng <strong>AN TOÀN</strong> trước khi giao xe cho khách.
                    </p>
                    <p>
                        Khách thuê xe có trách nhiệm <strong>CHẤP HÀNH</strong> nghiêm chỉnh luật lệ giao thông và tuân thủ tất cả các điều luật 
                        hiện hành có liên quan trong thời gian thuê xe.
                    </p>
                </section>

                <section className={styles.principleSection}>
                    <h2>Cuối cùng...</h2>
                    <p>
                        Nếu giữa hai bên chủ xe và khách thuê xe không thể tự giải quyết các vấn đề tranh chấp phát sinh, 
                        hãy liên hệ với bộ phận Chăm sóc Khách hàng của CARLINK. Chúng tôi luôn bên cạnh để hỗ trợ bạn dàn xếp các vấn đề 
                        một cách tốt đẹp nhất, tuân theo các điều khoản, chính sách và quy chế hoạt động cả hai bên đã cam kết với CARLINK.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
