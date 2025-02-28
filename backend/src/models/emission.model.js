import mongoose from "mongoose";

const EmissionSchema = new mongoose.Schema({
  user:{type: String, required: true},
  scope:{type: String, required: true},
  activitytype:{type: String, required: true},
  date: { type: Date, required: true },
  fuelType: { type: String, required: true },
  fuelSubType: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
  emissionFactor: { type: Number, required: true },
  totalEmission: { type: Number, required: true }
});

export default mongoose.model("Emission", EmissionSchema);
