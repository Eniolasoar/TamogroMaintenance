import { Technician, validateTechnician } from "../models/technician.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils/token.js";
import { Maintenance } from "../models/maintenance.js";

export async function getTechnicians(req, res) {
  const technicians = await Technician.find().sort("name");
  res.json({message: "Technicians:", technicians});
}


export async function createTechnician(req, res) {
  const { error } = validateTechnician(req.body);
  if (error) return res.status(400).json({error: error.details[0].message});

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const technician = new Technician({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    username: req.body.username,
    password: hashedPassword
  });
  await technician.save();

  const token = generateAuthToken(technician);
  res.header('x-auth-token', token).status(201).json({message: "Technician created successfully", technician});
}

export async function loginTechnician(req, res) {
  const { email, password } = req.body;

  const technician = await Technician.findOne({email});
  if (!technician) return res.status(400).json({error: "Invalid email or password"});

  const validPassword = await bcrypt.compare(password, technician.password);
  if (!validPassword) return res.status(400).json({error: "Invalid email or password"});

  const token = generateAuthToken(technician);
  res.header('x-auth-token', token).status(200).json({message: "Login successful", token});
}

export async function updateTechnician(req, res) {
  const { error } = validateTechnician(req.body);
  if (error) return res.status(400).json({error: error.details[0].message});

  const technician = await Technician.findByIdAndUpdate(req.params.id, req.body, {new: true});
  if (!technician) return res.status(404).json({error: "Technician not found"});
  res.status(200).json({message: "Technician updated successfully", technician});
}

export async function deleteTechnician(req, res) {
  const technician = await Technician.findByIdAndDelete(req.params.id);
  if (!technician) return res.status(404).json({error: "Technician not found"});
  res.status(200).json({message: "Technician deleted successfully", technician});
}

export async function updateMaintenanceStatus(req,res) {
  const maintenanceRequest = await Maintenance.find({status: "Ongoing"}).sort('-date');
  if(!maintenanceRequest) return res.status(404).json({error: "No ongoing maintenance request found"});

  maintenanceRequest.status = "Completed";
  await maintenanceRequest.save();
  res.status(200).json({message: "Maintenance Request completed successfully", maintenanceRequest});
  
}

export async function completedWork(req,res) {
  const maintenanceRequests = await Maintenance.find({status: "Completed"}).sort('-date');
  res.status(200).json({ message: 'Completed Maintenance Requests:', maintenanceRequests });
  
}