import React, { useState } from 'react';
import styles from './ReportForm.module.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ReportForm = ({ bookingID }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [videoFile, setVideoFile] = useState(null);

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('bookingID', bookingID);
            formData.append('idCard', data.idCard);
            formData.append('returnDate', data.returnDate);
            formData.append('description', data.description);

            if (videoFile) {
                formData.append('damageVideo', videoFile);
            }

            const response = await fetch('http://localhost:8000/api/reports/create', {
                method: 'POST',
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

    const renderFormField = (name, label, type = 'text', options = {}) => (
        <div className={styles.formGroup}>
            <label>{label}</label>
            <input
                type={type}
                {...register(name, options)}
            />
            {errors[name] && <p className={styles.errorMessage}>{errors[name].message}</p>}
        </div>
    );

    return (
        <div className={styles.reportForm}>
            <h2 className={styles.reportHeading}>Gửi báo cáo</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {renderFormField('idCard', 'CMND/CCCD', 'text', { required: 'Vui lòng nhập CMND/CCCD' })}
                {renderFormField('returnDate', 'Ngày trả xe', 'datetime-local', { required: 'Vui lòng chọn ngày trả xe' })}

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
                    disabled={loading}
                >
                    {loading ? 'Đang gửi...' : 'Gửi báo cáo'}
                </button>
            </form>
        </div>
    );
};

export default ReportForm;
