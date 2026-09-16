import mongoose from "mongoose";

const MAX_TEXT = {
  name: 80,
  title: 120,
  description: 2000,
  location: 200,
  note: 500,
  email: 254,
};

const cleanString = (value, max) => typeof value === "string" ? value.trim().slice(0, max) : value;

// HydroWatch currently operates in India. GPS coordinates outside the
// country's broad bounding box are rejected to prevent misplaced map markers.
const isPlausibleIndiaCoordinate = (latitude, longitude) =>
  latitude >= 6 && latitude <= 37.5 && longitude >= 68 && longitude <= 97.5;

export const validateObjectId = (paramName) => (req, res, next) => {
  const value = req.params[paramName];
  if (!mongoose.isValidObjectId(value)) {
    return res.status(400).json({ message: `Invalid ${paramName}` });
  }
  next();
};

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body || {};
  if (typeof name !== "string" || name.trim().length < 3 || name.trim().length > MAX_TEXT.name) {
    return res.status(400).json({ message: "Name must be between 3 and 80 characters" });
  }
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim()) || email.trim().length > MAX_TEXT.email) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }
  if (typeof password !== "string" || password.length < 8 || password.length > 128) {
    return res.status(400).json({ message: "Password must be between 8 and 128 characters" });
  }
  req.body.name = cleanString(name, MAX_TEXT.name);
  req.body.email = email.trim().toLowerCase();
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }
  if (typeof password !== "string" || password.length < 1 || password.length > 128) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  req.body.email = email.trim().toLowerCase();
  next();
};

export const validateReport = (req, res, next) => {
  const { title, description, category, location, severity, latitude, longitude, image } = req.body || {};
  const categories = ["Leakage", "Pollution", "Water Logging", "Illegal Water Use", "Other"];
  const severities = ["Low", "Medium", "High", "Critical"];

  if (typeof title !== "string" || title.trim().length < 3 || title.trim().length > MAX_TEXT.title) {
    return res.status(400).json({ message: "Title must be between 3 and 120 characters" });
  }
  if (typeof description !== "string" || description.trim().length < 10 || description.trim().length > MAX_TEXT.description) {
    return res.status(400).json({ message: "Description must be between 10 and 2000 characters" });
  }
  if (!categories.includes(category)) return res.status(400).json({ message: "Invalid report category" });
  if (typeof location !== "string" || location.trim().length < 2 || location.trim().length > MAX_TEXT.location) {
    return res.status(400).json({ message: "Location must be between 2 and 200 characters" });
  }
  if (severity !== undefined && !severities.includes(severity)) return res.status(400).json({ message: "Invalid severity" });

  for (const [key, value] of [["latitude", latitude], ["longitude", longitude]]) {
    if (value !== null && value !== undefined && (typeof value !== "number" || !Number.isFinite(value))) {
      return res.status(400).json({ message: `Invalid ${key}` });
    }
  }
  if (latitude !== null && latitude !== undefined && (latitude < -90 || latitude > 90)) return res.status(400).json({ message: "Latitude must be between -90 and 90" });
  if (longitude !== null && longitude !== undefined && (longitude < -180 || longitude > 180)) return res.status(400).json({ message: "Longitude must be between -180 and 180" });
  if (latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined && !isPlausibleIndiaCoordinate(latitude, longitude)) return res.status(400).json({ message: "The GPS coordinates do not appear to be in India. Please use the GPS button again or correct the location." });

  if (image !== undefined && image !== "") {
    if (typeof image !== "string" || image.length > 4_194_304 || !/^data:image\/(jpeg|jpg|png|webp|gif);base64,[A-Za-z0-9+/=\r\n]+$/.test(image)) {
      return res.status(400).json({ message: "Invalid evidence image. Use JPEG, PNG, WebP or GIF up to 3 MB" });
    }
  }

  req.body.title = cleanString(title, MAX_TEXT.title);
  req.body.description = cleanString(description, MAX_TEXT.description);
  req.body.location = cleanString(location, MAX_TEXT.location);
  next();
};


