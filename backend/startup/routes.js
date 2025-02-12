import customerRoutes from '../routes/customer_care.js';
import technicianRoutes from '../routes/technician.js';
import error from '../middleware/error.js';

export default function (app) {
  app.use('/api/customer-care', customerRoutes);
  app.use('/api/technician', technicianRoutes);
  app.use(error);


}
