import express from "express";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// @POST /api/orders  (create order - logged in user)
router.post("/", protect, async (req, res) => {
  try {
    const { data, products, subtotal } = req.body;
    const order = await Order.create({
      user: { email: req.user.email, id: req.user._id },
      data,
      products,
      subtotal,
      orderStatus: "Processing",
      orderDate: new Date(),
    });
    res.status(201).json({
      id: order._id,
      orderStatus: order.orderStatus,
      orderDate: order.orderDate,
      products: order.products,
      subtotal: order.subtotal,
      user: order.user,
      data: order.data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @GET /api/orders  (get orders for logged in user; admin gets all)
router.get("/", protect, async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find().sort({ orderDate: -1 });
    } else {
      orders = await Order.find({ "user.id": req.user._id }).sort({ orderDate: -1 });
    }
    res.json(orders.map((o) => ({
      id: o._id,
      orderStatus: o.orderStatus,
      orderDate: o.orderDate,
      products: o.products,
      subtotal: o.subtotal,
      user: o.user,
      data: o.data,
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/orders/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({
      id: order._id,
      orderStatus: order.orderStatus,
      orderDate: order.orderDate,
      products: order.products,
      subtotal: order.subtotal,
      user: order.user,
      data: order.data,
    });
  } catch (err) {
    res.status(404).json({ message: "Order not found" });
  }
});

// @PUT /api/orders/:id  (admin: update order status)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ id: order._id, orderStatus: order.orderStatus });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
