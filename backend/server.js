import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import fileRoutes from './src/routes/files.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Test route
app.get('/', (req, res) => res.send('Backend is running!'));

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
};

start();