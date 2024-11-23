import multer from 'multer';
import path from 'path';

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', 'images'); // Thư mục lưu file
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        cb(null, `${timestamp}_${file.originalname}`); // Tên file bao gồm timestamp
    },
});

export const uploadVideo = multer({
    storage: videoStorage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['video/mp4', 'video/mkv', 'video/avi', 'video/mov'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Chỉ chấp nhận các định dạng video: mp4, mkv, avi, mov.'));
        }
        cb(null, true);
    },
    limits: { fileSize: 1000 * 1024 * 1024 }, // Giới hạn 1000MB
}).single('damageVideo'); // Chỉ upload 1 file, key là 'damageVideo'
