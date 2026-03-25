import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import customFetch from "../axios/custom";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineArrowRightOnRectangle,
  HiOutlineShoppingBag,
  HiOutlinePencilSquare,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", lastname: "", email: "", password: "" });
  const [isSaving, setIsSaving] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = storedUser?.role === "admin";

  const logout = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    navigate("/");
  };

  const fetchUser = async (userId: number | string) => {
    try {
      const response = await customFetch(`/users/${userId}`);
      setUser(response.data);
      setFormData({
        name: response.data.name || "",
        lastname: response.data.lastname || "",
        email: response.data.email || "",
        password: response.data.password || "",
      });
    } catch {
      toast.error("Failed to load profile");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    const userId = storedUser.id;
    if (!userId) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    setIsSaving(true);
    try {
      await customFetch.put(`/users/${userId}`, { ...user, ...formData });
      // Update localStorage
      localStorage.setItem("user", JSON.stringify({ ...storedUser, ...formData }));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      fetchUser(userId);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!storedUser?.id) {
      toast.error("Please login to view this page");
      navigate("/login");
    } else {
      fetchUser(storedUser.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const initials = user ? `${user.name?.charAt(0) || ""}${user.lastname?.charAt(0) || ""}`.toUpperCase() : "?";

  return (
    <div className="min-h-screen bg-accentMuted py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">Account</span>
          <h1 className="text-4xl font-serif text-primaryDeep mb-2">My Profile</h1>
          <p className="text-gray-500 font-light text-sm">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Avatar + Nav */}
          <div className="lg:col-span-1 space-y-4">
            {/* Avatar Card */}
            <div className="bg-white p-6 shadow-sm border border-gray-200 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primaryDeep text-white flex items-center justify-center text-3xl font-serif mb-4">
                {initials}
              </div>
              <h2 className="text-lg font-semibold text-primaryDeep">{user?.name} {user?.lastname}</h2>
              <p className="text-sm text-gray-500 mb-2">{user?.email}</p>
              {isAdmin && (
                <span className="inline-block bg-secondaryBrown text-white text-[10px] uppercase tracking-widest font-medium px-3 py-1 mt-1">
                  Admin
                </span>
              )}
            </div>

            {/* Quick Nav */}
            <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
              <Link
                to="/order-history"
                className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 hover:bg-accentMuted transition-colors text-primaryDeep"
              >
                <HiOutlineShoppingBag className="text-xl text-secondaryBrown" />
                <span className="text-sm font-medium">My Orders</span>
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 hover:bg-accentMuted transition-colors text-primaryDeep"
                >
                  <HiOutlineUser className="text-xl text-secondaryBrown" />
                  <span className="text-sm font-medium">Admin Panel</span>
                </Link>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition-colors text-red-500 w-full"
              >
                <HiOutlineArrowRightOnRectangle className="text-xl" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Right - Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-serif text-primaryDeep">Personal Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-secondaryBrown transition-colors"
                >
                  <HiOutlinePencilSquare className="text-lg" />
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                    <div className="relative">
                      <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        placeholder="First Name"
                        className={`w-full pl-10 pr-4 py-3 border text-sm outline-none transition-all duration-200 ${
                          isEditing
                            ? "border-gray-300 bg-white focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown"
                            : "border-gray-100 bg-gray-50 text-gray-600 cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                    <div className="relative">
                      <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                      <input
                        type="text"
                        value={formData.lastname}
                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Last Name"
                        className={`w-full pl-10 pr-4 py-3 border text-sm outline-none transition-all duration-200 ${
                          isEditing
                            ? "border-gray-300 bg-white focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown"
                            : "border-gray-100 bg-gray-50 text-gray-600 cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <HiOutlineEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Email"
                      className={`w-full pl-10 pr-4 py-3 border text-sm outline-none transition-all duration-200 ${
                        isEditing
                          ? "border-gray-300 bg-white focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown"
                          : "border-gray-100 bg-gray-50 text-gray-600 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      disabled={!isEditing}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-4 py-3 border text-sm outline-none transition-all duration-200 ${
                        isEditing
                          ? "border-gray-300 bg-white focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown"
                          : "border-gray-100 bg-gray-50 text-gray-600 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full py-3.5 px-4 bg-primaryDeep text-white font-medium text-sm uppercase tracking-wider hover:bg-secondaryBrown transition-colors duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-60"
                  >
                    <HiOutlineCheckCircle className="text-lg" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
