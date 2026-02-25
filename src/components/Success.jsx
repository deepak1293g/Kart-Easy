import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ShoppingBag, ArrowRight, Star, Package, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fire confetti on successful landing
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ea580c", "#000000", "#f97316"]
    });

    // Lock body scroll to prevent extra scrollbars
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="h-[calc(100dvh-80px)] flex items-center justify-center bg-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-orange-600/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-neutral-100 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none" />

      <div className="px-5 md:px-20 lg:px-32 relative z-10 w-full max-w-7xl mx-auto py-10 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 border border-white/50 shadow-2xl shadow-neutral-200/50 text-center space-y-10 md:space-y-12"
        >
          {/* Success Icon */}
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="w-32 h-32 md:w-40 md:h-40 bg-black rounded-[3rem] flex items-center justify-center text-white shadow-2xl shadow-black/20"
            >
              <CheckCircle2 size={72} strokeWidth={1.5} className="md:w-24 md:h-24" />
            </motion.div>
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-16 h-16 bg-orange-600 rounded-3xl shadow-xl border-4 border-white flex items-center justify-center text-white z-20"
            >
              <Star size={32} fill="white" />
            </motion.div>
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
              <span className="font-black uppercase text-[10px] md:text-xs tracking-[0.5em] text-neutral-500">Transaction Executed Successfully</span>
            </div>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9]">
              Order <span className="text-orange-600">Confirmed.</span>
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-neutral-600 font-medium max-w-xl mx-auto leading-relaxed md:pt-4">
              Your order has been successfully placed and is now being processed for priority dispatch.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
            <button
              onClick={() => navigate("/my-orders")}
              className="group w-full md:w-auto px-12 py-5 bg-neutral-100 text-black rounded-[2rem] font-black text-lg hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 border border-transparent hover:border-black shadow-xl shadow-neutral-200/20"
            >
              <Package size={22} />
              View Orders
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/"
              className="group w-full md:w-auto px-12 py-5 bg-black text-white rounded-[2rem] font-black text-lg hover:shadow-2xl hover:shadow-black/30 transition-all flex items-center justify-center gap-4 active:scale-95"
            >
              <ShoppingBag size={22} />
              Continue Shopping
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={22} />
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Success;
