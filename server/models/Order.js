import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      email: { type: String, required: true },
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    data: {
      emailAddress: String,
      firstName: String,
      lastName: String,
      company: String,
      address: String,
      apartment: String,
      city: String,
      country: String,
      region: String,
      postalCode: String,
      phone: String,
      paymentType: String,
      cardNumber: String,
      nameOnCard: String,
      expirationDate: String,
      cvc: String,
    },
    products: [
      {
        id: String,
        image: String,
        title: String,
        category: String,
        price: Number,
        quantity: Number,
        size: String,
        color: String,
        popularity: Number,
        stock: Number,
      },
    ],
    subtotal: { type: Number, required: true },
    orderStatus: { type: String, default: "Processing" },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
