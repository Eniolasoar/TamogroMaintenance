import mongoose from "mongoose";
import Joi from "joi";

const MaintenanceRequestSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
    }, // Employee who made the request
    maintenanceType: { type: String, enum: ["Electrical", "Mechanical", "Vehicle", "Other"], required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Ongoing", "Completed", "Cancelled"], default: "Pending" },
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
        staffId: Joi.string().required().min(3),
        maintenanceType: Joi.string().valid("Electrical", "Mechanical", "Vehicle", "Other").required(),
        description: Joi.string().optional(),
        status: Joi.string().valid("Pending", "Ongoing", "Completed", "Cancelled"),
    });
    return schema.validate(maintenanceRequest);
}

function validateUpdateMaintenanceRequest(maintenanceRequest) {
  const schema = Joi.object({
      status: Joi.string().valid("Pending", "Ongoing", "Completed", "Cancelled").required(),
  });
  return schema.validate(maintenanceRequest);
}


export { Maintenance, validateMaintenanceRequest, validateUpdateMaintenanceRequest };