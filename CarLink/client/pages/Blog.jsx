import React from "react";
import "../styles/blog.css";

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Lợi ích của việc thuê xe tự lái tại Việt Nam",
            date: "02/12/2024",
            excerpt: "Thuê xe tự lái đang trở thành xu hướng phổ biến tại Việt Nam, giúp bạn tự do khám phá những vùng đất mới mà không lo phụ thuộc vào phương tiện công cộng...",
            image: "https://dulichgiakhang.com/wp-content/uploads/2024/04/cho-thue-tai-xe-lai-xe.jpg.webp",
        },
        {
            id: 2,
            title: "Top 5 điểm đến lý tưởng khi thuê xe du lịch ở Đà Nẵng",
            date: "28/11/2024",
            excerpt: "Cùng CarLink khám phá những điểm đến đẹp nhất Việt Nam mà bạn có thể tận hưởng trọn vẹn hơn khi thuê xe tự lái...",
            image: "https://booking.muongthanh.com/upload_images/images/H%60/cau-vang-da-nang.jpg",
        },
        {
            id: 3,
            title: "Làm sao để chọn xe phù hợp với nhu cầu của bạn?",
            date: "20/11/2024",
            excerpt: "Việc chọn xe phù hợp giúp bạn có hành trình thoải mái và tiết kiệm hơn. Dưới đây là các mẹo từ CarLink để chọn chiếc xe lý tưởng...",
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
