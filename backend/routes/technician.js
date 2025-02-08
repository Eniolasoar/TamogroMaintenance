import * as technicianController from '../controllers/technician.js';
import express from 'express';
const router = express.Router();

router.get('/all-technicians', technicianController.getTechnicians);
router.get('/technician:id', technicianController.getSingleTechnician);
router.post('/create-technician', technicianController.createTechnician);
router.put('/update-technician:id', technicianController.updateTechnician);
router.delete('/delete-technician:id', technicianController.deleteTechnician);

export default router;