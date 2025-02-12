import * as technicianController from '../controllers/technician.js';
import { authMiddleWare } from '../middleware/auth.js';
import express from 'express';
const router = express.Router();

router.get('/all-technicians', technicianController.getTechnicians);
router.post('/create-technician', technicianController.createTechnician);
router.put('/update-technician:id', technicianController.updateTechnician);
router.delete('/delete-technician:id', technicianController.deleteTechnician);

export default router;