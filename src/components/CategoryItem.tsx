import { Link } from "react-router-dom";

const CategoryItem = ({ categoryTitle, image, link }: { categoryTitle: string; image: string; link: string; }) => {
  return (
    <div className="group relative w-full h-[300px] md:h-[400px] xl:h-[500px] overflow-hidden cursor-pointer bg-gray-100">
      <Link to={`/shop/${link}`} className="block w-full h-full">
        {/* Image with zoom effect on hover */}
        <img 
          src={`/assets/${image}`} 
          alt={categoryTitle}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
        />
        
        {/* Dark elegant gradient over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90"></div>
        
        {/* Text Area */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end items-center sm:items-start transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <h3 className="text-white text-2xl md:text-3xl font-serif tracking-wide mb-2">
            {categoryTitle}
          </h3>
          <span className="text-white/80 uppercase tracking-widest text-xs font-medium relative overflow-hidden inline-block">
            <span className="inline-block transition-transform duration-300 transform -translate-x-[120%] group-hover:translate-x-0">
              Explore Collection &rarr;
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;

