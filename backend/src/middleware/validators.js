// Validating registration input
export const validateRegister = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }
  next();
};

// Validate login input
export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  next();
};

// Validate file upload
export const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "File is required" });
  }
  if (req.file.size > 5 * 1024 * 1024) { // 5 MB limit
    return res.status(400).json({ error: "File size exceeds 5MB limit" });
  }
  next();
};
