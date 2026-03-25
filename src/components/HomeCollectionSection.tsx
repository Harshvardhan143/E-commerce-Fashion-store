import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";
import { Link } from "react-router-dom";

const HomeCollectionSection = () => {
  return (
    <div className="mt-32 mb-16 px-6 lg:px-12 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-2xl">
          <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">Latest Additions</span>
          <h2 className="text-primaryDeep text-4xl md:text-5xl font-serif tracking-wide mb-4">
            New Arrivals
          </h2>
          <p className="text-gray-500 font-light text-base leading-relaxed">
            Discover our latest pieces designed to elevate your wardrobe with timeless elegance and modern sophistication.
          </p>
        </div>
        <div className="mt-6 md:mt-0 group">
          <Link to="/shop" className="text-sm font-semibold uppercase tracking-widest text-primaryDeep border-b border-primaryDeep pb-0.5 group-hover:text-secondaryBrown group-hover:border-secondaryBrown transition-colors">
            View All Products
          </Link>
        </div>
      </div>
      
      <ProductGridWrapper limit={8}>
        <ProductGrid />
      </ProductGridWrapper>
      
      {/* Decorative divider */}
      <div className="w-full flex justify-center mt-20">
        <div className="w-24 h-[1px] bg-black/20"></div>
      </div>
    </div>
  );
};

export default HomeCollectionSection;

