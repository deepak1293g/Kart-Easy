import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../store/cartSlice";
import authService from "../utils/authService";
import {
    ShoppingBag, LoaderIcon, ChevronRight, Check, Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const directBuyProduct = location.state?.directBuyProduct;

    const [loading, setLoading] = useState(false);
    const [agreement, setAgreement] = useState(false);
    const isProcessing = useRef(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const checkoutItems = useMemo(() => {
        if (directBuyProduct) {
            return [{ ...directBuyProduct, quantity: 1 }];
        }
        return cartItems;
    }, [cartItems, directBuyProduct]);

    const subTotal = useMemo(() => {
        return checkoutItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 1;
            return total + (price * quantity);
        }, 0);
    }, [checkoutItems]);

    // Pricing Logic: 1% Discount, ₹40 shipping if < ₹1000
    const discountAmount = subTotal * 0.01;
    const shippingCost = subTotal > 1000 ? 0 : 40;
    const finalTotal = subTotal - discountAmount + shippingCost;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            // Only allow digits and max 10 characters
            const cleaned = value.replace(/\D/g, "").slice(0, 10);
            setFormData((prev) => ({ ...prev, [name]: cleaned }));
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async () => {
        if (!agreement) {
            toast.error("Please agree to the Terms and Conditions");
            return;
        }
        if (!formData.fullName || !formData.email || !formData.phone) {
            toast.error("Please fill in all required contact details");
            return;
        }

        if (formData.phone.length !== 10) {
            toast.error("Phone number must be exactly 10 digits");
            return;
        }

        if (loading || isProcessing.current) return;

        setLoading(true);
        isProcessing.current = true;

        try {
            const orderData = {
                total: finalTotal,
                items: checkoutItems,
                shippingDetails: {
                    ...formData,
                    address: `${formData.city}, ${formData.state}, ${formData.zipCode}`,
                    name: formData.fullName
                },
                paymentMethod: 'visa',
            };
            const response = await authService.saveOrder(orderData);
            if (response.data.success) {
                if (!directBuyProduct) {
                    dispatch(clearCart());
                }
                navigate("/success", { state: { orderSuccess: true } });
            } else {
                toast.error(response.data.message || "Failed to place order");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
            isProcessing.current = false;
        }
    };

    if (checkoutItems.length === 0 && !loading) {
        return (
            <div className="bg-white min-h-screen flex flex-col items-center justify-center p-10 text-center font-urbanist">
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-8 text-neutral-500">
                    <ShoppingBag size={40} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-black mb-4 text-neutral-900 tracking-tighter uppercase">Your Cart is Empty</h2>
                <p className="text-neutral-500 mb-8 max-w-xs font-medium">Looks like you haven't added anything to your cart yet.</p>
                <Link
                    to="/"
                    className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-200"
                >
                    Return to Store
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-urbanist text-neutral-900 selection:bg-orange-600 selection:text-white pb-20 overflow-x-hidden">

            {/* Main Content Layout */}
            <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">

                {/* Left Column: Shipping Info */}
                <div className="p-8 lg:p-20 border-r border-neutral-100">
                    <div className="max-w-xl mx-auto space-y-12">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-black">
                            Checkout <span className="text-orange-600">Page</span>
                        </h1>

                        {/* Form Fields */}
                        <form className="space-y-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-orange-600">Shipping Information</h2>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-neutral-900">Full name <span className="text-orange-600">*</span></label>
                                <input
                                    type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-4 focus:ring-1 focus:ring-orange-600 focus:border-orange-600 outline-none transition-all font-medium"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-neutral-900">Email address <span className="text-orange-600">*</span></label>
                                <input
                                    type="email" name="email" value={formData.email} onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-4 focus:ring-1 focus:ring-orange-600 focus:border-orange-600 outline-none transition-all font-medium"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-neutral-900">Phone number <span className="text-orange-600">*</span></label>
                                <div className="flex bg-white border border-neutral-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-orange-600 transition-all">
                                    <div className="px-4 border-r border-neutral-100 flex items-center gap-2 text-neutral-900 bg-neutral-50/50 cursor-pointer font-bold">
                                        <span className="text-lg">🇮🇳</span>
                                        <ChevronRight className="rotate-90" size={12} />
                                    </div>
                                    <input
                                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                        placeholder="Enter phone number"
                                        className="flex-1 px-5 py-4 outline-none font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wider text-neutral-900">Country <span className="text-orange-600">*</span></label>
                                <div className="relative">
                                    <select
                                        name="country" value={formData.country} onChange={handleChange}
                                        className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-4 appearance-none outline-none focus:ring-1 focus:ring-orange-600 transition-all font-medium text-neutral-700"
                                        required
                                    >
                                        <option value="">Choose State / Country</option>
                                        <option value="India">India</option>
                                        <option value="New York">New York</option>
                                        <option value="California">California</option>
                                    </select>
                                    <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-neutral-500 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-wider text-neutral-900">City</label>
                                    <input
                                        type="text" name="city" value={formData.city} onChange={handleChange}
                                        placeholder="Enter city"
                                        className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-4 outline-none focus:ring-1 focus:ring-orange-600 font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-wider text-neutral-900">State</label>
                                    <input
                                        type="text" name="state" value={formData.state} onChange={handleChange}
                                        placeholder="Enter state"
                                        className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-4 outline-none focus:ring-1 focus:ring-orange-600 font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-wider text-neutral-900">ZIP Code</label>
                                    <input
                                        type="text" name="zipCode" value={formData.zipCode} onChange={handleChange}
                                        placeholder="Enter ZIP code"
                                        className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-4 outline-none focus:ring-1 focus:ring-orange-600 font-medium"
                                    />
                                </div>
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer group pt-4">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={agreement}
                                        onChange={(e) => setAgreement(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${agreement ? 'bg-orange-600 border-orange-600' : 'bg-white border-neutral-300 group-hover:border-neutral-400'}`}>
                                        {agreement && <Check size={12} strokeWidth={4} className="text-white" />}
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-neutral-600 uppercase tracking-tighter">I have read and agree to the Terms and Conditions.</span>
                            </label>
                        </form>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="bg-neutral-50/50 p-8 lg:p-20">
                    <div className="max-w-xl mx-auto space-y-12">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">Review your cart</h2>

                        {/* Items List */}
                        <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                            {checkoutItems.map((item) => (
                                <div key={item.id} className="flex gap-6 items-center group">
                                    <div className="w-20 h-20 bg-white rounded-xl border border-neutral-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm p-2 group-hover:border-orange-200 transition-all">
                                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-black text-neutral-900 uppercase tracking-tight text-sm">{item.title}</h4>
                                        <p className="text-xs text-neutral-500 font-black uppercase tracking-widest">{item.quantity}x Units</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-black text-lg tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Financials Summary */}
                        <div className="space-y-5 pt-8 border-t-2 border-dashed border-neutral-200">
                            <div className="flex justify-between text-neutral-600 font-black uppercase tracking-tighter text-sm">
                                <span>Subtotal</span>
                                <span className="text-neutral-900 font-black">₹{subTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-neutral-600 font-black uppercase tracking-tighter text-sm">
                                <span>Discount (1%)</span>
                                <span className="text-orange-600 font-black">-₹{discountAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-neutral-600 font-black uppercase tracking-tighter text-sm">
                                <span>Shipping</span>
                                <span className="text-neutral-900 font-black">
                                    {shippingCost === 0 ? <span className="text-emerald-600">FREE SHIPPING</span> : `₹${shippingCost}`}
                                </span>
                            </div>
                            <div className="pt-8 border-t-2 border-black flex justify-between items-baseline">
                                <span className="text-2xl font-black uppercase tracking-tighter italic">Total</span>
                                <div className="text-right">
                                    <span className="text-4xl font-black tracking-tighter text-black">₹{finalTotal.toLocaleString()}</span>
                                    <p className="text-[10px] font-black text-neutral-500 tracking-widest uppercase">Inc. all taxes</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA and Security */}
                        <div className="space-y-8">
                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading || !agreement}
                                className="w-full bg-black hover:bg-neutral-800 disabled:opacity-50 text-white py-6 rounded-xl font-black text-xl uppercase tracking-[0.2em] transition-all shadow-2xl shadow-neutral-300 active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                {loading ? <LoaderIcon className="animate-spin" /> : "Pay Now"}
                            </button>

                            {/* Trust Badge */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-orange-600">
                                    <Lock size={18} strokeWidth={3} />
                                    <span className="font-black text-sm tracking-widest uppercase">Secure SSL Encrypted Checkout</span>
                                </div>
                                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider leading-relaxed max-w-sm">
                                    Your personal and financial data is encrypted and secure. We do not store your credit card information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;
