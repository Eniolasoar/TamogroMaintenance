import mongoose from 'mongoose';

const TechnicianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type:String,
      default: 'Technician'
  },
  },
  { timestamps: true },
);

const Technician = mongoose.model('Technician', TechnicianSchema);

function validateTechnician(technician) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().unique().required(),
    phone: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  return schema.validate(technician);
}

export { Technician, validateTechnician };