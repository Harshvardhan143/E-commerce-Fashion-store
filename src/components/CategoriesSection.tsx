import { Link } from "react-router-dom";
import CategoryItem from "./CategoryItem";

const CategoriesSection = () => {
  return (
    <div className="max-w-screen-2xl px-6 lg:px-12 mx-auto mt-32 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-2xl">
          <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">Our Collections</span>
          <h2 className="text-primaryDeep text-4xl md:text-5xl font-serif tracking-wide mb-4">
            Curated for You
          </h2>
          <p className="text-gray-500 font-light text-base leading-relaxed">
            Explore handpicked categories featuring the finest luxury fashion for every season and occasion.
          </p>
        </div>
        <Link to="/catalog" className="mt-6 md:mt-0 group flex items-center gap-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-primaryDeep border-b border-primaryDeep pb-0.5 group-hover:text-secondaryBrown group-hover:border-secondaryBrown transition-colors">
            View Full Catalog
          </span>
        </Link>
      </div>

      {/* Modern Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <CategoryItem
          categoryTitle="Women's Fashion"
          image="new_womens_catalog.png"
          link="women"
        />
        <CategoryItem
          categoryTitle="Men's Fashion"
          image="mens_navy_suit.png"
          link="men"
        />
        <CategoryItem
          categoryTitle="Boys' Collection"
          image="boys-catalog.png"
          link="boys"
        />
        <CategoryItem
          categoryTitle="Girls' Collection"
          image="girls-dress-1.png"
          link="girls"
        />
      </div>
      
      {/* Decorative divider */}
      <div className="w-full flex justify-center mt-24">
        <div className="w-24 h-[1px] bg-black/20"></div>
      </div>
    </div>
  );
};

export default CategoriesSection;

