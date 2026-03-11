import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { XCircle, RefreshCcw, ShoppingBag, AlertTriangle, ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Failed = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user reached this page through checkout
    if (!location.state?.orderFailed) {
      navigate("/", { replace: true });
    }

    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [location, navigate]);

  return (
    <div className="h-[calc(100dvh-80px)] flex items-center justify-center bg-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-red-600/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-neutral-100 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none" />

      <div className="px-5 md:px-20 lg:px-32 relative z-10 w-full max-w-7xl mx-auto py-10 md:py-20 font-urbanist">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-6 md:space-y-10"
        >
          {/* Failed Icon */}
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-black rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-black/20"
            >
              <XCircle size={40} strokeWidth={1.5} className="sm:w-16 sm:h-16 md:w-20 md:h-20 text-red-500" />
            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-xl sm:rounded-2xl shadow-xl border-4 border-white flex items-center justify-center text-white z-20"
            >
              <AlertTriangle size={20} sm:size={24} fill="white" />
            </motion.div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="font-black uppercase text-[10px] md:text-[10px] tracking-[0.4em] text-neutral-500">Transaction Authorization Error</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9]">
              Payment <span className="text-red-600">Declined.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 font-medium max-w-lg mx-auto leading-relaxed md:pt-2">
              We encountered an issue while processing your transaction. No funds were captured from your account.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/checkout")}
              className="group w-full md:w-auto px-6 py-3.5 sm:px-10 sm:py-4 bg-neutral-100 text-black rounded-[2rem] font-black text-sm sm:text-base hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 border border-transparent hover:border-black shadow-xl shadow-neutral-200/20"
            >
              <RefreshCcw size={18} sm:size={20} />
              Try Again
              <ChevronRight size={16} sm:size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/"
              className="group w-full md:w-auto px-6 py-3.5 sm:px-10 sm:py-4 bg-black text-white rounded-[2rem] font-black text-sm sm:text-base hover:shadow-2xl hover:shadow-black/30 transition-all flex items-center justify-center gap-4 active:scale-95"
            >
              <ShoppingBag size={18} sm:size={20} />
              Continue Shopping
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} sm:size={20} />
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Failed;
