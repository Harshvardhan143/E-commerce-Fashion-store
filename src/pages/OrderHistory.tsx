import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../axios/custom";
import { formatDate } from "../utils/formatDate";

export const loader = async () => {
  try {
    const response = await customFetch.get("/orders");
    
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
};

const OrderHistory = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const orders = useLoaderData() as Order[];
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      toast.error("Please login to view this page");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="bg-white mx-auto max-w-screen-2xl px-6 lg:px-12 py-20">
      <div className="mb-12">
        <span className="text-secondaryBrown uppercase tracking-[0.3em] text-[10px] font-bold mb-3 block italic">Account Dashboard</span>
        <h1 className="text-5xl font-serif text-primaryDeep tracking-tight">Purchase History</h1>
      </div>
      
      <div className="overflow-hidden border border-gray-100 bg-white">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-left text-gray-400">Reference</th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-left text-gray-400">Date Placed</th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-left text-gray-400">Order Investment</th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-left text-gray-400">Status</th>
              <th className="py-5 px-6 text-[10px] font-bold uppercase tracking-widest text-right text-gray-400">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => order?.user && order.user.id === user.id && (
              <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-6 px-6 text-xs text-primaryDeep font-bold tracking-widest uppercase">#{String(order.id).slice(-6)}</td>
                <td className="py-6 px-6 text-sm text-gray-500 font-light italic">{formatDate(order.orderDate)}</td>
                <td className="py-6 px-6 text-sm text-primaryDeep font-medium">
                  ₹{(order.subtotal + 500 + (order.subtotal * 0.18)).toLocaleString()}
                </td>
                <td className="py-6 px-6 text-sm">
                  <span className="inline-block px-3 py-1 bg-white text-secondaryBrown text-[10px] font-bold uppercase tracking-widest border border-secondaryBrown/20">
                    {order.orderStatus}
                  </span>
                </td>
                <td className="py-6 px-6 text-sm text-right">
                  <Link
                    to={`/order-history/${order.id}`}
                    className="text-primaryDeep hover:text-secondaryBrown font-bold text-[10px] uppercase tracking-widest border-b border-gray-200 hover:border-secondaryBrown pb-1 transition-all"
                  >
                    View Selection
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {orders.filter(order => order?.user && order.user.id === user.id).length === 0 && (
        <div className="py-20 text-center border border-dashed border-gray-100 mt-8">
           <p className="text-gray-400 italic font-light">No previous selections found.</p>
           <Link to="/shop" className="text-secondaryBrown uppercase tracking-widest text-[10px] font-bold mt-4 inline-block border-b border-secondaryBrown">Return to Boutique</Link>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
