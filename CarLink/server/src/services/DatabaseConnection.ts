import { FlowValidateListInstance } from "twilio/lib/rest/studio/v2/flowValidate";
import sequelize from "./Sequelize";

export default async () => {
    try {
      await sequelize.sync({ force: false }); // `force: true` nếu muốn xóa và tạo lại bảng mỗi lần chạy
      console.log('Database synced successfully');
  
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};