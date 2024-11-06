import React from 'react';
import styles from './Property.module.css';

const brands = [
  { name: 'Acura', logo: '1.png' },
  { name: 'Ford', logo: '2.png' },
  { name: 'Bentley', logo: '3.png' },
  { name: 'Chevrolet', logo: '4.png' },
  { name: 'Ferrari', logo: '5.png' },
  { name: 'Mercedes', logo: '6.png' },
];

const Property = () => {
  return (
    <div className={styles.propertyContainer}>
      <h2>Tìm kiếm xe theo thương hiệu</h2>
      <br />
      <div className={styles.brandsGrid}>
        {brands.map((brand) => (
          <div key={brand.name} className={styles.brandCard}>
            <img src={brand.logo} alt={`${brand.name} logo`} className={styles.brandLogo} />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
