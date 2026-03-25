import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";
import { HiOutlineShoppingBag, HiOutlineEye } from "react-icons/hi2";
import { useAppDispatch } from "../hooks";
import { addProductToTheCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const ProductItem = ({
  id,
  image,
  title,
  category,
  price,
  popularity,
  stock,
}: {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
}) => {
  const dispatch = useAppDispatch();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addProductToTheCart({
        id: id + "m" + "black", // Default options for quick add
        image,
        title,
        category,
        price,
        quantity: 1,
        size: "m",
        color: "black",
        popularity,
        stock,
      })
    );
    toast.success("Added to cart");
  };

  return (
    <div className="group flex flex-col w-full bg-white relative transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-2">
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-accentMuted flex items-center justify-center mb-4">
        <Link to={`/product/${id}`} className="w-full h-full">
          <img
            src={`/assets/${image}`}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        </Link>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primaryDeep/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleQuickAdd}
            className="bg-white text-primaryDeep w-12 h-12 rounded-full flex items-center justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primaryDeep hover:text-white shadow-xl"
            title="Quick Add to Cart"
          >
            <HiOutlineShoppingBag className="text-xl" />
          </button>
          <Link
            to={`/product/${id}`}
            className="bg-white text-primaryDeep w-12 h-12 rounded-full flex items-center justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 hover:bg-primaryDeep hover:text-white shadow-xl"
            title="View Details"
          >
            <HiOutlineEye className="text-xl" />
          </Link>
        </div>

        {/* Badges */}
        {popularity > 15 && (
          <div className="absolute top-3 left-3 bg-secondaryBrown text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm">
            Best Seller
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col text-center px-2 py-2">
        <p className="text-secondaryBrown uppercase tracking-[0.2em] text-[10px] font-bold mb-1.5 opacity-80">
          {formatCategoryName(category)}
        </p>
        <Link
          to={`/product/${id}`}
          className="text-primaryDeep text-base md:text-lg font-serif mb-1.5 hover:text-secondaryBrown transition-colors line-clamp-1 italic"
        >
          {title}
        </Link>
        <p className="text-primaryDeep text-sm md:text-base font-light tracking-widest">
          ₹{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
export default ProductItem;

