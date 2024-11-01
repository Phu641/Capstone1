import { Request, Response, NextFunction } from "express";
import { Role } from "../models";

export const checkRole = (allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // Tìm role của user
            const userRole = await Role.findOne({
                where: { customerID: user.customerID }
            });

            if (!userRole) {
                return res.status(403).json({ message: "No role assigned" });
            }

            // Kiểm tra xem role có được phép không
            if (!allowedRoles.includes(userRole.type)) {
                return res.status(403).json({ 
                    message: "You don't have permission to access this resource"
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: "Error checking role" });
        }
    };
};