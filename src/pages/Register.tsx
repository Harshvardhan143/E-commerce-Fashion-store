import { Link, useNavigate } from "react-router-dom";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!name || !lastname || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await customFetch.post("/auth/register", { name, lastname, email, password });
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const msg = err?.response?.data?.message || "Registration failed. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex bg-gray-50">
      {/* Right Image Section (flipped for variety) */}
      <div className="hidden lg:block w-1/2 bg-cover bg-center order-2 relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-white text-center px-10">
            <h1 className="text-5xl font-bold mb-4 tracking-tight drop-shadow-lg">Join the Elite</h1>
            <p className="text-xl font-light drop-shadow-md">Create an account to unlock premium features and personalized offers.</p>
          </div>
        </div>
      </div>
      
      {/* Left Register Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 order-1">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
          <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">New Here?</span>
          <h2 className="text-3xl font-serif mb-2 text-primaryDeep tracking-tight">Create Account</h2>
          <p className="text-gray-500 mb-8 text-sm">Sign up to begin your fashion journey.</p>
          
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" htmlFor="name">First Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-200 focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-primaryDeep text-white font-medium uppercase tracking-wider text-sm hover:bg-secondaryBrown transition-colors duration-300 shadow-md mt-4 flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : "Create Account"}
            </button>
            
            <div className="relative flex items-center my-3">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or register with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            
            <div className="flex gap-4">
              <button type="button" className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium">
                <FaGoogle className="text-xl text-red-500" /> Google
              </button>
              <button type="button" className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium">
                <FaApple className="text-xl text-black" /> Apple
              </button>
            </div>
            
            <p className="text-center text-gray-600 mt-2 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-secondaryBrown font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
