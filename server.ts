import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoutes from './routes/authRoutes';

dotenv.config();

const PORT = process.env.PORT || 8888;
const application = express();


application.use(express.json());
application.use(express.urlencoded({ extended: true}));
application.use(cors());

application.use('/api', cors(), AuthRoutes);

application.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});