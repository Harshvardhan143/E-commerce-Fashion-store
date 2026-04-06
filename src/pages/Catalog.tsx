import { Link } from "react-router-dom";

const categories = [
  {
    name: "Luxury Reserve",
    id: "luxury",
    description: "Our most exclusive and highly sought-after premium items.",
    image: "luxury_womens_handbag.png",
    link: "/shop",
    gridClass: "lg:col-span-2 lg:row-span-2",
  },
  {
    name: "Women's Collection",
    id: "women",
    description: "Elegant silk dresses, sophisticated evening wear, and modern classics.",
    image: "new_womens_catalog.png",
    link: "/shop/women",
    gridClass: "lg:col-span-1 lg:row-span-2",
  },
  {
    name: "Men's Collection",
    id: "men",
    description: "Tailored suits, premium casual wear, and contemporary essentials.",
    image: "men-catalog.png",
    link: "/shop/men",
    gridClass: "lg:col-span-1 lg:row-span-1",
  },
  {
    name: "Kids' Fashion",
    id: "kids",
    description: "Beautiful designer wear for the young ones.",
    image: "girls-dress-1.png",
    link: "/shop/girls",
    gridClass: "lg:col-span-1 lg:row-span-1",
  },
];

const Catalog = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primaryDeep py-24 sm:py-32">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondaryBrown/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px]" />
        
        <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-12 text-center">
          <span className="inline-block text-secondaryBrown uppercase tracking-[0.4em] text-xs font-semibold border border-secondaryBrown px-4 py-1.5 mb-6">
            Mewar Nath Collections
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 tracking-tight drop-shadow-lg">
            Curated <em className="font-light italic text-secondaryBrown">Elegance</em>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 font-light leading-relaxed">
            Immerse yourself in our meticulously selected collections. From our exclusive Luxury Reserve 
            to timeless masterpieces across all departments, discover your signature style.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:grid-rows-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${category.gridClass} min-h-[400px] shadow-sm transform transition-all duration-700 hover:shadow-2xl`}
            >
              <img
                src={`/assets/${category.image}`}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                <h2 className="text-3xl sm:text-4xl font-serif text-white mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                  {category.name}
                </h2>
                <p className="text-gray-200 text-sm sm:text-base font-light max-w-md opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {category.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-white text-xs uppercase tracking-widest font-medium opacity-80 group-hover:opacity-100">
                  <span>Explore Collection</span>
                  <div className="h-[1px] w-8 bg-white transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Shop All Banner */}
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 pb-24">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black py-24 px-8 text-center shadow-2xl flex flex-col justify-center items-center">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-md">Not Sure Where to Begin?</h2>
            <p className="text-white/90 font-light mb-12 text-lg drop-shadow-sm max-w-xl mx-auto">
              Browse our entire digital storefront bypassing categories. View all collections, special editions, and limited releases in one place.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-primaryDeep text-white px-12 py-5 text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-primaryDeep transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transform hover:-translate-y-1"
            >
              Shop All Styles
            </Link>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
