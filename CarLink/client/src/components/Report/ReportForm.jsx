import React, { useState, useEffect } from 'react';
import styles from './ReportForm.module.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ReportForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/owner/all-cars', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Không thể lấy danh sách xe');
                }

                const carData = await response.json();
                
                // Lọc ra các xe đang được thuê và có đầy đủ thông tin overview
                const bookedCars = carData.filter(car => 
                    car.booked && 
                    car.overview && 
                    car.overview.model && 
                    car.overview.address
                );
                setBookings(bookedCars);
            } catch (error) {
                toast.error('Không thể lấy danh sách xe đang cho thuê');
                console.error('Error fetching cars:', error);
            }
        };

        fetchBookings();
    }, []);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('bookingID', selectedBooking);
            formData.append('idCard', data.idCard);
            formData.append('returnDate', data.returnDate);
            formData.append('description', data.description);

            if (videoFile) {
                formData.append('damageVideo', videoFile);
            }

            const response = await fetch('http://localhost:3000/owner/submit-report', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Đã xảy ra lỗi');
            }

            toast.success('Gửi báo cáo thành công');
            setTimeout(() => {
                navigate('/dashboard-owner');
            }, 3000);
        } catch (error) {
            toast.error(error.message || 'Không thể gửi báo cáo');
        } finally {
            setLoading(false);
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
        }
    };

    const handleBookingSelect = (e) => {
        setSelectedBooking(e.target.value);
        setValue('bookingID', e.target.value);
    };

    return (
        <div className={styles.reportForm}>
            <h2 className={styles.reportHeading}>Gửi Báo Cáo</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label>Chọn xe đang cho thuê</label>
                    <select 
                        onChange={handleBookingSelect}
                        className={styles.select}
                        required
                    >
                        <option value="">-- Chọn xe --</option>
                        {bookings && bookings.length > 0 ? (
                            bookings.map((car) => (
                                <option key={car.carID} value={car.carID}>
                                    {car.overview?.model || 'Không có tên'} - {car.overview?.address || 'Không có địa chỉ'}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>Không có xe nào đang cho thuê</option>
                        )}
                    </select>
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
