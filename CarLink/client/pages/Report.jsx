import React, { useState, useEffect } from 'react';
import ReportForm from '../src/components/Report/ReportForm';
import { useParams, Navigate } from 'react-router-dom';
import styles from '../styles/ReportForm.module.css';

const Report = () => {
  const { bookingID } = useParams();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUserRole(null);
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/customer/check-role', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch role');
        }

        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error('Error checking role:', error);
        localStorage.removeItem('token');
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userRole || userRole !== 'owner') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportWrapper}>
        <ReportForm bookingID={bookingID} />
      </div>
    </div>
  );
};

export default Report;
