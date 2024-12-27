import express from 'express';
import { cancelPayment } from '../controllers';
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//CANCEL
router.post('/v2/payments/:paymentRequestId/cancel', cancelPayment as any);

export { router as PaymentRoute}