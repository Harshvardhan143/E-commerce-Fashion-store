import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi2";

const OrderConfirmation = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 bg-white">
      <div className="flex flex-col items-center max-w-2xl text-center">
        <HiCheckCircle className="text-secondaryBrown text-6xl mb-8 animate-pulse" />
        
        <span className="text-secondaryBrown uppercase tracking-[0.4em] text-xs font-bold mb-4">Success</span>
        <h1 className="text-6xl font-serif text-primaryDeep mb-6 tracking-tight italic">Thank You for <br /> Your Selection</h1>
        
        <p className="text-gray-500 font-light text-lg mb-12 leading-relaxed">
          Your order has been confirmed and is currently being prepared with the utmost care. 
          A confirmation email has been sent to your registered address with all the exquisite details.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <Link
            to="/shop"
            className="px-12 py-4 bg-primaryDeep text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-secondaryBrown transition-colors duration-500 min-w-[240px]"
          >
            Continue Shopping
          </Link>
          <Link
            to="/order-history"
            className="px-12 py-4 border border-gray-200 text-primaryDeep text-[10px] uppercase tracking-[0.2em] font-bold hover:border-primaryDeep transition-colors duration-500 min-w-[240px]"
          >
            Track Order
          </Link>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 w-full text-center">
           <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Mewar Nath Couture &bull; Since 2024</p>
        </div>
      </div>
    </div>
  );
};
export default OrderConfirmation;
