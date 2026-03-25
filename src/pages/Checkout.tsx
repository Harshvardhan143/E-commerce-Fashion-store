import { HiOutlineTrash } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkCheckoutFormData } from "../utils/checkCheckoutFormData";

const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

const Checkout = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const checkoutData = {
      data,
      products: productsInCart,
      subtotal: subtotal,
    };

    if (!checkCheckoutFormData(checkoutData)) return;

    let response;
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (user?.email) {
      response = await customFetch.post("/orders", {
        ...checkoutData,
        user: {
          email: user.email,
          id: user.id,
        },
        orderStatus: "Processing",
        orderDate: new Date().toISOString(),
      });
    } else {
      response = await customFetch.post("/orders", {
        ...checkoutData,
        orderStatus: "Processing",
        orderDate: new Date().toISOString(),
      });
    }

    if (response.status === 201) {
      toast.success("Order has been placed successfully");
      navigate("/order-confirmation");
    } else {
      toast.error("Something went wrong, please try again later");
    }
  };

  const shipping = subtotal > 0 ? 500 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white mx-auto max-w-screen-2xl px-6 lg:px-12 py-20">
      <div className="flex flex-col mb-16">
        <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold mb-3">Secure Checkout</span>
        <h1 className="text-5xl font-serif text-primaryDeep tracking-tight">Finalize Your Order</h1>
      </div>

      <form onSubmit={handleCheckoutSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-20">
        {/* Left Side: Form */}
        <div className="space-y-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-serif text-primaryDeep mb-6 border-b border-gray-100 pb-4 italic">Internal Information</h2>
            <div className="space-y-4">
              <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Email Address</label>
              <input
                type="email"
                name="emailAddress"
                className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-xl font-serif text-primaryDeep mb-6 italic">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">First Name</label>
                <input type="text" name="firstName" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Last Name</label>
                <input type="text" name="lastName" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" required />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Street Address</label>
                <input type="text" name="address" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" required />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Apartment / Suite</label>
                <input type="text" name="apartment" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">City</label>
                <input type="text" name="city" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Country</label>
                <select name="country" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide">
                  <option>United States</option>
                  <option>India</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">State / Province</label>
                <input type="text" name="region" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">ZIP / Postal Code</label>
                <input type="text" name="postalCode" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" required />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-xl font-serif text-primaryDeep mb-6 italic">Payment Method</h2>
            <div className="flex gap-8 mb-8">
              {paymentMethods.map((method) => (
                <label key={method.id} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="paymentType" className="w-4 h-4 accent-secondaryBrown" defaultChecked={method.id === "credit-card"} />
                  <span className="text-xs uppercase tracking-widest font-medium text-gray-500 group-hover:text-primaryDeep transition-colors">{method.title}</span>
                </label>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Card Number</label>
                <input type="text" name="cardNumber" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" required />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Name on Card</label>
                <input type="text" name="nameOnCard" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Expiration (MM/YY)</label>
                <input type="text" name="expirationDate" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">CVC</label>
                <input type="text" name="cvc" className="w-full h-12 px-4 bg-gray-50 border border-transparent focus:bg-white focus:border-secondaryBrown outline-none transition-all text-sm font-light tracking-wide" required />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="mt-20 lg:mt-0 p-8 bg-gray-50 border border-gray-100 sticky top-32">
          <h2 className="text-xl font-serif text-primaryDeep mb-8 italic text-center">Your Order</h2>
          <ul className="divide-y divide-gray-200 mb-8 max-h-[400px] overflow-y-auto pr-2">
            {productsInCart.map((product) => (
              <li key={product.id} className="py-6 flex gap-4 pr-4">
                <div className="w-16 h-20 bg-white flex-shrink-0">
                  <img src={`/assets/${product.image}`} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-serif italic text-primaryDeep leading-tight truncate w-32">{product.title}</h4>
                    <p className="text-xs font-light">₹{product.price.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Qty: {product.quantity}</span>
                    <button type="button" onClick={() => dispatch(removeProductFromTheCart({ id: product.id }))} className="text-gray-300 hover:text-red-500 transition-colors">
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-xs font-light uppercase tracking-widest">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-light uppercase tracking-widest">
              <span>Shipping</span>
              <span>₹{shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-light uppercase tracking-widest text-gray-400">
              <span>Estimated Tax (18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="pt-6 mt-6 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-xl font-serif italic">Total Price</span>
                <span className="text-2xl font-serif">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="mt-10 w-full py-4 bg-primaryDeep text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-secondaryBrown transition-colors duration-500"
          >
            Confirm & Pay
          </button>
          
          <p className="mt-4 text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">30-Day Hassle Free Returns</p>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
