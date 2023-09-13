import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  loginValidation,
  regValidation,
  messageCreateValidation,
} from './validations/validations.js';
import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import { getMe, login, registration } from './components/UserController.js';
import {
  getAllMessage,
  createMessage,
  deleteMessage,
  editMessage,
} from './components/MessageContoller.js';
import multer from 'multer';

// Express settings
const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());
dotenv.config();

// Multer storage
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Connect to DB
mongoose
  .connect(process.env.DB_ACCESS_LINK)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB error', err));

// User routes
app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.post(
  '/auth/registration',
  regValidation,
  handleValidationErrors,
  registration
);
app.get('/auth/me', checkAuth, getMe);

// Messages routes
app.get('/messages', getAllMessage);
// app.get('/posts/:id', getOne);
app.post(
  '/messages',
  checkAuth,
  messageCreateValidation,
  handleValidationErrors,
  createMessage
);
app.delete('/messages/:id', checkAuth, deleteMessage);
app.patch(
  '/messages/:id',
  checkAuth,
  messageCreateValidation,
  handleValidationErrors,
  editMessage
);

// Multer route
app.post('/uploads', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server running');
});
