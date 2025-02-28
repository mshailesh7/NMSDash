import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import stationaryCombustionRoutes from "./routes/stationaryCombustion.routes.js";
import emissionRoutes from "./routes/emissions.routes.js";  

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Connect to database
const db = await connectDB();

// Routes
app.use("/api/stationary_combution", stationaryCombustionRoutes);
app.use("/api/emissions", emissionRoutes);

app.get("/", (req, res) => {
  res.send("NMS Dashboard API is running");
});

export default app;
