import express from "express";
import { getStationaryCombustionData } from "../controllers/stationaryCombustion.controller.js";

const router = express.Router();

router.get("/", getStationaryCombustionData);

export default router;
