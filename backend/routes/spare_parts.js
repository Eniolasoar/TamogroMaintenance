import * as sparePartsController from '../controllers/spare_parts.js';
import express from 'express';
const router = express.Router();

router.get('/all-spare-parts', sparePartsController.getSpareParts);
router.post('/create-spare-part', sparePartsController.createSparePart);
router.put('/update-spare-part:id', sparePartsController.updateSparePart);

export default router;