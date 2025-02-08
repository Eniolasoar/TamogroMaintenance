import mongoose from "mongoose";

const SparePartSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const SparePart =  mongoose.model("SparePart", SparePartSchema);


function validateSparePart(sparePart) {
    const schema = Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number(),
        price: Joi.number().required(),
    });
    return schema.validate(sparePart);
}

export { SparePart, validateSparePart };