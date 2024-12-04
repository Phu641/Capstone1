import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './ReportForm.module.css';

const ReportForm = () => {
    // Form hooks
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();

    // State management
    const [loading, setLoading] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Event handlers
    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleBookingIDChange = async (e) => {
        const bookingID = e.target.value;
        if (!bookingID) {
            setSelectedBooking(null);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/owner/active-bookings', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            const selectedBookingData = data.find(
                booking => booking.bookingID.toString() === bookingID
            );

            if (selectedBookingData) {
                setSelectedBooking(bookingID);
                setValue('bookingID', bookingID);
                setValue('returnDate', new Date().toISOString().slice(0, 16));
                if (selectedBookingData.idCard) {
                    setValue('idCard', selectedBookingData.idCard);
                }
            } else {
                toast.error('Không tìm thấy booking với ID này hoặc booking không thuộc về bạn');
                setSelectedBooking(null);
                setValue('bookingID', '');
            }
        } catch (error) {
            console.error('Error validating booking:', error);
            toast.error('Không thể kiểm tra thông tin booking');
        }
    };

    // Form submission
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();

            // Append form data
            formData.append('bookingID', data.bookingID);
            formData.append('idCard', data.idCard);
            formData.append('returnDate', data.returnDate);
            formData.append('description', data.description);

            if (videoFile) {
                formData.append('damageVideo', videoFile);
            }

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Vui lòng đăng nhập lại');
            }

            const response = await fetch('http://localhost:3000/owner/submit-report', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            // Thử parse text trước khi parse JSON
            const textResult = await response.text();
            let result;
            try {
                result = JSON.parse(textResult);
            } catch (e) {
                console.error('Error parsing response:', textResult);
                throw new Error('Invalid response format');
            }

            if (!response.ok) {
                throw new Error(result.message || 'Đã xảy ra lỗi');
            }

            toast.success('Gửi báo cáo thành công');
            setTimeout(() => {
                navigate('/dashboard-owner');
            }, 3500);
        } catch (error) {
            console.error('Error submitting report:', error);
            toast.error(error.message || 'Không thể gửi báo cáo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.reportForm}>
            <h2 className={styles.reportHeading}>Gửi Báo Cáo</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label>Nhập Booking ID</label>
                    <input
                        type="text"
                        {...register('bookingID', { 
                            required: 'Vui lòng nhập Booking ID',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Booking ID phải là số'
                            }
                        })}
                        onChange={handleBookingIDChange}
                        className={styles.input}
                        placeholder="Nhập Booking ID"
                    />
                    {errors.bookingID && 
                        <p className={styles.errorMessage}>{errors.bookingID.message}</p>
                    }
                </div>

                <div className={styles.formGroup}>
                    <label>CMND/CCCD</label>
                    <input
                        type="text"
                        {...register('idCard', { required: 'Vui lòng nhập CMND/CCCD' })}
                    />
                    {errors.idCard && <p className={styles.errorMessage}>{errors.idCard.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label>Ngày trả xe</label>
                    <input
                        type="datetime-local"
                        {...register('returnDate', { required: 'Vui lòng chọn ngày trả xe' })}
                    />
                    {errors.returnDate && <p className={styles.errorMessage}>{errors.returnDate.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label>Mô tả</label>
                    <textarea
                        {...register('description', { required: 'Vui lòng nhập mô tả' })}
                        placeholder="Mô tả các hư hỏng hoặc vấn đề..."
                    />
                    {errors.description && <p className={styles.errorMessage}>{errors.description.message}</p>}
                </div>

                <div className={styles.formGroup}>
                    <label>Video hư hỏng (không bắt buộc)</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                    />
                </div>

                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading || !selectedBooking}
                >
                    {loading ? 'Đang gửi...' : 'Gửi báo cáo'}
                </button>
            </form>
        </div>
    );
};

export default ReportForm;
