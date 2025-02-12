import * as customerCareController from '../controllers/customer_care.js';
import { authMiddleWare } from '../middleware/auth.js';
import * as maintenanceController from '../controllers/maintenance.js';
import express from 'express';
const router = express.Router();

router.post('/create',  customerCareController.createCutomerAdmin);
router.post('/login', customerCareController.loginCustomerAdmin);

router.get('/maintenance', authMiddleWare('Cpersonnel'), maintenanceController.getMaintenanceRequests);
router.post('/create-maintenance', authMiddleWare('Cpersonnel'), maintenanceController.createMaintenanceRequest);
router.put('/update-maintenance/:id', authMiddleWare('Cpersonnel'), maintenanceController.updateMaintenanceRequest);
router.delete('/delete-maintenance/:id', authMiddleWare('Cpersonnel'), maintenanceController.deleteMaintenanceRequest);


router.get('/pending-work', authMiddleWare('Cpersonnel'), maintenanceController.pendingWork);
router.get('/ongoing-work', authMiddleWare('Cpersonnel'), maintenanceController.ongoingWork);
router.get('/completed-work', authMiddleWare('Cpersonnel'), maintenanceController.completedWork);
export default router;
