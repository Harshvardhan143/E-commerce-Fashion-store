import express from "express";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// @POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, lastname, email, password } = req.body;
  if (!name || !lastname || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this email" });
    }
    const user = await User.create({ name, lastname, email, password, role: "customer" });
    res.status(201).json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter email and password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/auth/me  (get logged in user)
router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({ id: user._id, name: user.name, lastname: user.lastname, email: user.email, role: user.role });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// @GET /api/users  (admin: get all users)
router.get("/", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// @GET /api/users/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ id: user._id, name: user.name, lastname: user.lastname, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @PUT /api/users/:id  (update user profile)
router.put("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = req.body.name || user.name;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    const updated = await user.save();
    res.json({ id: updated._id, name: updated.name, lastname: updated.lastname, email: updated.email, role: updated.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @DELETE /api/users/:id  (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin") return res.status(403).json({ message: "Cannot delete admin user" });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
