// cronJobs.ts
import cron from 'node-cron';
import { Op } from 'sequelize';
import { Withdraw } from '../models/Withdraw'; // Đảm bảo đường dẫn đến model chính xác

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

        console.log(`Deleted ${deletedCount} expired withdrawal requests.`);
    } catch (error) {
        console.error('Error deleting expired withdrawal requests:', error);
    }
};

// Cài đặt cron job chạy vào lúc 0:00 mỗi ngày
cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled task to delete expired withdrawal requests...');
    await deleteExpiredWithdrawRequests();
});
