import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import customFetch from "../axios/custom";
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiOutlineUsers,
  HiOutlineShoppingBag,
  HiOutlineArchiveBox,
  HiOutlineXMark,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

type AdminUser = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role?: string;
  password: string;
};

type AdminProduct = {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
};

const CATEGORIES = [
  "special-edition",
  "luxury-collection",
  "summer-edition",
  "unique-collection",
  "men",
  "women",
  "kids",
  "boys",
  "girls",
];

const emptyProduct: Omit<AdminProduct, "id"> = {
  title: "",
  image: "product image 1.jpg",
  category: "luxury-collection",
  price: 0,
  popularity: 5,
  stock: 100,
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"products" | "users">("products");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Product modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [productForm, setProductForm] = useState<Omit<AdminProduct, "id">>(emptyProduct);
  const [isSaving, setIsSaving] = useState(false);

  // Auth guard
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!storedUser?.id) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (storedUser?.role !== "admin") {
      toast.error("You do not have admin access");
      navigate("/");
      return;
    }
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, productsRes] = await Promise.all([
        customFetch.get("/users"),
        customFetch.get("/products"),
      ]);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE USER
  const handleDeleteUser = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await customFetch.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  // DELETE PRODUCT
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await customFetch.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  // OPEN PRODUCT MODAL (add or edit)
  const openProductModal = (product?: AdminProduct) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        title: product.title,
        image: product.image,
        category: product.category,
        price: product.price,
        popularity: product.popularity,
        stock: product.stock,
      });
    } else {
      setEditingProduct(null);
      setProductForm(emptyProduct);
    }
    setShowProductModal(true);
  };

  // SAVE PRODUCT (add or edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || productForm.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSaving(true);
    try {
      if (editingProduct) {
        const res = await customFetch.put(`/products/${editingProduct.id}`, {
          ...editingProduct,
          ...productForm,
        });
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? res.data : p))
        );
        toast.success("Product updated successfully");
      } else {
        const newId = String(Date.now());
        const res = await customFetch.post("/products", { id: newId, ...productForm });
        setProducts((prev) => [...prev, res.data]);
        toast.success("Product added successfully");
      }
      setShowProductModal(false);
    } catch {
      toast.error("Failed to save product");
    } finally {
      setIsSaving(false);
    }
  };

  const stats = [
    { label: "Total Products", value: products.length, icon: HiOutlineArchiveBox },
    { label: "Registered Users", value: users.length, icon: HiOutlineUsers },
    { label: "Total Orders", value: "—", icon: HiOutlineShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-accentMuted py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">Store Admin</span>
            <h1 className="text-4xl font-serif text-primaryDeep mb-1">Admin Panel</h1>
            <p className="text-gray-500 font-light text-sm">Manage your store — products, users and more</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => openProductModal()}
              className="flex items-center gap-2 bg-primaryDeep text-white px-5 py-2.5 text-sm font-medium uppercase tracking-wider hover:bg-secondaryBrown transition-colors duration-300 shadow-md"
            >
              <HiOutlinePlus className="text-lg" />
              Add Product
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 shadow-sm border border-gray-200 flex items-center gap-5">
              <div className="w-12 h-12 bg-primaryDeep/5 border border-secondaryBrown/30 flex items-center justify-center">
                <stat.icon className="text-2xl text-secondaryBrown" />
              </div>
              <div>
                <p className="text-2xl font-serif font-semibold text-primaryDeep">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "products"
                  ? "border-b-2 border-secondaryBrown text-primaryDeep"
                  : "text-gray-500 hover:text-primaryDeep"
              }`}
            >
              <HiOutlineArchiveBox className="text-lg" />
              Products
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "users"
                  ? "border-b-2 border-secondaryBrown text-primaryDeep"
                  : "text-gray-500 hover:text-primaryDeep"
              }`}
            >
              <HiOutlineUsers className="text-lg" />
              Users
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* PRODUCTS TABLE */}
              {activeTab === "products" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={`/assets/${product.image}`}
                                alt={product.title}
                                className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                                onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/48"; }}
                              />
                              <div>
                                <p className="font-medium text-primaryDeep whitespace-nowrap">{product.title}</p>
                                <p className="text-xs text-gray-400">ID: {product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-accentMuted text-primaryDeep text-xs px-2.5 py-1 border border-gray-200 capitalize">
                              {product.category.replace(/-/g, " ")}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-primaryDeep">₹{product.price.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              product.stock === 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"
                            }`}>
                              {product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openProductModal(product)}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
                                title="Edit product"
                              >
                                <HiOutlinePencilSquare className="text-lg" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                                title="Delete product"
                              >
                                <HiOutlineTrash className="text-lg" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* USERS TABLE */}
              {activeTab === "users" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-primaryDeep text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                                {user.name?.charAt(0).toUpperCase()}{user.lastname?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{user.name} {user.lastname}</p>
                                <p className="text-xs text-gray-400">ID: {user.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-medium px-2.5 py-1 ${
                              user.role === "admin"
                                ? "bg-secondaryBrown text-white"
                                : "bg-accentMuted text-primaryDeep border border-gray-200"
                            }`}>
                              {user.role === "admin" ? "Admin" : "Customer"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={user.role === "admin"}
                                className={`p-2 rounded-lg transition-colors ${
                                  user.role === "admin"
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "hover:bg-red-50 text-gray-500 hover:text-red-600"
                                }`}
                                title={user.role === "admin" ? "Cannot delete admin" : "Delete user"}
                              >
                                <HiOutlineTrash className="text-lg" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif text-primaryDeep">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setShowProductModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <HiOutlineXMark className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Product Title *</label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Luxury White Dress"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Image Filename</label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="e.g. product image 1.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">Must be a file in the /assets/ folder</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm transition-all bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Stock</label>
                  <input
                    type="number"
                    min={0}
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Popularity (1-20)</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={productForm.popularity}
                  onChange={(e) => setProductForm({ ...productForm, popularity: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none text-sm transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 py-3 border border-gray-200 text-gray-600 text-sm font-medium hover:bg-accentMuted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 bg-primaryDeep text-white text-sm font-medium uppercase tracking-wider hover:bg-secondaryBrown transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <HiOutlineCheckCircle className="text-lg" />
                  {isSaving ? "Saving..." : editingProduct ? "Update" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
