import mongoose from 'mongoose';

const TechnicianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    availability: { type: Boolean, default: true },
    assignedTasks: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'MaintenanceRequest' },
    ],
  },
  { timestamps: true },
);

const Technician = mongoose.model('Technician', TechnicianSchema);

function validateTechnician(technician) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    availability: Joi.boolean(),
    assignedTasks: Joi.array().items(Joi.objectId()),
  });
  return schema.validate(technician);
}

export { Technician, validateTechnician };