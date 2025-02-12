import * as technicianController from '../controllers/technician.js';
import { authMiddleWare } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();

router.get('/all-technicians', technicianController.getTechnicians);

router.post('/create-technician', technicianController.createTechnician);
router.put('/update-technician:id', authMiddleWare('Technician'), technicianController.updateTechnician);
router.delete('/delete-technician:id',  technicianController.deleteTechnician);


router.get('/ongoing-work', authMiddleWare('Technician'), technicianController.ongoingWork);
router.get('/completed-work', authMiddleWare('Technician'), technicianController.completedWork);
export default router;