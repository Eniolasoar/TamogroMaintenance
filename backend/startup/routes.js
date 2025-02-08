import maintenanceRoutes from '../routes/maintenance.js';
import technicianRoutes from '../routes/technician.js';
import sparepartRoutes from '../routes/spare_parts.js';
import error from '../middleware/error.js';

export default function (app) {
  app.use('/api/maintenance', maintenanceRoutes);
  app.use('/api/technician', technicianRoutes);
  app.use('/api/sparepart', sparepartRoutes);
    app.use(error);


}
