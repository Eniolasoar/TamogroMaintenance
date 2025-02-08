import { Technician, validateTechnician } from "../models/technician.js";

export async function getTechnicians(req, res) {
  const technicians = await Technician.find().sort("name");
  res.json({message: "Technicians:", technicians});
}

export async function getSingleTechnician(req, res) {
  const technician = await Technician.findById(req.params.id);//we'll change this to find by token
  if (!technician) return res.status(404).json({error: "Technician not found"});
  res.json({message: "Technician:", technician});
}

export async function createTechnician(req, res) {
  const { error } = validateTechnician(req.body);
  if (error) return res.status(400).json({error: error.details[0].message});

  const technician = new Technician(req.body);
  await technician.save();
  res.json({message: "Technician created successfully", technician});
}

export async function updateTechnician(req, res) {
  const { error } = validateTechnician(req.body);
  if (error) return res.status(400).json({error: error.details[0].message});

  const technician = await Technician.findByIdAndUpdate(req.params.id, req.body, {new: true});
  if (!technician) return res.status(404).json({error: "Technician not found"});
  res.json({message: "Technician updated successfully", technician});
}

export async function deleteTechnician(req, res) {
  const technician = await Technician.findByIdAndDelete(req.params.id);
  if (!technician) return res.status(404).json({error: "Technician not found"});
  res.json({message: "Technician deleted successfully", technician});
}