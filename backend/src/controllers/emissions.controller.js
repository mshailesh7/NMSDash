import Emission from "../models/emission.model.js";
import EmissionFactor from "../models/emissionFactor.model.js";

export const calculateEmission = async (req, res) => {
  try {
    const { user,scope, activitytype, date, fuelType, fuelSubType, unit, quantity } = req.body;

    console.log("Received request:", { fuelType, fuelSubType });

    // Log the constructed regex patterns
    const fuelTypeRegex = new RegExp(`^${fuelType}$`, "i");
    const fuelSubTypeRegex = new RegExp(`^${fuelSubType}$`, "i");
    console.log("Searching with regex patterns:", {
      fuelTypeRegex: fuelTypeRegex.toString(),
      fuelSubTypeRegex: fuelSubTypeRegex.toString()
    });

    const emissionFactors = await EmissionFactor.find({});
    console.log("Total emission factors found:", emissionFactors.length);
    console.log("All Emission Factors in DB:", emissionFactors);

    // Fetch emission factor from DB based on fuel type and sub-type
    const emissionFactorEntry = await EmissionFactor.findOne({
        fuelType: { $regex: fuelTypeRegex },
        fuelSubType: { $regex: fuelSubTypeRegex }
      });
      

    console.log("Database result:", emissionFactorEntry);

    if (!emissionFactorEntry) {
      return res.status(404).json({ error: "Emission factor not found for this fuel type and sub-type" });
    }

    const emissionFactor = emissionFactorEntry.emissionFactor;

    // Calculate total emissions
    const totalEmission = quantity * emissionFactor;

    // Save to database
    const emissionRecord = new Emission({
      user,
      scope,
      activitytype,
      date,
      fuelType,
      fuelSubType,
      unit,
      quantity,
      emissionFactor,
      totalEmission
    });

    await emissionRecord.save();

    return res.status(201).json({ message: "Emission calculated successfully", data: emissionRecord });

  } catch (error) {
    console.error("Error calculating emissions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllEmissions = async (req, res) => {
  try {
    const emissions = await Emission.find({})
      .sort({ date: -1 }) // Sort by date in descending order (newest first)
      .select('user scope activitytype date fuelType fuelSubType unit quantity emissionFactor totalEmission'); // Select specific fields

    res.status(200).json({
      success: true,
      count: emissions.length,
      data: emissions
    });
  } catch (error) {
    console.error("Error fetching emissions:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch emissions data" 
    });
  }
};
