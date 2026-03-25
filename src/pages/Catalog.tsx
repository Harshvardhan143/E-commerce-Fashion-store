import { Link } from "react-router-dom";

const categories = [
  {
    name: "Women's Collection",
    id: "women",
    description: "Elegant silk dresses, sophisticated evening wear, and modern classics.",
    image: "women-catalog.png",
    link: "/shop/women",
    gridClass: "lg:col-span-2 lg:row-span-2",
  },
  {
    name: "Men's Collection",
    id: "men",
    description: "Tailored suits, premium casual wear, and contemporary essentials.",
    image: "men-catalog.png",
    link: "/shop/men",
    gridClass: "lg:col-span-1 lg:row-span-2",
  },
  {
    name: "Boys' Fashion",
    id: "boys",
    description: "Stylish and comfortable designer wear for young boys.",
    image: "boys-catalog.png",
    link: "/shop/boys",
    gridClass: "lg:col-span-1 lg:row-span-1",
  },
  {
    name: "Girls' Fashion",
    id: "girls",
    description: "Beautiful dresses and playful outfits for young girls.",
    image: "girls-catalog.png",
    link: "/shop/girls",
    gridClass: "lg:col-span-1 lg:row-span-1",
  },
];

const Catalog = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 text-center">
          <h1 className="text-5xl md:text-7xl font-serif text-black mb-6 tracking-tight">The Catalog</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-500 font-light leading-relaxed">
            Explore our curated collections across all departments. From the timeless elegance of women's couture 
            to the sophisticated tailoring of men's fashion and the playful luxury of our children's range.
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
        <div className="relative rounded-3xl overflow-hidden bg-black py-20 px-8 text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Can't decide?</h2>
            <p className="text-gray-400 font-light mb-10 text-lg">
              Browse our entire digital storefront encompassing all collections, special editions, and limited releases.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-white text-black px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg"
            >
              Shop All Products
            </Link>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
