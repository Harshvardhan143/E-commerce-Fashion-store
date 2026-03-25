import { useState } from "react";
import {
  ProductGrid,
  ProductGridWrapper,
  ShowingSearchPagination,
} from "../components";
import { Form, useSearchParams } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-12">
      <div className="mb-12">
        <h1 className="font-serif text-4xl text-primaryDeep mb-4 tracking-tight">Search Results</h1>
        <p className="text-gray-500 font-light tracking-wide uppercase text-xs">
          Discover our curated collection based on your interests
        </p>
      </div>

      <Form
        method="post"
        className="relative flex items-center mb-16 max-w-4xl"
      >
        <div className="absolute left-4 text-gray-400">
          <HiOutlineMagnifyingGlass size={20} />
        </div>
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-full h-16 pl-12 pr-40 bg-white border border-gray-200 focus:border-secondaryBrown outline-none text-primaryDeep font-light tracking-wide transition-all placeholder:text-gray-300"
          name="searchInput"
          defaultValue={searchParams.get("query") || ""}
        />
        <div className="absolute right-2">
          <button
            type="submit"
            className="px-8 py-3 bg-primaryDeep text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-secondaryBrown transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </Form>

      <ProductGridWrapper searchQuery={searchParams.get("query")!} page={currentPage}>
        <ProductGrid />
      </ProductGridWrapper>

      <div className="mt-16 border-t border-gray-100">
        <ShowingSearchPagination page={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};
export default Search;

