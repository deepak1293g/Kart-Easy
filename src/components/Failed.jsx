import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, RefreshCcw, ArrowRight, LifeBuoy } from "lucide-react";
import { motion } from "framer-motion";

const Failed = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -ml-24 -mt-24 animate-pulse"></div>

      <div className="px-12 md:px-20 lg:px-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center space-y-12"
        >
          {/* Failed Icon */}
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-32 h-32 bg-red-50 rounded-[2.5rem] flex items-center justify-center text-red-600 border border-red-100"
            >
              <AlertCircle size={64} strokeWidth={2} />
            </motion.div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight">
              Payment <span className="text-red-600">Declined.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
              We encountered an issue while processing your transaction. Your security is our priority, and no funds were captured.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center justify-center pt-4">
            <Link
              to="/checkout"
              className="group px-16 py-6 bg-black text-white rounded-[2rem] font-black text-xl hover:shadow-2xl hover:shadow-black/20 transition-all flex items-center justify-center gap-4 active:scale-95"
            >
              Try Again
              <RefreshCcw className="group-hover:rotate-180 transition-transform duration-700" size={24} />
            </Link>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Failed;