export const validateReportUpdate = (req, res, next) => {
  const { title, description, category, location, severity, latitude, longitude, image } = req.body || {};
  const categories = ["Leakage", "Pollution", "Water Logging", "Illegal Water Use", "Other"];
  const severities = ["Low", "Medium", "High", "Critical"];

  if (title !== undefined && (typeof title !== "string" || title.trim().length < 3 || title.trim().length > MAX_TEXT.title)) return res.status(400).json({ message: "Title must be between 3 and 120 characters" });
  if (description !== undefined && (typeof description !== "string" || description.trim().length < 10 || description.trim().length > MAX_TEXT.description)) return res.status(400).json({ message: "Description must be between 10 and 2000 characters" });
  if (category !== undefined && !categories.includes(category)) return res.status(400).json({ message: "Invalid report category" });
  if (location !== undefined && (typeof location !== "string" || location.trim().length < 2 || location.trim().length > MAX_TEXT.location)) return res.status(400).json({ message: "Location must be between 2 and 200 characters" });
  if (severity !== undefined && !severities.includes(severity)) return res.status(400).json({ message: "Invalid severity" });

  for (const [key, value] of [["latitude", latitude], ["longitude", longitude]]) {
    if (value !== null && value !== undefined && (typeof value !== "number" || !Number.isFinite(value))) return res.status(400).json({ message: `Invalid ${key}` });
  }
  if (latitude !== null && latitude !== undefined && (latitude < -90 || latitude > 90)) return res.status(400).json({ message: "Latitude must be between -90 and 90" });
  if (longitude !== null && longitude !== undefined && (longitude < -180 || longitude > 180)) return res.status(400).json({ message: "Longitude must be between -180 and 180" });
  if (latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined && !isPlausibleIndiaCoordinate(latitude, longitude)) return res.status(400).json({ message: "The GPS coordinates do not appear to be in India. Please use the GPS button again or correct the location." });
  if (image !== undefined && image !== "" && (typeof image !== "string" || image.length > 4_194_304 || !/^data:image\/(jpeg|jpg|png|webp|gif);base64,[A-Za-z0-9+/=\r\n]+$/.test(image))) return res.status(400).json({ message: "Invalid evidence image. Use JPEG, PNG, WebP or GIF up to 3 MB" });

  if (title !== undefined) req.body.title = cleanString(title, MAX_TEXT.title);
  if (description !== undefined) req.body.description = cleanString(description, MAX_TEXT.description);
  if (location !== undefined) req.body.location = cleanString(location, MAX_TEXT.location);
  next();
};

export const validateStatusUpdate = (req, res, next) => {
  const statuses = ["Pending", "Under Review", "In Progress", "Resolved", "Closed"];
  const { status, note = "" } = req.body || {};
  if (!statuses.includes(status)) return res.status(400).json({ message: "Invalid status" });
  if (typeof note !== "string" || note.length > MAX_TEXT.note) return res.status(400).json({ message: "Admin note must be 500 characters or fewer" });
  req.body.note = note.trim();
  next();
};

export const validateAssignment = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.body?.userId)) return res.status(400).json({ message: "Invalid admin user" });
  next();
};

export const validateCampaign = (req, res, next) => {
  const { title, description, location, date, startDate, endDate, rewardPoints, maxParticipants } = req.body || {};
  if (typeof title !== "string" || title.trim().length < 3 || title.trim().length > 120) return res.status(400).json({ message: "Campaign title must be between 3 and 120 characters" });
  if (typeof description !== "string" || description.trim().length < 10 || description.trim().length > 1000) return res.status(400).json({ message: "Campaign description must be between 10 and 1000 characters" });
  if (typeof location !== "string" || location.trim().length < 2 || location.trim().length > 200) return res.status(400).json({ message: "Campaign location must be between 2 and 200 characters" });
  if (!date || Number.isNaN(new Date(date).getTime())) return res.status(400).json({ message: "A valid campaign date is required" });
  if (startDate && Number.isNaN(new Date(startDate).getTime())) return res.status(400).json({ message: "Invalid start date" });
  if (endDate && Number.isNaN(new Date(endDate).getTime())) return res.status(400).json({ message: "Invalid end date" });
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) return res.status(400).json({ message: "End date cannot be before start date" });
  if (rewardPoints !== undefined && (!Number.isInteger(Number(rewardPoints)) || Number(rewardPoints) < 0 || Number(rewardPoints) > 10000)) return res.status(400).json({ message: "Reward points must be an integer from 0 to 10000" });
  if (maxParticipants !== undefined && maxParticipants !== null && (!Number.isInteger(Number(maxParticipants)) || Number(maxParticipants) < 1 || Number(maxParticipants) > 100000)) return res.status(400).json({ message: "Maximum participants must be an integer from 1 to 100000" });
  next();
};

export const apiRateLimit = ({ windowMs = 60_000, max = 60 } = {}) => {
  const hits = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const current = hits.get(key);
    if (!current || now - current.start >= windowMs) {
      hits.set(key, { start: now, count: 1 });
      return next();
    }
    current.count += 1;
    if (current.count > max) {
      res.set("Retry-After", String(Math.ceil((windowMs - (now - current.start)) / 1000)));
      return res.status(429).json({ message: "Too many requests. Please try again later." });
    }
    next();
  };
};
