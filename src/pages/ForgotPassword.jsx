import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import authService from "../utils/authService";
import "react-toastify/dist/ReactToastify.css";
import { LoaderIcon, Mail, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    React.useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoader(true);
        try {
            const response = await authService.forgotPassword({
                email
            });

            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message || "Password reset link sent to your email!");
                // Supabase redirects back to the app via the link, 
                // so we don't necessarily need to go to verify-otp 
                // unless we configured Supabase to use OTP for reset.
                // Standard flow is to check email.
                navigate("/login");
            }
        } catch (error) {
            toast.error("Something went wrong! Please try again.");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="w-full h-[calc(100vh-68px)] lg:h-[calc(100vh-80px)] flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden font-outfit">
            {/* Radiant Backgrounds */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/10 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2"></div>

            <div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl m-4 animate-in fade-in zoom-in duration-500">
                {/* Left Side - Cinematic Branding */}
                <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-black via-zinc-900 to-neutral-800 p-12 flex-col justify-between relative overflow-hidden border-r border-white/5">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                    <div className="relative z-10">
                        <Link to="/" className="inline-block group">
                            <div className="flex items-center gap-2 text-white">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                                    <ShoppingBag size={22} className="text-black" />
                                </div>
                                <span className="text-2xl font-black tracking-tighter">KART EASY</span>
                            </div>
                        </Link>
                    </div>

                    <div className="relative z-10 mt-20 lg:mt-0">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                            Registry <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">Recovery</span>
                        </h2>
                        <p className="text-zinc-400 text-lg">
                            Initiate the security override to regain access to your elite procurement profile.
                        </p>
                    </div>

                    <div className="relative z-10 pt-10">
                        <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 uppercase tracking-[0.2em]">
                            <div className="w-12 h-[1px] bg-zinc-800"></div>
                            <span>Security Override v1.0</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Premium Form */}
                <div className="lg:w-7/12 p-8 lg:p-12 flex flex-col justify-center bg-transparent">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-10 text-left">
                            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Recover Key</h3>
                            <p className="text-zinc-500 text-sm">Input your registry email for authorization link.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="group space-y-2">
                                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest pl-1">Email Address</label>
                                <div className="relative transition-all duration-300">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-zinc-600 group-focus-within:text-white transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="nexus@identity.com"
                                        className="block w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-zinc-600 transition-all text-sm font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loader}
                                className="w-full relative group bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all active:scale-[0.98] overflow-hidden disabled:opacity-70 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                            >
                                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-45 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                                {loader ? (
                                    <LoaderIcon className="animate-spin h-5 w-5 mx-auto" />
                                ) : (
                                    <div className="flex items-center justify-center gap-3">
                                        Authorize Recovery <ArrowRight size={18} />
                                    </div>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-white/5 text-center">
                            <Link to="/login" className="inline-flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                                <ArrowLeft size={14} /> Back to Authorization
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
