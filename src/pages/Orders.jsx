import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authService from "../utils/authService";
import { ShoppingBag, ArrowRight, Calendar, ChevronRight, CreditCard, Wallet, Truck, Package, Filter, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { toast } from "react-toastify";

/**
 * Orders Component
 * 
 * "Cool & Simple" layout: 
 * - Wider container (max-w-6xl)
 * - Cleaner card aesthetics (no heavy borders, subtle shadows)
 * - Modern typography and status badges
 */
const Orders = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Handle Order Success Toast
    useEffect(() => {
        if (location.state?.orderSuccess) {
            toast.success("Order Placed Successfully!");
            // Clear the state so it doesn't show again on reload
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await authService.getOrders();
                if (response.data.success) {
                    const sortedOrders = [...response.data.data].sort((a, b) =>
                        new Date(b.date) - new Date(a.date)
                    );
                    setOrders(sortedOrders);
                }
            } catch (error) {
                console.error("Order Service Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="bg-white min-h-[calc(100vh-80px)] font-urbanist text-neutral-900 pb-12 md:pb-20">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-16">

                {loading ? (
                    <div className="space-y-4 md:space-y-6">
                        <div className="h-8 md:h-10 w-40 md:w-48 bg-neutral-100 rounded-lg animate-pulse" />
                        <div className="grid grid-cols-1 gap-4 md:gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-24 md:h-32 bg-neutral-50 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="space-y-8 md:space-y-12">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-neutral-100 pb-6 md:pb-10">
                            <div className="space-y-1 md:space-y-2">
                                <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-black">
                                    Your <span className="text-orange-600">Orders</span>
                                </h1>
                                <p className="text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                    {orders.length} Premium Acquisitions
                                </p>
                            </div>

                            <div className="bg-neutral-50 px-5 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl border border-neutral-100 flex items-center gap-6 md:gap-8 max-w-fit">
                                <div className="space-y-0.5 md:space-y-1">
                                    <p className="text-[8px] md:text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Value</p>
                                    <p className="text-xl md:text-2xl font-black text-neutral-900">₹{orders.reduce((acc, order) => acc + order.total, 0).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Orders List */}
                        <div className="grid grid-cols-1 gap-4 md:gap-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() => navigate(`/order-details/${order.id}`)}
                                    className="group relative bg-white rounded-xl md:rounded-2xl p-4 md:p-8 border border-neutral-100 hover:border-neutral-200 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col md:flex-row md:items-center gap-4 md:gap-10"
                                >
                                    {/* Status Section */}
                                    <div className="shrink-0 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-3">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[8px] md:text-[9px] font-bold uppercase tracking-widest border ${order.status === 'Delivered'
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            : 'bg-orange-50 text-orange-600 border-orange-100'
                                            }`}>
                                            <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                            {order.status}
                                        </div>
                                        <div>
                                            <p className="text-[8px] md:text-[9px] font-bold text-neutral-500 uppercase tracking-widest leading-none mb-1 hidden md:block">Ref</p>
                                            <p className="text-[10px] md:text-sm font-black text-neutral-900 leading-none">#{order.id.slice(0, 8).toUpperCase()}</p>
                                        </div>
                                    </div>

                                    {/* Info Section */}
                                    <div className="grow space-y-1">
                                        <h3 className="text-base md:text-lg font-black text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                                            {order.items[0]?.title}
                                            {order.items.length > 1 && <span className="text-neutral-500 ml-2 text-xs md:text-base">+ {order.items.length - 1} more</span>}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-1.5 text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={11} className="md:w-3 md:h-3" />
                                                {order.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="flex -space-x-1.5">
                                                    {order.items.slice(0, 2).map((item, idx) => (
                                                        <div key={idx} className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-neutral-100 border border-white overflow-hidden shadow-sm">
                                                            <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span>{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {order.paymentMethod === 'card' && <CreditCard size={11} className="md:w-3 md:h-3" />}
                                                {order.paymentMethod === 'upi' && <Wallet size={11} className="md:w-3 md:h-3" />}
                                                {order.paymentMethod === 'cod' && <Truck size={11} className="md:w-3 md:h-3" />}
                                                {order.paymentMethod}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="shrink-0 flex items-center justify-between md:justify-end gap-6 md:gap-10 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-50 w-full md:w-auto">
                                        <div className="text-left md:text-right">
                                            <p className="text-[8px] md:text-[9px] font-bold text-neutral-500 uppercase tracking-widest leading-none mb-1">Total</p>
                                            <p className="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">₹{order.total.toLocaleString()}</p>
                                        </div>
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300">
                                            <ChevronRight size={16} md:size={18} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 py-12 md:p-10 md:py-20">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-6 md:mb-8 text-neutral-500">
                            <ShoppingBag size={28} md:size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-black tracking-tighter uppercase italic mb-3 md:mb-4">No records found</h3>
                        <p className="text-xs md:text-sm text-neutral-500 mb-6 md:mb-8 max-w-xs font-medium">You haven't placed any orders yet. Begin your journey into premium shopping today.</p>
                        <Link
                            to="/"
                            className="bg-black text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-neutral-800 transition-all flex items-center gap-3"
                        >
                            <ShoppingBag size={16} md:size={18} />
                            Browse Store
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Orders;
