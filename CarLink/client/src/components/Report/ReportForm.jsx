import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import styles from './ReportForm.module.css';

const TOAST_CONFIG = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
        color: 'black',
        fontSize: '16px',
        borderRadius: '10px',
        padding: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
};

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const ReportForm = () => {
    // Form hooks
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();

    // State management
    const [loading, setLoading] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Debounce function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    };

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
            setValue('bookingID', '');
            return;
        }

        // Kiểm tra số âm trước khi gửi request
        const num = parseInt(bookingID);
        if (num <= 0) {
            toast.error('Booking ID không hợp lệ', TOAST_CONFIG);
            setSelectedBooking(null);
            setValue('bookingID', '');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/owner/submit-report', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookingID,
                    validate: true
                })
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Booking không hợp lệ', TOAST_CONFIG);
                setSelectedBooking(null);
                setValue('bookingID', '');
                return;
            }

            if (data.booking) {
                setSelectedBooking(bookingID);
                setValue('bookingID', bookingID);
                setValue('returnDate', new Date().toISOString().slice(0, 16));
                setValue('idCard', data.booking.customerID);
            }
        } catch (error) {
            setSelectedBooking(null);
            setValue('bookingID', '');
        }
    };

    // Debounced version of handleBookingIDChange
    const debouncedHandleBookingIDChange = debounce(handleBookingIDChange, 2000);

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

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Đã xảy ra lỗi');
            }

            toast.success('Gửi báo cáo thành công', TOAST_CONFIG);
            setTimeout(() => navigate('/DashboardOwner'), 3500);
        } catch (error) {
            console.error('Error submitting report:', error);
            toast.error(error.message, TOAST_CONFIG);
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
                                value: /^\d+$/
                            },
                            validate: {
                                isValidNumber: (value) => {
                                    const num = parseInt(value);
                                    return num > 0;
                                }
                            }
                        })}
                        onChange={(e) => {
                            debouncedHandleBookingIDChange(e);
                        }}
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
                        {...register('idCard', {
                            required: 'Vui lòng nhập CMND/CCCD',
                            pattern: {
                                value: /^\d{12}$/,
                                message: 'Sai định dạng CMND/CCCD'
                            }
                        })}
                        className={styles.input}
                        placeholder="Nhập CMND/CCCD"
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
            <ToastContainer />
        </div>
    );
};

export default ReportForm;
