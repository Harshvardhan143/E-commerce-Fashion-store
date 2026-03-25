import { HiArrowUp } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

const ShowingSearchPagination = ({
  page,
  setCurrentPage,
}: {
  page: number;
  setCurrentPage: (page: number) => void;
}) => {
  const { totalProducts, showingProducts } = useAppSelector(state => state.shop);
  const navigate = useNavigate();
  const progress = totalProducts > 0 ? Math.round((showingProducts / totalProducts) * 100) : 0;

  return (
    <div className="px-5 max-[400px]:px-3 mt-16 mb-24">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
        {/* Progress bar */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
              Showing
            </span>
            <span className="text-xs text-primaryDeep font-semibold">
              {showingProducts} <span className="text-gray-400 font-normal">of</span> {totalProducts}
            </span>
          </div>
          <div className="w-full h-px bg-gray-200">
            <div
              className="h-px bg-secondaryBrown transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* View more button */}
        {showingProducts < totalProducts && (
          <button
            onClick={() => {
              setCurrentPage(page + 1);
              navigate(`/search?page=${page + 1}`);
            }}
            className="w-full py-3 border border-primaryDeep text-primaryDeep text-sm uppercase tracking-widest font-medium hover:bg-primaryDeep hover:text-white transition-colors duration-300"
          >
            Load More
          </button>
        )}

        {/* Back to top */}
        <a
          href="#gridTop"
          className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest font-medium hover:text-secondaryBrown transition-colors"
        >
          <HiArrowUp className="text-sm" />
          Back to Top
        </a>
      </div>
    </div>
  );
};
export default ShowingSearchPagination;

