// cronJobs.ts
import cron from 'node-cron';
import { Op } from 'sequelize';
import { Withdraw } from '../models/Withdraw'; // Đảm bảo đường dẫn đến model chính xác
import { Booking, Transaction } from '../models';
import axios from 'axios';

// Hàm xoá các yêu cầu quá hạn
export const  deleteExpiredWithdrawRequests = async () => {
    try {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

        // Xoá các yêu cầu có trạng thái "pending" và đã quá hạn 5 ngày
        const deletedCount = await Withdraw.destroy({
            where: {
                status: 'pending',
                createdAt: {
                    [Op.lt]: fiveDaysAgo, // Các yêu cầu được tạo trước 5 ngày
                },
            },
        });

        console.log(`Đã xoá ${deletedCount} yêu cầu rút tiền.`);
    } catch (error) {
        console.error('Error deleting expired withdrawal requests:', error);
    }
};

// Cài đặt cron job chạy vào lúc 0:00 mỗi ngày
cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled task to delete expired withdrawal requests...');
    await deleteExpiredWithdrawRequests();
});

// Hàm xoá các booking "pending" quá hạn 5 phút
export const deleteExpiredPendingBookings = async () => {
    try {
        const fiveMinutesAgo = new Date();
        fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

        // Xoá các booking có trạng thái "pending" và đã quá hạn 5 phút
        const deletedCount = await Booking.destroy({
            where: {
                bookingStatus: 'pending',
                createdAt: {
                    [Op.lt]: fiveMinutesAgo, // Các booking được tạo trước 5 phút
                },
            },
        });

        console.log(`Đã xoá ${deletedCount} trường hợp đặt xe nhưng chưa thanh toán!.`);
    } catch (error) {
        console.error('Error deleting expired pending bookings:', error);
    }
};

// Cài đặt cron job chạy vào mỗi phút
cron.schedule('* * * * *', async () => {
    console.log('Đang chạy xoá booking khi không thanh toán...');
    await deleteExpiredPendingBookings();
});
