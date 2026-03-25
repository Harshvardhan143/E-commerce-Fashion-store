import {
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import {
  removeProductFromTheCart,
  updateProductQuantity,
} from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (productsInCart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-5">
        <HiOutlineShoppingBag className="text-6xl text-gray-200 mb-6" />
        <h2 className="text-3xl font-serif text-primaryDeep mb-4">Your bag is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md font-light">
          It seems you haven't added anything to your bag yet. Explore our latest collections to find something special.
        </p>
        <Link
          to="/shop"
          className="px-12 py-4 bg-primaryDeep text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-secondaryBrown transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white mx-auto max-w-screen-2xl px-6 lg:px-12 py-20">
      <div className="flex flex-col mb-16">
        <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold mb-3">Essentials</span>
        <h1 className="text-5xl font-serif text-primaryDeep tracking-tight">Your Shopping Bag</h1>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-16">
        <section className="lg:col-span-7">
          <ul role="list" className="divide-y divide-gray-100 border-t border-gray-100">
            {productsInCart.map((product) => (
              <li key={product.id} className="flex py-10 group">
                <div className="flex-shrink-0 w-32 h-44 overflow-hidden bg-accentMuted">
                  <img
                    src={`/assets/${product.image}`}
                    alt={product.title}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="ml-8 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] text-secondaryBrown uppercase tracking-widest font-bold mb-1">Brand Exclusive</p>
                        <h3 className="text-xl font-serif text-primaryDeep mb-1 italic">
                          <Link to={`/product/${product.id}`} className="hover:text-secondaryBrown transition-colors">
                            {product.title}
                          </Link>
                        </h3>
                        <div className="flex gap-4 text-xs text-gray-400 uppercase tracking-widest font-medium mt-2">
                          <span>Color: <span className="text-primaryDeep">{product.color}</span></span>
                          {product.size && (
                            <span>Size: <span className="text-primaryDeep">{product.size}</span></span>
                          )}
                        </div>
                      </div>
                      <p className="text-lg font-light text-primaryDeep">₹{product.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col gap-2">
                      <label htmlFor={`quantity-${product.id}`} className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Quantity</label>
                      <div className="flex items-center border border-gray-200">
                         <button 
                          type="button"
                          className="px-3 py-1 text-gray-400 hover:text-primaryDeep transition-colors"
                          onClick={() => {
                            if (product.quantity > 1) {
                              dispatch(updateProductQuantity({ id: product.id, quantity: product.quantity - 1 }));
                            }
                          }}
                        >-</button>
                        <span className="px-4 py-1 text-sm font-medium border-x border-gray-100">{product.quantity}</span>
                        <button 
                          type="button"
                          className="px-3 py-1 text-gray-400 hover:text-primaryDeep transition-colors"
                          onClick={() => dispatch(updateProductQuantity({ id: product.id, quantity: product.quantity + 1 }))}
                        >+</button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="text-[10px] text-gray-400 uppercase tracking-widest font-bold hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500 pb-0.5"
                      onClick={() => {
                        dispatch(removeProductFromTheCart({ id: product?.id }));
                        toast.error("Removed from bag");
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <section className="mt-16 lg:col-span-5 lg:mt-0 p-8 bg-gray-50/50 border border-gray-100 sticky top-32">
          <h2 className="text-xl font-serif text-primaryDeep mb-8">Summary</h2>

          <div className="space-y-6">
            <div className="flex justify-between text-sm font-light tracking-wide">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-primaryDeep">₹{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-sm font-light tracking-wide">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Shipping</span>
                <span className="text-[10px] bg-secondaryBrown/10 text-secondaryBrown px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">Standard</span>
              </div>
              <span className="text-primaryDeep">₹{subtotal === 0 ? 0 : "500"}</span>
            </div>

            <div className="flex justify-between text-sm font-light tracking-wide">
              <span className="text-gray-500">Estimated Tax</span>
              <span className="text-primaryDeep">₹{(subtotal * 0.18).toLocaleString()}</span>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-lg font-serif italic text-primaryDeep">Total</span>
                <span className="text-2xl font-serif text-primaryDeep">₹{subtotal === 0 ? 0 : (subtotal + (subtotal * 0.18) + 500).toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 italic font-light">Including GST and shipping fees</p>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-10 w-full py-4 bg-primaryDeep text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-secondaryBrown transition-colors duration-500 flex items-center justify-center"
          >
            Check Out
          </Link>

          <div className="mt-8 flex items-center justify-center gap-4 border-t border-gray-100 pt-8">
            <div className="flex flex-col items-center">
               <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Secure Payment</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;

