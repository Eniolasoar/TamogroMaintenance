import { Maintenance, validateMaintenanceRequest } from "../models/maintenance.js";

export async function getMaintenanceRequests(req, res) {
  const maintenanceRequests = await Maintenance.find().sort("-date");
  res.json({message: "Maintenance Requests:", maintenanceRequests});
}

export async function getSingleMaintenanceRequest(req, res) {
  const maintenanceRequest = await Maintenance.findById(req.params.id);
  if (!maintenanceRequest) return res.status(404).json({error: "Maintenance Request not found"});
  res.json({message: "Maintenance Request:", maintenanceRequest});
}

export async function createMaintenanceRequest(req, res) {
  const { error } = validateMaintenanceRequest(req.body);
  if (error) return res.status(400).json({error: error.details[0].message});

  const maintenanceRequest = new Maintenance(req.body);
  await maintenanceRequest.save();
  res.json({message: "Maintenance Request created successfully", maintenanceRequest});
}

export async function updateMaintenanceRequest(req, res) {
  const { error } = validateMaintenanceRequest(req.body);
  if (error) return res.status(400).json({error: error.details[0].message});

  const maintenanceRequest = await Maintenance.findByIdAndUpdate(req.params.id, req.body, {new: true});
  if (!maintenanceRequest) return res.status(404).json({error: "Maintenance Request not found"});
  res.json({message: "Maintenance Request updated successfully", maintenanceRequest});
}

export async function deleteMaintenanceRequest(req, res) {
  const maintenanceRequest = await Maintenance.findByIdAndDelete(req.params.id);
  if (!maintenanceRequest) return res.status(404).json({error: "Maintenance Request not found"});
  res.json({message: "Maintenance Request deleted successfully", maintenanceRequest});
}

