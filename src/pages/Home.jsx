import React, { useEffect, useState } from "react";
import CategoryWiseProduct from "@/components/CategoryWiseProduct";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Zap,
  ShieldCheck,
  Truck,
  MoveRight,
  Star
} from "lucide-react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderData = [
    {
      id: 1,
      title: "Premium Sound Elite Series",
      subtitle: "JBL SIGNATURE AUDIO",
      offer: "30% OFF",
      description: "Immerse yourself in pure bass and unmatched clarity. Engineered for the music obsession in you.",
      buttonText: "Shop Audio",
      imgSrc: "/header_headphone_image.png",
      color: "from-blue-600/20 to-indigo-600/20",
      textColor: "text-blue-900",
      btnColor: "bg-blue-600"
    },
    {
      id: 2,
      title: "Next-Gen Gaming Unleashed",
      subtitle: "PLAYSTATION 5 ELITE",
      offer: "NEW ARRIVAL",
      description: "Experience lightning-fast loading and breathtaking 4K graphics. The future of play is here.",
      buttonText: "Play Now",
      imgSrc: "/header_playstation_image.png",
      color: "from-orange-600/20 to-red-600/20",
      textColor: "text-orange-900",
      btnColor: "bg-orange-600"
    },
    {
      id: 3,
      title: "Power Without Compromise",
      subtitle: "MACBOOK PRO M3 MAX",
      offer: "PRO PERFORMANCE",
      description: "Built for creators, dreamers, and doers. The most powerful chip ever in a personal computer.",
      buttonText: "Explore Mac",
      imgSrc: "/header_macbook_image.png",
      color: "from-emerald-600/20 to-teal-600/20",
      textColor: "text-emerald-900",
      btnColor: "bg-emerald-600"
    },
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[600px] md:h-[700px] lg:h-[800px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={`absolute inset-0 bg-gradient-to-br ${sliderData[currentSlide].color} flex items-center`}
          >
            <div className={`px-6 md:px-20 lg:px-32 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full py-16 lg:py-0`}>
              {/* Content */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="z-10 text-center lg:text-left space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <div className="h-[2px] w-8 bg-gray-900"></div>
                    <span className="text-gray-900 font-black tracking-[0.2em] text-xs uppercase">
                      {sliderData[currentSlide].subtitle}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] text-gray-900 tracking-tighter">
                    {sliderData[currentSlide].title.split(' ').map((word, i) => (
                      <span key={i} className={i === 1 ? sliderData[currentSlide].textColor : ""}>
                        {word}{' '}
                      </span>
                    ))}
                  </h1>
                </div>
                <p className="text-lg md:text-2xl text-gray-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed italic">
                  "{sliderData[currentSlide].description}"
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                  <button className={`px-12 py-5 ${sliderData[currentSlide].btnColor} text-white rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-gray-900/20 transition-all flex items-center gap-3 group active:scale-95`}>
                    {sliderData[currentSlide].buttonText}
                    <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-3xl font-black text-gray-900">{sliderData[currentSlide].offer}</span>
                    <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Limited Time Deal</span>
                  </div>
                </div>
              </motion.div>

              {/* Image Section */}
              <motion.div
                initial={{ x: 100, opacity: 0, rotate: 10 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative hidden lg:flex justify-end items-center"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <img
                  src={sliderData[currentSlide].imgSrc}
                  alt={sliderData[currentSlide].title}
                  className="max-h-[600px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation */}
        <div className="absolute bottom-6 md:bottom-12 inset-x-0 z-20">
          <div className="px-12 md:px-20 lg:px-32 flex items-center justify-center lg:justify-start">
            <div className="flex gap-3">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${currentSlide === index ? "w-16 bg-gray-900" : "w-4 bg-gray-900/10 hover:bg-gray-900/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Trust Bar */}
      <div className="relative z-20 -mt-10 mb-20">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] p-8 md:p-14 border border-gray-100 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-[2rem] bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                <Truck className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-gray-900 uppercase text-sm tracking-widest">Global Shipping</h4>
                <p className="text-xs font-bold text-gray-400">Carbon-neutral delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-[2rem] bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-gray-900 uppercase text-sm tracking-widest">Secure Flow</h4>
                <p className="text-xs font-bold text-gray-400">100% Encrypted transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-[2rem] bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                <Zap className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-gray-900 uppercase text-sm tracking-widest">Priority Support</h4>
                <p className="text-xs font-bold text-gray-400">24/7 Concierge access</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-[2rem] bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-gray-900 uppercase text-sm tracking-widest">Luxury Returns</h4>
                <p className="text-xs font-bold text-gray-400">Painless 60-day window</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-6 lg:px-8 py-12">
        {/* Intro Heading Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full mb-4">
            <Star size={14} className="text-orange-600 fill-orange-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Established 2024 • Excellence in Quality</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight">
            Redefining the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Wholesale Experience.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Precision sourced. Globally delivered. We provide the essential infrastructure for your retail success.
          </p>
        </div>



        {/* Premium Collections Section */}
        <div className="relative -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-16 bg-gray-50/50">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          <div className="space-y-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-[2px] bg-orange-600"></div>
                  <span className="font-black uppercase text-xs tracking-[0.4em] text-orange-600">Curated Selection</span>
                </div>
                <h3 className="text-3xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
                  Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Collections.</span>
                </h3>
                <p className="text-lg text-gray-500 font-medium max-w-xl">
                  Discover our hand-picked series of premium products designed to elevate your lifestyle and business excellence.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Trusted by 10k+ <br /> Retailers
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <CategoryWiseProduct />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
