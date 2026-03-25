import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useAppSelector } from "../hooks";

const ShopFilterAndSort = ({
  sortCriteria,
  setSortCriteria,
}: {
  sortCriteria: string;
  setSortCriteria: (value: string) => void;
}) => {
  const { showingProducts, totalProducts } = useAppSelector(state => state.shop);
  return (
    <div className="flex justify-between items-center px-5 py-3 border-y border-gray-200 bg-white max-sm:flex-col max-sm:gap-3 max-sm:items-start">
      {/* Results Count */}
      <div className="flex items-center gap-2">
        <span className="w-1 h-4 bg-secondaryBrown inline-block" />
        <p className="text-sm text-gray-500 font-light tracking-wide">
          Showing <span className="text-primaryDeep font-semibold">{showingProducts}</span> of{" "}
          <span className="text-primaryDeep font-semibold">{totalProducts}</span> results
        </p>
      </div>

      {/* Sort Control */}
      <div className="flex items-center gap-3">
        <HiOutlineAdjustmentsHorizontal className="text-secondaryBrown text-lg" />
        <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Sort by</span>
        <div className="relative">
          <select
            className="appearance-none bg-transparent border border-gray-300 text-primaryDeep text-sm font-medium px-4 py-2 pr-8 focus:outline-none focus:border-secondaryBrown cursor-pointer hover:border-secondaryBrown transition-colors"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortCriteria(e.target.value)
            }
            value={sortCriteria}
          >
            <option value="default">Default</option>
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          {/* Custom dropdown arrow */}
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-secondaryBrown text-xs">▾</span>
        </div>
      </div>
    </div>
  );
};
export default ShopFilterAndSort;

