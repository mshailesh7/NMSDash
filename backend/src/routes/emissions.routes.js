import express from "express";
import { calculateEmission, getAllEmissions } from "../controllers/emissions.controller.js";

const router = express.Router();

router.post("/calculate", calculateEmission);
router.get("/all", getAllEmissions);  // New route to get all emissions

export default router;
