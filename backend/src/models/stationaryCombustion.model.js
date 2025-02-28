import mongoose from "mongoose";

// Define schema for stationary_combution collection
const StationaryCombustionSchema = new mongoose.Schema({}, { collection: "stationary_combution" });

const StationaryCombustion = mongoose.model("StationaryCombution", StationaryCombustionSchema);

export default StationaryCombustion;
