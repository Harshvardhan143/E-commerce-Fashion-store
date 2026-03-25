import { HiBars3, HiOutlineUser, HiOutlineMagnifyingGlass, HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineCog6Tooth, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { useState, useEffect, useRef } from "react";
import { store } from "../store";
import { setLoginStatus } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import { useAppSelector } from "../hooks/index";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const loginStatus = useAppSelector((state) => state.auth.loginStatus);

  const cartCount = useAppSelector((state) => state.cart.productsInCart?.length ?? 0);

  // Get user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = storedUser?.role === "admin";
  const userName = storedUser?.name || "";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    setIsUserMenuOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent ${
          isScrolled ? "glass shadow-md py-3 border-gray-200" : "bg-white py-5"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 lg:px-12">
          {/* Left: Menu Icon */}
          <div className="w-1/3 flex justify-start">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Open Menu"
            >
              <HiBars3 className="text-2xl" />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="w-1/3 flex justify-center">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-serif tracking-[0.1em] text-primaryDeep flex flex-col items-center text-center leading-tight hover:opacity-80 transition-opacity"
            >
              MEWAR NATH
              <span className="text-[11px] tracking-[0.3em] font-sans mt-1 text-secondaryBrown font-semibold uppercase">FASHION STORE</span>
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="w-1/3 flex justify-end items-center gap-3 sm:gap-5">
            <Link
              to="/search"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <HiOutlineMagnifyingGlass className="text-xl sm:text-2xl" />
            </Link>

            {/* User icon / dropdown */}
            <div className="relative hidden sm:block" ref={userMenuRef}>
              {loginStatus ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1.5"
                    aria-label="User Account"
                  >
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Signed in as</p>
                        <p className="font-semibold text-gray-900 text-sm truncate">{storedUser?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/user-profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <HiOutlineUser className="text-lg" />
                          My Profile
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <HiOutlineCog6Tooth className="text-lg" />
                            Admin Panel
                          </Link>
                        )}
                        <Link
                          to="/order-history"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <HiOutlineShoppingBag className="text-lg" />
                          My Orders
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                        >
                          <HiOutlineArrowRightOnRectangle className="text-lg" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Sign In"
                >
                  <HiOutlineUser className="text-xl sm:text-2xl" />
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label="Shopping Cart"
            >
              <HiOutlineShoppingBag className="text-xl sm:text-2xl text-primaryDeep" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-secondaryBrown text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20 sm:h-24"></div>

      <SidebarMenu
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
};

export default Header;
