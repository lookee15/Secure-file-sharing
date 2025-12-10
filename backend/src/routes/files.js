import express from 'express';
import multer from 'multer';
import File from '../models/File.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload file
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  const file = new File({
    filename: req.file.originalname,
    path: req.file.path,
    size: req.file.size,
    uploadedBy: req.user.id
  });
  await file.save();
  res.json({ message: 'File uploaded successfully', file });
});

// List files
router.get('/', protect, async (req, res) => {
  const files = await File.find({ uploadedBy: req.user.id });
  res.json(files);
});

// Delete file
router.delete('/:id', protect, async (req, res) => {
  await File.findByIdAndDelete(req.params.id);
  res.json({ message: 'File deleted' });
});

export default router;