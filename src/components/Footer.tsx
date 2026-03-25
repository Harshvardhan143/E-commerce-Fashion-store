import SocialMediaFooter from "./SocialMediaFooter";
import { HiChevronDown } from "react-icons/hi2";

const Footer = () => {
  return (
    <>
      <SocialMediaFooter />
      <footer className="w-full bg-primaryDeep text-white py-20 px-6 sm:px-10 lg:px-20 mt-16">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-5 pb-16 border-b border-accentMuted/20">
          
          <div className="flex flex-col gap-4 text-left md:w-1/4">
            <h3 className="text-accentMuted text-lg font-serif tracking-widest uppercase mb-2">Client Service</h3>
            <p className="text-gray-400 hover:text-secondaryBrown transition-colors cursor-pointer text-sm font-light">After-sale Service</p>
            <p className="text-gray-400 hover:text-secondaryBrown transition-colors cursor-pointer text-sm font-light">Free Insurance</p>
            <p className="text-gray-400 hover:text-secondaryBrown transition-colors cursor-pointer text-sm font-light">Returns & Exchanges</p>
          </div>

          <div className="flex flex-col gap-4 text-left md:w-1/4">
            <h3 className="text-accentMuted text-lg font-serif tracking-widest uppercase mb-2">Our Brand</h3>
            <p className="text-gray-400 hover:text-secondaryBrown transition-colors cursor-pointer text-sm font-light">The Company</p>
            <p className="text-gray-400 hover:text-secondaryBrown transition-colors cursor-pointer text-sm font-light">The Excellence</p>
            <p className="text-gray-400 hover:text-secondaryBrown transition-colors cursor-pointer text-sm font-light">International Awards</p>
            <p className="text-gray-400 hover:text-secondaryBrown transition-colors cursor-pointer text-sm font-light">Our Story</p>
          </div>

          <div className="flex flex-col gap-4 text-left md:w-1/4">
            <h3 className="text-accentMuted text-lg font-serif tracking-widest uppercase mb-2">Luxury Clothing</h3>
            <p className="text-gray-400 hover:text-secondaryBrown transition-colors cursor-pointer text-sm font-light">Special Edition</p>
            <p className="text-gray-400 hover:text-secondaryBrown transition-colors cursor-pointer text-sm font-light">Summer Edition</p>
            <p className="text-gray-400 hover:text-secondaryBrown transition-colors cursor-pointer text-sm font-light">Unique Collection</p>
          </div>

          <div className="flex flex-col gap-8 text-left md:w-1/4">
            <p className="flex items-center text-sm tracking-wider uppercase text-gray-300 font-light cursor-pointer hover:text-white transition-colors">
              Worldwide / English <HiChevronDown className="ml-2" />
            </p>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center justify-between mt-12 gap-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
            <h2 className="text-3xl md:text-5xl font-serif tracking-[0.1em] text-accentMuted">MEWAR NATH</h2>
            <span className="text-xs md:text-sm tracking-[0.4em] text-secondaryBrown font-medium uppercase">FASHION STORE</span>
          </div>
          
          <ul className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500 uppercase tracking-widest font-light">
            <li className="cursor-pointer hover:text-white transition-colors">Cookie Policy</li>
            <li className="cursor-pointer hover:text-white transition-colors">Privacy Policy</li>
            <li className="cursor-pointer hover:text-white transition-colors">Legal Notes</li>
            <li>All rights reserved ©2026</li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
