import React from "react";
import "../styles/blog.css";

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Lợi ích của việc thuê xe tự lái tại Việt Nam",
            date: "02/12/2024",
            excerpt: "Thuê xe tự lái đang trở thành xu hướng phổ biến tại Việt Nam, giúp bạn tự do khám phá những vùng đất mới mà không lo phụ thuộc vào phương tiện công cộng...",
            content: "Thuê xe tự lái tại Việt Nam mang lại nhiều lợi ích đáng kể cho cả khách du lịch và người dân địa phương. Đầu tiên, nó tạo sự tự do tuyệt đối trong việc di chuyển, cho phép bạn tự lên kế hoạch và thay đổi lộ trình theo ý muốn mà không bị ràng buộc bởi các phương tiện công cộng hay lịch trình của tài xế. Điều này đặc biệt thuận tiện khi bạn muốn khám phá những vùng đất mới hoặc những địa điểm ít người biết đến, mà không phải lo lắng về việc đi theo nhóm hay bị giới hạn bởi thời gian. Bên cạnh đó, thuê xe tự lái còn giúp tiết kiệm chi phí, đặc biệt là đối với các chuyến đi dài hoặc nhóm đông người, vì bạn chỉ phải trả tiền thuê xe mà không phải chia sẻ thêm chi phí cho tài xế. Hơn nữa, việc lái xe cũng giúp bạn trải nghiệm cuộc sống địa phương một cách chân thật hơn, tự mình khám phá những con đường nhỏ, quán ăn đặc sản và các điểm tham quan không có trong tour du lịch. Với các dịch vụ cho thuê xe hiện đại, xe được bảo dưỡng tốt và trang bị đầy đủ các tính năng an toàn, bạn sẽ cảm thấy yên tâm hơn khi lái xe, đồng thời có thể lựa chọn loại xe phù hợp với nhu cầu và ngân sách của mình.",
            image: "https://dulichgiakhang.com/wp-content/uploads/2024/04/cho-thue-tai-xe-lai-xe.jpg.webp",
        },
        {
            id: 2,
            title: "Top 5 điểm đến lý tưởng khi thuê xe du lịch ở Đà Nẵng",
            date: "28/11/2024",
            excerpt: "Cùng CarLink khám phá top 5 những điểm đến đẹp nhất Đà Nẵng mà bạn có thể tận hưởng trọn vẹn hơn khi thuê xe tự lái...",
            content: "Khi thuê xe tự lái ở Đà Nẵng, bạn có thể khám phá một cách trọn vẹn những điểm đến nổi bật của thành phố, từ Bà Nà Hills với không gian mát mẻ, cảnh sắc hùng vĩ và cầu Vàng nổi tiếng, đến Ngũ Hành Sơn với những ngọn núi linh thiêng và các hang động huyền bí, hay dạo quanh Cầu Rồng và Cầu Tình Yêu – nơi bạn có thể chiêm ngưỡng vẻ đẹp độc đáo của những cây cầu lấp lánh vào ban đêm. Bãi biển Mỹ Khê với làn nước trong xanh và bãi cát dài là nơi lý tưởng để thư giãn, trong khi đó, chỉ cách Đà Nẵng khoảng 30 phút lái xe, Hội An cổ kính lại mang đến những trải nghiệm về lịch sử, văn hóa và ẩm thực đặc sắc. Thuê xe tự lái không chỉ giúp bạn tiết kiệm thời gian mà còn mang lại sự linh hoạt, thoải mái trong việc lên kế hoạch và tận hưởng chuyến đi của mình.",
            image: "https://booking.muongthanh.com/upload_images/images/H%60/cau-vang-da-nang.jpg",
        },
        {
            id: 3,
            title: "Làm sao để chọn xe phù hợp với nhu cầu của bạn?",
            date: "20/11/2024",
            excerpt: "Việc chọn xe phù hợp giúp bạn có hành trình thoải mái và tiết kiệm hơn. Dưới đây là các mẹo từ CarLink để chọn chiếc xe lý tưởng...",
            content: "Khi chọn xe phù hợp cho chuyến đi của mình, bạn cần cân nhắc nhiều yếu tố, bao gồm số lượng người tham gia để chọn xe có đủ không gian, nếu đi cùng gia đình hoặc nhóm bạn đông thì một chiếc xe 7 chỗ hoặc SUV sẽ là lựa chọn lý tưởng, trong khi đó nếu chỉ đi một mình hoặc với người bạn đồng hành thì các mẫu xe sedan hoặc hatchback sẽ tiết kiệm chi phí và dễ di chuyển hơn; ngoài ra, bạn cũng nên xem xét điều kiện địa hình, nếu chuyến đi của bạn bao gồm cả đường núi hoặc địa hình khó khăn thì việc chọn xe có hệ thống dẫn động 4 bánh sẽ giúp bạn di chuyển dễ dàng hơn, bên cạnh đó, việc ưu tiên các mẫu xe tiết kiệm nhiên liệu cũng giúp giảm chi phí cho chuyến đi dài, và cuối cùng đừng quên kiểm tra các tính năng an toàn và công nghệ hỗ trợ lái để đảm bảo sự an toàn cho bạn trong suốt hành trình.",
            image: "https://bizweb.dktcdn.net/100/437/558/files/muc-dich-mua-xe-o-to-duc-thien-auto.png?v=1634744911188",
        },
    ];

    return (
        <div className="blog-page">
            <header className="blog-header">
                <h1>Blog của CarLink</h1>
                <p>Chia sẻ kinh nghiệm, mẹo thuê xe và những hành trình đáng nhớ tại Việt Nam.</p>
            </header>
            <section className="blog-list">
                {blogPosts.map((post) => (
                    <article key={post.id} className="blog-card">
                        <img src={post.image} alt={post.title} className="blog-image" />
                        <div className="blog-content">
                            <h2 className="blog-title">{post.title}</h2>
                            <p className="blog-date mt-2">Ngày đăng: {post.date}</p>
                            <p className="blog-excerpt">{post.excerpt}</p>
                            <a href={`/blog/${post.id}`} className="read-more">
                                Đọc thêm &rarr;
                            </a>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default Blog;