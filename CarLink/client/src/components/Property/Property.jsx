import React from 'react';
import './Property.css';

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
    <div className="property-container">
      <h2>Browse By Brands</h2>
      <div className="brands-grid">
        {brands.map((brand) => (
          <div key={brand.name} className="brand-card">
            <img src={brand.logo} alt={`${brand.name} logo`} className="brand-logo" />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
