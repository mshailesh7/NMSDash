import StationaryCombustion from "../models/stationaryCombustion.model.js";

export const getStationaryCombustionData = async (req, res) => {
  try {
    const data = await StationaryCombustion.find({});
    console.log("Fetched stationary_combution data:", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching stationary_combution data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
