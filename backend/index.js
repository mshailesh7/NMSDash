import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (ensure your MONGODB_URI points to your MongoDB server)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Use the specific database named "NMSDash"
const db = mongoose.connection.useDb('NMSDash');

// Create a Mongoose model for the "stationary_combution" collection
const StationaryCombution = db.model(
  'StationaryCombution',
  new mongoose.Schema({}, { collection: 'stationary_combution' })
);

// Routes
app.get('/', (req, res) => {
  res.send('NMS Dashboard API is running');
});

// GET all data from the "stationary_combution" collection
app.get('/stationary_combution', async (req, res) => {
  try {
    const data = await StationaryCombution.find({});
    console.log('Fetched stationary_combution data:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching stationary_combution data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
