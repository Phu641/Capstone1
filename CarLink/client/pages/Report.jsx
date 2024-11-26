import React from 'react';
import ReportForm from '../src/components/Report/ReportForm';
import { useParams } from 'react-router-dom';
import styles from '../styles/ReportForm.module.css';

const Report = () => {
  const { bookingID } = useParams();
  
  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportWrapper}>
        <ReportForm bookingID={bookingID} />
      </div>
    </div>
  );
};

export default Report;
