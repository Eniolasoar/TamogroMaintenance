import mongoose from "mongoose";
import Joi from "joi";

const MaintenanceRequestSchema = new mongoose.Schema(
  {
    category: { type: String, enum: ["Electrical", "Mechanical", "Plumbing", "Other"], required: true },
    urgency: { type: String, enum: ["Low", "Medium", "High"], required: true },
    description: { type: String, required: true },
    estimatedCost: { type: Number, required: false }, // Optional estimated cost
    status: { type: String, enum: ["Pending", "In Progress", "Completed", "Cancelled"], default: "Pending" },
    assignedTechnician: { type: mongoose.Schema.Types.ObjectId, ref: "Technician", default: null }, // Assigned technician
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Request creator
    date:{
        type: Date,
        default: Date.now
    }

  },
  { timestamps: true }
);


const Maintenance =  mongoose.model("MaintenanceRequest", MaintenanceRequestSchema);


function validateMaintenanceRequest(maintenanceRequest) {
    const schema = Joi.object({
        category: Joi.string().valid("Electrical", "Mechanical", "Plumbing", "Other").required(),
        urgency: Joi.string().valid("Low", "Medium", "High").required(),
        description: Joi.string().required(),
        estimatedCost: Joi.number(),
        status: Joi.string().valid("Pending", "In Progress", "Completed", "Cancelled"),
        assignedTechnician: Joi.objectId(),
        createdBy: Joi.objectId().required(),

    });
    return schema.validate(maintenanceRequest);
}

export { Maintenance, validateMaintenanceRequest };