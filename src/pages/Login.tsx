import { Link, useNavigate } from "react-router-dom";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import { FaGoogle, FaApple } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await customFetch.post("/auth/login", { email, password });
      const user = response.data;

      toast.success(`Welcome back, ${user.name}!`);
      localStorage.setItem("user", JSON.stringify(user));
      store.dispatch(setLoginStatus(true));

      // Redirect admin to panel, others to home
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const msg = err?.response?.data?.message || "Invalid email or password";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      if (parsed?.role === "admin") navigate("/admin");
      else navigate("/");
    }
  }, [navigate]);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex bg-gray-50">
      {/* Left Image Section */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-white text-center px-10">
            <h1 className="text-5xl font-serif mb-4 tracking-wide drop-shadow-lg">
              Mewar Nath<br />
              <span className="italic font-light">Fashion Store</span>
            </h1>
            <p className="text-lg font-light drop-shadow-md text-white/90">
              Discover the latest trends and exclusive collections tailored for you.
            </p>
          </div>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
          <div className="mb-8">
            <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">Welcome Back</span>
            <h2 className="text-3xl font-serif text-primaryDeep tracking-tight mb-2">Sign In</h2>
            <p className="text-gray-500 text-sm">Access your account to continue shopping</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondaryBrown text-xs font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-black focus:ring-black cursor-pointer w-4 h-4"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-black font-medium hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-primaryDeep text-white font-medium uppercase tracking-wider text-sm hover:bg-secondaryBrown transition-colors duration-300 shadow-md mt-2 flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <div className="relative flex items-center my-1">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <FaGoogle className="text-red-500" /> Google
              </button>
              <button
                type="button"
                className="flex-1 flex justify-center items-center gap-2 py-3 px-4 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <FaApple className="text-black" /> Apple
              </button>
            </div>

            <p className="text-center text-gray-600 text-sm mt-1">
              Don't have an account?{" "}
              <Link to="/register" className="text-secondaryBrown font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
