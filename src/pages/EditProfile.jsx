import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../store/userSlice";
import authService from "../utils/authService";
import { User, Mail, LoaderIcon, Save, ShieldCheck, ShoppingBag, ArrowLeft, Lock, Eye, EyeClosed, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EditProfile = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("identity");
    const formRef = useRef(null);

    const tabs = [
        { id: "identity", label: "Identity", icon: User },
        { id: "security", label: "Security", icon: ShieldCheck },
    ];

    useEffect(() => {
        if (window.location.hash === '#security' || location.hash === '#security') {
            setActiveTab("security");
        }
    }, [location]);


    const [data, setData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const [loading, setLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordData, setPasswordData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authService.updateProfile(data);
            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                dispatch(updateUser(response.data.data));
                toast.success("Identity updated successfully!");
                // navigate("/");
            }
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.password !== passwordData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setPasswordLoading(true);
        try {
            const response = await authService.resetPassword({
                email: user?.email,
                newPassword: passwordData.password
            });

            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message || "Password updated successfully!");
                setPasswordData({ password: "", confirmPassword: "" });
            }
        } catch (error) {
            toast.error("Failed to update password.");
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-[calc(100vh-80px)] font-urbanist text-neutral-900 pb-12 md:pb-20 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-16">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-neutral-100 pb-10">
                    <div className="space-y-4">
                        <div className="space-y-1 md:space-y-2">
                            <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-black">
                                Your <span className="text-orange-600">Profile</span>
                            </h1>
                            <p className="text-[9px] md:text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                Manage your premium shopping identity
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
                    {/* Sidebar: Profile Summary */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm relative overflow-hidden">
                                <div className="flex flex-col items-center gap-8">
                                    {/* Avatar */}
                                    <div className="relative group">
                                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100 flex items-center justify-center p-1">
                                            {user?.profilePic ? (
                                                <img src={user.profilePic} className="w-full h-full object-cover rounded-xl" alt="profile" />
                                            ) : (
                                                <User size={60} className="text-neutral-400" strokeWidth={1} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-center space-y-1">
                                        <h3 className="text-2xl font-black text-neutral-900 tracking-tight">{user?.name}</h3>
                                        <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Verified Account</p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="w-full pt-8 border-t border-neutral-50 grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-xl font-black text-neutral-900">
                                                {(() => {
                                                    const ordersKey = `orders_${user?.email}`;
                                                    const orders = JSON.parse(localStorage.getItem(ordersKey)) || [];
                                                    return orders.length;
                                                })()}
                                            </p>
                                            <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Orders</p>
                                        </div>
                                        <div className="text-center border-l border-neutral-50">
                                            <p className="text-xl font-black text-neutral-900">Elite</p>
                                            <p className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Rank</p>
                                        </div>
                                    </div>

                                    {/* Navigation Tabs (Mobile optimized) */}
                                    <div className="w-full flex flex-col gap-2">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex items-center justify-between p-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                                    ? 'bg-neutral-900 text-white shadow-lg shadow-black/10'
                                                    : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-black'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <tab.icon size={16} />
                                                    {tab.label}
                                                </div>
                                                <ArrowRight size={14} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => navigate("/my-orders")}
                                        className="w-full flex items-center gap-3 p-4 rounded-xl bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-black text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        <ShoppingBag size={16} />
                                        Order History
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Forms */}
                    <div className="lg:col-span-9" ref={formRef}>
                        <div className="bg-white rounded-3xl p-6 md:p-12 border border-neutral-100 shadow-xl shadow-neutral-100/50">
                            <AnimatePresence mode="wait">
                                {activeTab === "identity" && (
                                    <motion.div
                                        key="identity-tab"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-10"
                                    >
                                        <div className="space-y-1">
                                            <h2 className="text-xl md:text-2xl font-black text-neutral-900 tracking-tight uppercase italic">Personal Identity</h2>
                                            <p className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest">Update your workspace credentials</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Full Name</label>
                                                    <div className="relative">
                                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={data.name}
                                                            onChange={handleChange}
                                                            placeholder="Your Name"
                                                            className="w-full pl-16 pr-6 py-5 bg-neutral-50/50 border border-neutral-50 rounded-2xl focus:bg-white focus:border-black transition-all outline-none font-bold text-neutral-900 shadow-sm"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-3 opacity-60">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Email Address</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={data.email}
                                                            className="w-full pl-16 pr-6 py-5 bg-neutral-100 border-neutral-100 rounded-2xl cursor-not-allowed outline-none font-bold text-neutral-900"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-10 border-t border-neutral-50 flex items-center justify-between gap-6">
                                                <div className="hidden md:flex items-center gap-4 text-neutral-500">
                                                    <ShieldCheck size={20} />
                                                    <p className="text-[9px] font-black uppercase tracking-widest max-w-[100px]">Secure Identity Protocol Active</p>
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full md:w-auto px-12 py-4 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                                                >
                                                    {loading ? <LoaderIcon className="animate-spin" size={18} /> : (
                                                        <>Commit Changes <Save size={16} /></>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}

                                {activeTab === "security" && (
                                    <motion.div
                                        key="security-tab"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-10"
                                    >
                                        <div className="space-y-1">
                                            <h2 className="text-xl md:text-2xl font-black text-neutral-900 tracking-tight uppercase italic">Security Protocol</h2>
                                            <p className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest">Reset your access sequence</p>
                                        </div>

                                        <form onSubmit={handlePasswordSubmit} className="space-y-10">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">New PIN</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            name="password"
                                                            value={passwordData.password}
                                                            onChange={handlePasswordChange}
                                                            placeholder="Secret Key"
                                                            className="w-full pl-16 pr-14 py-5 bg-neutral-50/50 border border-neutral-50 rounded-2xl focus:bg-white focus:border-black transition-all outline-none font-bold text-neutral-900 shadow-sm"
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                                                        >
                                                            {showPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 ml-1">Confirm PIN</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                                        <input
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            name="confirmPassword"
                                                            value={passwordData.confirmPassword}
                                                            onChange={handlePasswordChange}
                                                            placeholder="Repeat Secret"
                                                            className="w-full pl-16 pr-14 py-5 bg-neutral-50/50 border border-neutral-50 rounded-2xl focus:bg-white focus:border-black transition-all outline-none font-bold text-neutral-900 shadow-sm"
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                                                        >
                                                            {showConfirmPassword ? <EyeClosed size={16} /> : <Eye size={16} />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-10 border-t border-neutral-50 flex items-center justify-between gap-6">
                                                <div className="hidden md:flex items-center gap-4 text-neutral-500">
                                                    <Lock size={20} />
                                                    <p className="text-[9px] font-black uppercase tracking-widest max-w-[100px]">End-to-End Encryption Active</p>
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={passwordLoading}
                                                    className="w-full md:w-auto px-12 py-4 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                                                >
                                                    {passwordLoading ? <LoaderIcon className="animate-spin" size={18} /> : (
                                                        <>Update PIN <ArrowRight size={16} /></>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

