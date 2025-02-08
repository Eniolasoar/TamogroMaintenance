import { SparePart,validateSparePart } from "../models/spare_parts.js";

export async function getSpareParts(req, res) {
    const spareParts = await SparePart.find().sort("name");
    res.json({message: "Spare Parts:", spareParts});
    }


export async function createSparePart(req, res) {
    const { error } = validateSparePart(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const sparePart = new SparePart(req.body);
    await sparePart.save();
    res.json({message: "Spare Part created successfully", sparePart});
    }

export async function updateSparePart(req, res) {
    const { error } = validateSparePart(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    const sparePart = await SparePart.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!sparePart) return res.status(404).json({error: "Spare Part not found"});
    res.json({message: "Spare Part updated successfully", sparePart});
    }