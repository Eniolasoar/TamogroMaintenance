import {
  Maintenance,
  validateMaintenanceRequest,
  validateUpdateMaintenanceRequest
} from '../models/maintenance.js';
import axios from 'axios';

export async function getMaintenanceRequests(req, res) {
  const maintenanceRequests = await Maintenance.find().sort('-date');
  res.json({ message: 'Maintenance Requests:', maintenanceRequests });
}

export async function createMaintenanceRequest(req, res) {
  const { error } = validateMaintenanceRequest(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const CATEGORY_PRICES = {
    Electrical: 5000,
    Mechanical: 7000,
    Vehicle: 10000,
    Other: 3000,
  };

  const { staffId, maintenanceType } = req.body;
  const requiredBill = CATEGORY_PRICES[maintenanceType];
  
  const userResponse = await fetch(`https://tomoagro-api.vercel.app/api/users/${staffId}`);
  const userData = await userResponse.json(); // Convert to JSON
  
  if (!userResponse.ok || !userData) {
    return res.status(404).json({ error: 'Invalid staffId. No such staff found.' });
  }
  const transactionResponse = await fetch(
    `https://tomoagro-api.vercel.app/api/users/transactions/${staffId}`,
  );
  const transactionData = await transactionResponse.json();

  if (!transactionResponse.ok || !transactionData) {
    return res.status(404).json({ error: 'Could not retrieve staff balance' });
  }

  const staffBalance = transactionResponse.data.balance;
  if (staffBalance < requiredBill) {
    return res
      .status(400)
      .json({ error: 'Insufficient balance. Please fund your account.' });
  }

  await fetch(`https://tomoagro-api.vercel.app/api/transaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      staffId: staffId,
      amount: -requiredBill, // Deducting the amount
      type: "debit",
      description: `Maintenance request for ${category}`
    })
  });
  


  const maintenanceRequest = new Maintenance(req.body);
  await maintenanceRequest.save();
  res.json({
    message: 'Maintenance Request created successfully',
    maintenanceRequest,
  });
}

export async function updateMaintenanceRequest(req, res) {
  const { error } = validateUpdateMaintenanceRequest(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const maintenanceRequest = await Maintenance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  if (!maintenanceRequest)
    return res.status(404).json({ error: 'Maintenance Request not found' });
  res.json({
    message: 'Maintenance Request updated successfully',
    maintenanceRequest,
  });
}

export async function deleteMaintenanceRequest(req, res) {
  const maintenanceRequest = await Maintenance.findByIdAndDelete(req.params.id);
  if (!maintenanceRequest)
    return res.status(404).json({ error: 'Maintenance Request not found' });
  res.json({
    message: 'Maintenance Request deleted successfully',
    maintenanceRequest,
  });
}


export async function pendingWork(req,res) {
  const maintenanceRequests = await Maintenance.find({status: "Pending"}).sort('-date');
  res.json({ message: 'Pending Maintenance Requests:', maintenanceRequests });
  
}

export async function ongoingWork(req,res) {
  const maintenanceRequests = await Maintenance.find({status: "Ongoing"}).sort('-date');
  res.json({ message: 'Ongoing Maintenance Requests:', maintenanceRequests });
  
}

export async function completedWork(req,res) {
  const maintenanceRequests = await Maintenance.find({status: "Completed"}).sort('-date');
  res.json({ message: 'Completed Maintenance Requests:', maintenanceRequests });
  
}