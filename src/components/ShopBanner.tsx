import { formatCategoryName } from "../utils/formatCategoryName";

const ShopBanner = ({ category }: { category: string }) => {
  const getCategoryDesc = (cat: string) => {
    switch (cat) {
      case "men": return "Precision tailoring and contemporary masculinity.";
      case "women": return "The pinnacle of silk, lace, and feminine grace.";
      case "boys": return "Confident styles for the next generation.";
      case "girls": return "Whimsical designs for young dreamers.";
      case "kids": return "Premium comfort for little ones.";
      default: return "Exquisite designs from our signature collections.";
    }
  };

  return (
    <div className="relative h-64 md:h-80 bg-black overflow-hidden flex flex-col justify-center items-center text-center px-6">
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
      
      <div className="relative z-10 max-w-3xl">
        <span className="text-secondaryBrown uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-4 font-semibold border border-secondaryBrown/40 inline-block px-3 py-1">
          Mewar Nath Couture
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight capitalize">
          {category ? formatCategoryName(category) : "All Products"}
        </h2>
        <p className="text-gray-300 font-light text-sm sm:text-base max-w-md mx-auto" style={{fontStyle:'italic'}}>
          {getCategoryDesc(category)}
        </p>
      </div>
    </div>
  );
};

export default ShopBanner;
