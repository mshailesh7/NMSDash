import mongoose from "mongoose";

const EmissionFactorSchema = new mongoose.Schema({
  fuelType: { type: String, required: true },
  fuelSubType: { type: String, required: true },
  emissionFactor: { type: Number, required: true }  // CO2 emissions per unit
}, { collection: "emissionfactors" });

export default mongoose.model("EmissionFactor", EmissionFactorSchema);
