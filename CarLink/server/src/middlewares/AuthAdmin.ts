import { Request, Response, NextFunction } from 'express';
import { Role } from '../models';

export const AdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = req.user;

        if (!user) return res.status(401).json('Người dùng chưa được phân quyền!');

        const foundAdmin = await Role.findOne({where: { roleID: user.customerID, type: 'admin' }});

        if (foundAdmin) return next();

        return res.status(403).json({ message: 'Truy cập này chỉ dùng cho admin!'});

    } catch (error) {
        console.error('Lỗi với AdminMiddleware!', error);
        return res.status(500).json({ message: 'Lỗi server!' });
    }
};
