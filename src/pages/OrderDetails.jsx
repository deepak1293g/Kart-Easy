import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authService from "../utils/authService";
import {
    ArrowLeft,
    MapPin,
    CreditCard,
    ShoppingBag,
    ShieldCheck,
    Download,
    FileText
} from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const receiptRef = React.useRef(null);
    const invoiceRef = React.useRef(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await authService.getOrders();
                if (response.data.success) {
                    const foundOrder = response.data.data.find(o => o.id === id);
                    if (foundOrder) {
                        setOrder(foundOrder);
                    }
                }
            } catch (error) {
                console.error("Order Details Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    const handleDownloadReceipt = async () => {
        if (!invoiceRef.current) {
            toast.error("Invoice template not found.");
            return;
        }
        setDownloading(true);
        try {
            const container = invoiceRef.current;
            const pages = container.querySelectorAll('.invoice-page');

            if (pages.length === 0) {
                toast.error("No pages found to export.");
                return;
            }

            // Set temporary styles for high-quality capture
            const originalStyle = container.style.display;
            container.style.display = 'block';

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            for (let i = 0; i < pages.length; i++) {
                const pageElement = pages[i];

                const dataUrl = await toPng(pageElement, {
                    cacheBust: true,
                    backgroundColor: "#ffffff",
                    pixelRatio: 3,
                    width: 794,
                    height: 1123,
                    style: {
                        position: 'static',
                        visibility: 'visible',
                        display: 'block',
                        transform: 'none'
                    }
                });

                if (i > 0) pdf.addPage();
                pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
            }

            container.style.display = originalStyle;
            pdf.save(`invoice_${order.id}.pdf`);
            toast.success("Professional multi-page receipt saved successfully");
        } catch (error) {
            console.error("Receipt Generation Error:", error);
            toast.error("Failed to generate receipt. Please try again.");
        } finally {
            setDownloading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-white font-urbanist">
                <div className="text-center">
                    <div className="w-12 h-12 border-2 border-neutral-100 border-t-black rounded-full mx-auto mb-6 animate-spin" />
                    <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.4em]">Retrieving Records...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-white p-8 font-urbanist">
                <div className="text-center">
                    <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={24} className="text-neutral-500" />
                    </div>
                    <h2 className="text-3xl font-black text-black mb-4 tracking-tighter uppercase italic">Record Not Found</h2>
                    <p className="text-neutral-500 mb-10 text-sm font-medium">We could not locate this order in our database.</p>
                    <button
                        onClick={() => navigate("/my-orders")}
                        className="bg-black text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-95"
                    >
                        Return to Orders
                    </button>
                </div>
            </div>
        );
    }
    const subTotal = order?.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
    const discountAmount = subTotal * 0.01;
    const shippingCost = subTotal > 1000 ? 0 : 40;

    return (
        <>
            <div ref={receiptRef} className="w-full min-h-[calc(100vh-80px)] bg-white font-urbanist text-neutral-900 pb-10 overflow-x-hidden">
                <div className="max-w-[1240px] mx-auto px-4 md:px-6 py-4 md:py-8">

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 border-b border-neutral-100 pb-10"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-neutral-400">Order Ledger Interface</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase italic text-black">
                                Order <span className="text-orange-600">Details.</span>
                            </h1>
                            <div className="flex items-center gap-3 pt-1">
                                <p className="text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Sequence ID:</p>
                                <span className="text-[11px] md:text-sm font-black text-neutral-900 uppercase tracking-tighter leading-none">#ORD-{order.id?.slice(-4).toUpperCase()}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleDownloadReceipt}
                                disabled={downloading}
                                className="bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-neutral-800 transition-all shadow-xl shadow-black/10 disabled:opacity-50"
                            >
                                {downloading ? (
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : <Download size={16} />}
                                <span>Download</span>
                            </motion.button>

                            <div className="flex-1 bg-neutral-50 border border-neutral-100 rounded-2xl p-4 md:p-6 text-center">
                                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1">Authorization Date</p>
                                <p className="text-sm md:text-lg font-black text-neutral-900 uppercase tracking-tighter">{new Date(order.date).toLocaleDateString()}</p>
                            </div>


                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-12 gap-6 md:gap-10">
                        {/* Left Side: Items & Status */}
                        <div className="lg:col-span-8 space-y-6">




                            {/* Order Items */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-neutral-50 pb-4">
                                    <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-neutral-400">Inventory Allocation</h2>
                                    <div className="bg-neutral-50 px-4 py-2 rounded-full border border-neutral-100 italic transition-colors">
                                        <span className="text-[10px] md:text-xs font-black text-neutral-900 uppercase tracking-widest italic">{order.items.length} Secure Assets</span>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 1 }}
                                    className="space-y-3"
                                >
                                    {order.items.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ x: 5 }}
                                            className="bg-white rounded-xl p-3 sm:p-4 border border-neutral-50 flex flex-row items-center gap-3 sm:gap-4 hover:shadow-lg hover:shadow-neutral-100/30 transition-all duration-300 group"
                                        >
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-50 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-500">
                                                {item.thumbnail || item.image ? (
                                                    <img src={item.thumbnail || item.image} className="w-full h-full object-contain" alt="" />
                                                ) : (
                                                    <ShoppingBag size={18} className="text-neutral-300" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 text-left space-y-1">
                                                <h3 className="font-bold text-xs sm:text-sm md:text-base text-neutral-900 line-clamp-2 uppercase italic">{item.title}</h3>
                                                <div className="flex flex-wrap items-center justify-start gap-2 text-[8px] md:text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                                    <span>Qty: {item.quantity}</span>
                                                    <span className="text-neutral-200">|</span>
                                                    <span>₹{item.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <p className="text-[8px] md:text-[10px] font-black text-neutral-300 uppercase tracking-widest italic leading-none">Subtotal</p>
                                                <p className="text-sm sm:text-lg md:text-xl font-black text-neutral-900 tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Side: Summary & Laptop-only Shipping */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="lg:col-span-4 lg:sticky lg:top-32 space-y-8"
                        >

                            {/* Shipping Info */}
                            <div className="bg-white border border-neutral-100 rounded-[2.5rem] p-8 space-y-6 shadow-2xl shadow-neutral-100/50 group">
                                <div className="flex items-center justify-between border-b border-neutral-50 pb-4">
                                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-neutral-400 italic">Shipping Address</h3>
                                    <MapPin size={18} className="text-orange-500 group-hover:scale-110 transition-transform" />
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-neutral-400">Address Line 1</p>
                                        <p className="text-sm md:text-base font-bold text-neutral-900 leading-relaxed">{order.shippingDetails?.address || "Address Detail"}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-neutral-400">City</p>
                                            <p className="text-sm md:text-base font-bold text-neutral-900 italic">{order.shippingDetails?.city || "City"}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-neutral-400">Contact</p>
                                            <p className="text-sm md:text-base font-black text-orange-600 tracking-widest uppercase">{order.shippingDetails?.phone || "Private"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-2xl shadow-neutral-100/50 space-y-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-600/10 transition-colors" />



                                <div className="space-y-6 border-t border-neutral-50 pt-8 relative z-10">
                                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                                        <span className="text-neutral-400">Subtotal</span>
                                        <span className="text-neutral-900 font-black text-sm md:text-base">₹{subTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                                        <span className="text-neutral-400">Coupon Discount</span>
                                        <span className="text-emerald-500 font-black text-sm md:text-base">-₹{discountAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                                        <span className="text-neutral-400">Shipping Charges</span>
                                        <span className="text-orange-500 font-black text-sm md:text-base">
                                            {shippingCost === 0 ? "Comped" : `₹${shippingCost}`}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-10 border-t-4 border-double border-neutral-100 relative z-10">
                                    <div className="flex items-center justify-between gap-4">
                                        <motion.div
                                            whileHover={{ rotate: 15 }}
                                            className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20 shrink-0"
                                        >
                                            <ShieldCheck size={28} strokeWidth={1.5} />
                                        </motion.div>
                                        <div className="text-right flex-1">
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] italic mb-1">Settlement Total.</p>
                                            <h3 className="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tightest leading-none">₹{order.total.toLocaleString()}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>


                    </div>
                </div>
            </div>

            {/* Hidden Formal Invoice Template for Export */}
            <div style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
                <div ref={invoiceRef}>
                    {(() => {
                        const itemsPerPage = 8;
                        const chunks = [];
                        for (let i = 0; i < order.items.length; i += itemsPerPage) {
                            chunks.push(order.items.slice(i, i + itemsPerPage));
                        }

                        return chunks.map((chunk, pageIdx) => (
                            <div
                                key={pageIdx}
                                className="invoice-page w-[794px] h-[1123px] bg-white p-16 font-urbanist text-neutral-900 flex flex-col relative"
                            >
                                {/* Invoice Header - On every page */}
                                <div className="flex justify-between items-start border-b-2 border-neutral-900 pb-8">
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-black tracking-tighter uppercase italic text-black">
                                            Kart <span className="text-orange-600">Easy</span>
                                        </h2>
                                        <div className="space-y-1 text-left">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Official Invoice</p>
                                            <p className="text-xl font-black tracking-tight text-neutral-900">#ORD-{order.id?.slice(-4).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Authorized Date</p>
                                        <p className="text-lg font-black text-neutral-900">{order.date}</p>
                                        <div className={`mt-4 inline-block px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                            {order.status}
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Info - Only on first page */}
                                {pageIdx === 0 && (
                                    <div className="grid grid-cols-2 gap-12 py-8 border-b border-neutral-100">
                                        <div className="space-y-6 text-left">
                                            <div className="space-y-2">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400/60">Customer Name</h3>
                                                <div className="space-y-1">
                                                    <p className="text-xl font-black text-neutral-900 uppercase tracking-tight italic">
                                                        {order.shippingDetails?.name || order.shippingDetails?.fullName || "Valued Customer"}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em]">
                                                        {order.shippingDetails?.email || "Email Registry Not Found"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400/60">Contact info</h3>
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-black text-orange-600 tracking-widest">{order.shippingDetails?.phone || "Private Line"}</p>
                                                    <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">Secure Channel</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-6 text-right">
                                            <div className="space-y-3">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400/60">Shipping Address</h3>
                                                <div className="space-y-1.5">
                                                    <p className="text-lg font-black text-neutral-900 leading-tight uppercase italic ml-auto max-w-[300px]">
                                                        {order.shippingDetails?.address}
                                                    </p>
                                                    <div className="space-y-0.5">
                                                        <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                                            {order.shippingDetails?.city || "Unknown City"}, {order.shippingDetails?.state || "N/A"}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                                            Postal Zone: {order.shippingDetails?.zipCode || "XXXXXX"}
                                                        </p>
                                                    </div>
                                                    <div className="pt-2">
                                                        <span className="bg-neutral-900 text-white px-3 py-1 rounded text-[8px] font-black uppercase tracking-[0.3em]">
                                                            {order.shippingDetails?.country?.toUpperCase() || "INDIA"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Items Table */}
                                <div className="flex-1 py-8">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-neutral-200">
                                                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400">Asset Description</th>
                                                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-center">Qty</th>
                                                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Unit Price</th>
                                                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-neutral-400 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chunk.map((item, idx) => (
                                                <tr key={idx} className="border-b border-neutral-50">
                                                    <td className="py-4">
                                                        <p className="font-black text-neutral-900 tracking-tight">{item.title}</p>
                                                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">SKU: {item.id || 'N/A'}</p>
                                                    </td>
                                                    <td className="py-4 text-center font-bold text-neutral-900">{item.quantity}</td>
                                                    <td className="py-4 text-right font-bold text-neutral-500">₹{item.price.toLocaleString()}</td>
                                                    <td className="py-4 text-right font-black text-neutral-900">₹{(item.price * item.quantity).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Final Summary - Only on last page */}
                                {pageIdx === chunks.length - 1 && (
                                    <div className="border-t-2 border-neutral-900 pt-8 mt-auto">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="space-y-4 text-left">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Payment Protocol</p>
                                                    <p className="text-lg font-black uppercase text-neutral-900">{order.paymentMethod || 'Master Access'}</p>
                                                </div>
                                            </div>
                                            <div className="w-64 space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-bold text-neutral-400 text-[10px] uppercase">Subtotal</span>
                                                    <span className="font-black text-neutral-900">₹{subTotal.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-bold text-neutral-400 text-[10px] uppercase">Coupon Discount</span>
                                                    <span className="font-black text-emerald-600">-₹{discountAmount.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-sm border-b border-neutral-100 pb-3">
                                                    <span className="font-bold text-neutral-400 text-[10px] uppercase">Shipping Charges</span>
                                                    <span className="font-black text-emerald-600 tracking-widest text-[10px]">
                                                        {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-baseline pt-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Total</span>
                                                    <span className="text-4xl font-black tracking-tighter text-neutral-900">₹{order.total.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center pt-8 border-t border-neutral-50">
                                            <p className="text-[8px] font-bold text-neutral-400 max-w-[400px] mx-auto leading-relaxed uppercase tracking-wider">
                                                This is a system generated document. No physical signature is required for authorized verification.
                                            </p>
                                        </div>
                                    </div>
                                )}


                            </div>
                        ));
                    })()}
                </div>
            </div>
        </>
    );
};

export default OrderDetails;
