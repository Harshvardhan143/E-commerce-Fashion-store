import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import customFetch from "../axios/custom";
import { nanoid } from "nanoid";
import { formatDate } from "../utils/formatDate";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  const response = await customFetch(`orders/${id}`);
  return response.data;
};

const SingleOrderHistory = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const navigate = useNavigate();
  const singleOrder = useLoaderData() as Order;

  useEffect(() => {
    if (!user?.id) {
      toast.error("Please login to view this page");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="max-w-screen-2xl mx-auto pt-20 px-5 pb-24">
      <div className="mb-10">
        <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">Your Purchase</span>
        <h1 className="text-4xl font-serif text-primaryDeep">Order Details</h1>
      </div>
      <div className="bg-white border border-gray-200 overflow-x-auto">
        {/* Order Summary */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-serif text-primaryDeep mb-4">
            Order <span className="text-secondaryBrown">#{singleOrder.id}</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-accentMuted p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date</p>
              <p className="text-sm font-medium text-primaryDeep">{formatDate(singleOrder.orderDate)}</p>
            </div>
            <div className="bg-accentMuted p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Subtotal</p>
              <p className="text-sm font-medium text-primaryDeep">₹{singleOrder.subtotal}</p>
            </div>
            <div className="bg-accentMuted p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Shipping + Tax</p>
              <p className="text-sm font-medium text-primaryDeep">₹{(5 + singleOrder.subtotal / 5).toFixed(2)}</p>
            </div>
            <div className="bg-primaryDeep p-4">
              <p className="text-xs text-secondaryBrown uppercase tracking-wider mb-1">Total</p>
              <p className="text-sm font-semibold text-white">₹{(singleOrder.subtotal + 5 + singleOrder.subtotal / 5).toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-accentMuted text-primaryDeep text-xs font-medium uppercase tracking-wider border border-gray-200">
              {singleOrder.orderStatus}
            </span>
          </div>
        </div>

        {/* Items table */}
        <div className="p-6">
          <h3 className="text-base font-serif text-primaryDeep mb-4">Items Ordered</h3>
          <table className="singleOrder-table min-w-full">
            <thead className="bg-primaryDeep text-white">
              <tr>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-widest">Product Name</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-widest">Qty</th>
                <th className="py-3 px-4 text-xs font-semibold uppercase tracking-widest">Price</th>
              </tr>
            </thead>
            <tbody>
              {singleOrder.products.map((product) => (
                <tr key={nanoid()} className="border-b border-gray-100 hover:bg-accentMuted transition-colors">
                  <td className="py-3 px-4 text-sm text-primaryDeep font-medium">{product?.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-center">{product?.quantity}</td>
                  <td className="py-3 px-4 text-sm text-primaryDeep font-medium text-right">₹{product?.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderHistory;
