import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div 
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-center items-center overflow-hidden"
      style={{
        backgroundImage: "url('/assets/premium_hero_banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mt-10 md:mt-16 mb-24 md:mb-32">
        <span className="inline-block text-secondaryBrown uppercase tracking-[0.4em] text-xs md:text-sm mb-6 font-semibold border border-secondaryBrown px-6 py-2">
          Exclusive Collection 2026
        </span>

        <h2 className="text-white text-5xl md:text-7xl lg:text-[7rem] font-serif mb-6 drop-shadow-xl leading-none">
          The Art Of <br />
          <em className="font-light italic text-secondaryBrown drop-shadow-lg">Luxury</em>
        </h2>

        <p className="text-white/90 text-base md:text-lg font-light tracking-wide max-w-xl mb-12 drop-shadow-lg leading-relaxed">
          Elevate your wardrobe with meticulously crafted pieces. Discover the ultimate expression of modern fashion and timeless elegance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 z-20 pointer-events-auto">
          <Link
            to="/shop"
            className="px-10 py-4 bg-secondaryBrown text-white font-semibold uppercase tracking-widest text-sm hover:bg-white hover:text-primaryDeep transition-all duration-300 transform hover:-translate-y-1 shadow-xl flex items-center justify-center"
          >
            Shop Now
          </Link>
          <Link
            to="/catalog"
            className="px-10 py-4 border border-white/60 text-white font-semibold uppercase tracking-widest text-sm hover:bg-white/15 backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
          >
            View Catalog
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex flex-col items-center animate-bounce">
        <span className="text-white/60 text-xs tracking-[0.2em] mb-2 uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-white/60"></div>
      </div>
    </div>
  );
};

export default Banner;

