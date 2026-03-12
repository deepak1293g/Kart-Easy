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
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 md:py-8">

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
                    <div className="space-y-4 md:space-y-12">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-neutral-100 pb-4 md:pb-12">
                            <div className="space-y-1.5 md:space-y-3">
                                <h1 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase italic text-black">
                                    Your <span className="text-orange-600">Orders</span>
                                </h1>
                                <p className="text-[9px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-[0.3em] leading-none">
                                    {orders.length} Premium Acquisitions
                                </p>
                            </div>

                            <div className="bg-neutral-50/50 px-6 md:px-10 py-4 md:py-6 rounded-2xl md:rounded-3xl border border-neutral-100/50 flex flex-col items-center justify-center min-w-[140px] md:min-w-[180px]">
                                <p className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] text-neutral-500 uppercase mb-1">Value</p>
                                <p className="text-xl md:text-3xl font-bold text-neutral-900 tracking-tighter">₹{orders.reduce((acc, order) => acc + order.total, 0).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Orders List */}
                        <div className="grid grid-cols-1 gap-4 md:gap-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    onClick={() => navigate(`/order-details/${order.id}`)}
                                    className="group bg-white rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 border border-neutral-100 hover:border-neutral-200 hover:shadow-2xl hover:shadow-neutral-100/30 transition-all duration-500 cursor-pointer flex flex-col md:flex-row md:items-center gap-6 md:gap-12"
                                >
                                    {/* Status Section */}
                                    <div className="shrink-0 space-y-3">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border ${order.status === 'Delivered'
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            : 'bg-orange-50 text-orange-600 border-orange-100'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                            {order.status}
                                        </div>
                                        <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest leading-none ml-1">#ORD-{order.id.slice(-4).toUpperCase()}</p>
                                    </div>

                                    {/* Info Section */}
                                    <div className="grow space-y-2">
                                        <h3 className="text-lg md:text-xl font-black text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                                            {order.items[0]?.title}
                                            {order.items.length > 1 && <span className="text-neutral-500 ml-2 font-bold text-xs md:text-lg">+ {order.items.length - 1} more</span>}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-6 md:gap-x-10 gap-y-2 text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em]">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={13} className="text-neutral-500" />
                                                {order.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <ShoppingBag size={13} className="text-neutral-500" />
                                                <span>{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {order.paymentMethod === 'card' && <CreditCard size={13} className="text-neutral-500" />}
                                                {order.paymentMethod === 'upi' && <Wallet size={13} className="text-neutral-500" />}
                                                {order.paymentMethod === 'cod' && <Truck size={13} className="text-neutral-500" />}
                                                {order.paymentMethod}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="shrink-0 flex items-center justify-between md:justify-end gap-10 md:gap-14 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-50 w-full md:w-auto">
                                        <div className="text-left md:text-right">
                                            <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest leading-none mb-1">Total</p>
                                            <p className="text-xl md:text-2xl font-black text-neutral-900 tracking-tightest leading-none">₹{order.total.toLocaleString()}</p>
                                        </div>
                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-500 shadow-sm">
                                            <ChevronRight size={18} md:size={24} />
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
