import express from 'express';
import multer from 'multer';
import File from '../models/File.js';
import { protect } from '../middleware/auth.js';
import { validateFileUpload } from '../middleware/validators.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload file
router.post('/upload', protect, upload.single('file'), validateFileUpload, async (req, res) => {
  try {
    const file = new File({
      filename: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      uploadedBy: req.user.id
    });
    await file.save();
    res.json({ message: 'File uploaded successfully', file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List files
router.get('/', protect, async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.id });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete file
router.delete('/:id', protect, async (req, res) => {
  try {
    await File.findByIdAndDelete(req.params.id);
    res.json({ message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;