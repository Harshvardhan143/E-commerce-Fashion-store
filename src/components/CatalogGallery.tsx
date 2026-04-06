import { useNavigate } from "react-router-dom";

const catalogImages = [
  "luxury_mens_watch.png", "luxury_stiletto_heels.png", "luxury_womens_handbag.png",
  "product19.png", "product20.png", "product21.png",
  "product22.png", "mens_navy_suit.png", "mens_white_shirt.png",
  "mens_grey_pants.png", "men-catalog.png", "new_womens_catalog.png",
  "boys-catalog.png", "girls-dress-1.png", "men-suit-1.png", "new_womens_dress.png",
  "boys_tshirt.png", "men-casual-1.png"
];

const CatalogGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-2xl px-6 lg:px-12 mx-auto mt-32 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-2xl">
          <h2 className="text-black text-4xl md:text-5xl font-serif tracking-wide mb-4">
            Catalog Inspiration
          </h2>
          <p className="text-gray-500 font-light text-lg">
            Immerse yourself in our visual narrative. A curated showcase of luxury, elegance, and high-fashion aesthetics.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <button 
            onClick={() => navigate("/catalog")}
            className="text-sm font-semibold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
          >
            Explore Full Catalog
          </button>
        </div>
      </div>

      {/* Masonry-like Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {catalogImages.map((img, index) => (
          <div 
            key={index} 
            className={`group relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${
              index % 7 === 0 ? "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2" : ""
            }`}
            onClick={() => navigate("/shop")}
          >
            <img 
              src={`/assets/${img}`} 
              alt={`Catalog ${index}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ aspectRatio: index % 7 === 0 ? "1/1" : "3/4" }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-[0.2em] font-medium border border-white py-2 px-4 backdrop-blur-sm">
                Shop Look
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogGallery;
