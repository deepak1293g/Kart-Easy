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
        <div ref={receiptRef} className="w-full min-h-[calc(100vh-80px)] bg-white font-urbanist text-neutral-900 pb-20">
            <div className="max-w-[1400px] mx-auto px-8 py-6 md:py-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 md:mb-8 border-b border-neutral-100 pb-4 md:pb-6">
                    <div className="space-y-2 md:space-y-4">
                        <div className="space-y-1">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-black">
                                Order <span className="text-orange-600">Details</span>
                            </h1>
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                Reference: <span className="text-neutral-900 select-all">{order.id}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        <button
                            onClick={handleDownloadReceipt}
                            disabled={downloading}
                            className="bg-black text-white px-5 py-3 rounded-xl border border-black text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-neutral-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {downloading ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Syncing...</span>
                                </>
                            ) : (
                                <>
                                    <Download size={14} />
                                    <span>Save Receipt</span>
                                </>
                            )}
                        </button>
                        <div className="bg-neutral-50 px-6 py-3 rounded-xl border border-neutral-100 hidden md:block">
                            <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Authorized Log</p>
                            <p className="text-sm font-black text-neutral-900">{order.date}</p>
                        </div>
                        <div className={`px-4 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : 'bg-orange-50 text-orange-600 border-orange-100'
                            }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                            {order.status}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
                    {/* Left Side: Items & Status */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Status Timeline */}
                        <div className="space-y-4 md:space-y-6">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Logistic Sequence</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                {[
                                    { label: 'Registered', sub: order.date, done: true },
                                    { label: 'Processing', sub: 'Verified', done: order.status !== 'Pending' },
                                    { label: 'Shipment', sub: 'In Transit', done: order.status === 'Delivered' },
                                    { label: 'Arrival', sub: 'Completed', done: order.status === 'Delivered' }
                                ].map((step, idx) => (
                                    <div key={idx} className={`p-4 md:p-5 rounded-2xl border transition-all duration-300 ${step.done ? 'bg-white border-neutral-100 shadow-sm' : 'bg-neutral-50/50 border-neutral-50 opacity-40'}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`w-2 h-2 rounded-full ${step.done ? 'bg-orange-500' : 'bg-neutral-300'}`} />
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-900">{step.label}</span>
                                        </div>
                                        <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-tighter">{step.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Info (Visible on Mobile/Tablet, Hidden on Laptop) */}
                        <div className="lg:hidden bg-neutral-50 rounded-3xl p-6 md:p-8 border border-neutral-100 space-y-6 md:space-y-8">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 md:pb-5">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Recipient Node</h3>
                                <MapPin size={16} className="text-orange-600" />
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Registry Address</p>
                                    <p className="text-xs sm:text-sm font-bold text-neutral-900 leading-relaxed">{order.shippingDetails?.address || "Address Detail"}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">City Cluster</p>
                                        <p className="text-xs sm:text-sm font-bold text-neutral-900">{order.shippingDetails?.city || "City"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Contact</p>
                                        <p className="text-xs sm:text-sm font-black text-orange-600 tracking-widest">{order.shippingDetails?.phone || "Private"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Inventory Allocation</h2>
                                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">{order.items.length} Assets</span>
                            </div>

                            <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-neutral-100 flex flex-row items-center gap-5 sm:gap-8 hover:border-neutral-200 transition-all duration-300"
                                    >
                                        <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shrink-0 bg-neutral-50 border border-neutral-100 flex items-center justify-center p-1.5 shadow-sm">
                                            {item.thumbnail || item.image ? (
                                                <img src={item.thumbnail || item.image} className="w-full h-full object-cover rounded-lg" alt="" />
                                            ) : (
                                                <ShoppingBag size={20} className="text-neutral-400" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 text-left space-y-0.5 sm:space-y-1">
                                            <h3 className="font-black text-xs sm:text-base md:text-lg text-neutral-900 tracking-tight truncate">{item.title}</h3>
                                            <div className="flex flex-wrap items-center justify-start gap-x-3 sm:gap-x-4 gap-y-0.5 text-[8px] sm:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                                <span>Qty: {item.quantity}</span>
                                                <span className="text-neutral-400">•</span>
                                                <span>Unit: ₹{item.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="text-[8px] sm:text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-0.5">Subtotal</p>
                                            <p className="text-base sm:text-xl md:text-2xl font-black text-neutral-900 tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Summary & Laptop-only Shipping */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">

                        {/* Shipping Info (Visible on Laptop, Hidden on Mobile/Tablet) */}
                        <div className="hidden lg:block bg-neutral-50 rounded-3xl p-6 md:p-8 border border-neutral-100 space-y-6 md:space-y-8">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 md:pb-5">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Recipient Node</h3>
                                <MapPin size={16} className="text-orange-600" />
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Registry Address</p>
                                    <p className="text-xs sm:text-sm font-bold text-neutral-900 leading-relaxed">{order.shippingDetails?.address || "Address Detail"}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">City Cluster</p>
                                        <p className="text-xs sm:text-sm font-bold text-neutral-900">{order.shippingDetails?.city || "City"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">Contact</p>
                                        <p className="text-xs sm:text-sm font-black text-orange-600 tracking-widest">{order.shippingDetails?.phone || "Private"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Financial Summary */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-neutral-100 shadow-xl shadow-neutral-100/50 space-y-8">
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-5 md:pb-6">
                                <div className="flex items-center gap-3">
                                    <CreditCard size={18} className="text-neutral-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Payment Protocol</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900 border px-3 py-1 rounded-lg">
                                    {order.paymentMethod?.toUpperCase() || 'MASTER'}
                                </span>
                            </div>

                            <div className="space-y-4 border-t border-neutral-100 pt-6">
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-neutral-500">Subtotal</span>
                                    <span className="font-bold text-neutral-900">₹{subTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-neutral-500">Coupon Discount (1%)</span>
                                    <span className="font-bold text-emerald-600">-₹{discountAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-neutral-500">Delivery Charges</span>
                                    <span className="font-bold text-emerald-600 uppercase tracking-widest text-[10px]">
                                        {shippingCost === 0 ? "Free Delivery" : `₹${shippingCost}`}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-10 border-t-2 border-dashed border-neutral-100">
                                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Final Settlement</p>
                                <div className="flex items-baseline justify-between gap-4">
                                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter shrink-0">₹{order.total.toLocaleString()}</h3>
                                    <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/10 shrink-0">
                                        <ShieldCheck size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center pt-4">
                            <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-[0.4em] leading-relaxed">
                                Secure Authorized <br /> Access Only
                            </p>
                        </div>
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
                                            <p className="text-xl font-black tracking-tight text-neutral-900">#{order.id.toUpperCase()}</p>
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
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400/60">Customer Node</h3>
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
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400/60 font-black">Contact Sequence</h3>
                                                <div className="space-y-0.5">
                                                    <p className="text-sm font-black text-orange-600 tracking-widest">{order.shippingDetails?.phone || "Private Line"}</p>
                                                    <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">Secure Voice Channel</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-6 text-right">
                                            <div className="space-y-3">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400/60">Fulfillment Node</h3>
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
                                                    <span className="font-bold text-neutral-400 text-[10px] uppercase">Discount (1%)</span>
                                                    <span className="font-black text-emerald-600">-₹{discountAmount.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-sm border-b border-neutral-100 pb-3">
                                                    <span className="font-bold text-neutral-400 text-[10px] uppercase">Delivery</span>
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

                                {/* Footer Page Number */}
                                <div className="absolute bottom-8 left-0 right-0 text-center">
                                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-neutral-300">
                                        Page {pageIdx + 1} of {chunks.length} | Secure Authorized Documentation &copy; Kart Easy
                                    </p>
                                </div>
                            </div>
                        ));
                    })()}
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
