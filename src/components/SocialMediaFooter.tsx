import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";


const SocialMediaFooter = () => {
  return (
    <div className="w-full bg-gray-50 border-t border-gray-200 mt-24">
      <div className="mx-auto max-w-screen-2xl flex flex-col items-center py-16 gap-6 px-5">
        <p className="text-sm md:text-base text-gray-500 font-light tracking-widest uppercase">Connect With Us</p>
        <div className="flex gap-6 md:gap-8 text-black">
          <a href="#" className="p-3 bg-white rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-black hover:text-white transition-all duration-300">
            <FaFacebookF className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a href="#" className="p-3 bg-white rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-black hover:text-white transition-all duration-300">
            <FaInstagram className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a href="#" className="p-3 bg-white rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-black hover:text-white transition-all duration-300">
            <FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a href="#" className="p-3 bg-white rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 hover:bg-black hover:text-white transition-all duration-300">
            <FaYoutube className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default SocialMediaFooter;