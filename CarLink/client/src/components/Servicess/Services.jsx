import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Services.module.css';

const services = [
  {
    title: 'Thuê xe dễ dàng',
    description: 'Chọn xe phù hợp với bạn từ hàng ngàn mẫu xe có sẵn.',
    link: '/Cars'
  },
  {
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ hỗ trợ luôn sẵn sàng giúp bạn bất kỳ lúc nào.',
    externalLink: 'https://zalo.me/g/ivcyhu790'
  },
  {
    title: 'Tiết kiệm chi phí',
    description: 'Nhận giá tốt nhất cho mọi hành trình của bạn.',
    link: '/Cars'
  },
];

const Services = () => {
  return (
    <section className={styles.servicesSection}>
      <h2>Lợi Ích</h2>
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {service.link && (
              <Link to={service.link} className={styles.serviceLink}>
                Khám phá ngay
              </Link>
            )}
            {service.externalLink && (
              <a href={service.externalLink} target="_blank" rel="noopener noreferrer" className={styles.serviceLink}>
                Hỗ trợ ngay
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
