import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

const SidebarMenu = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (prev: boolean) => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { loginStatus } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const logout = () => {
    toast.error("Logged out successfully");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    setIsSidebarOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden"; // Prevent scrolling when sidebar is open
    } else {
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setIsAnimating(false), 300); // Match transiton duration
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/catalog" },
    { name: "Shop", path: "/shop" },
    { name: "Search", path: "/search" },
    { name: "Cart", path: "/cart" }
  ];

  return (
    <>
      {(isSidebarOpen || isAnimating) && (
        <div className="fixed inset-0 z-50 flex">
          {/* Dark Overlay backdrop */}
          <div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          
          {/* Sidebar drawer content */}
          <div
            className={`relative w-80 max-w-full bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Header of sidebar */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <Link
                to="/"
                onClick={() => setIsSidebarOpen(false)}
                className="text-2xl font-serif tracking-[0.1em] text-primaryDeep flex flex-col leading-tight"
              >
                MEWAR NATH
                <span className="text-[10px] tracking-[0.3em] font-sans mt-1 text-secondaryBrown font-semibold uppercase">FASHION STORE</span>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <HiXMark className="text-2xl" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-8 px-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-xl font-light text-gray-800 hover:text-black hover:translate-x-2 transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Footer of sidebar (Auth Links) */}
            <div className="p-8 border-t border-gray-100 bg-gray-50 flex flex-col gap-4">
              {loginStatus ? (
                <>
                  <Link 
                    to="/user-profile" 
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-full py-3 px-4 bg-white border border-gray-200 text-center font-medium rounded-lg hover:border-primaryDeep hover:text-primaryDeep transition-colors"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full py-3 px-4 bg-primaryDeep text-white text-center font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-md"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-full py-3 px-4 bg-primaryDeep text-white text-center font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsSidebarOpen(false)}
                    className="w-full py-3 px-4 bg-white border border-gray-200 text-center font-medium rounded-lg hover:border-black transition-colors"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SidebarMenu;

