import * as maintenanceController from '../controllers/maintenance.js';
import express from 'express';
const router = express.Router();

router.get('/all-requests', maintenanceController.getMaintenanceRequests);
router.get('/request:id', maintenanceController.getSingleMaintenanceRequest);
router.post('/create-request', maintenanceController.createMaintenanceRequest);
router.put('/update-request:id', maintenanceController.updateMaintenanceRequest);
router.delete('/delete-request:id', maintenanceController.deleteMaintenanceRequest);

export default router;