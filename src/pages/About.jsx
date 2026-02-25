import React from "react";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    ShieldCheck,
    Target,
    Zap,
    Award,
    ArrowRight,
    Globe
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

const About = () => {
    const stats = [
        { label: "Active Retailers", value: "50k+", icon: <Users size={20} /> },
        { label: "Global Suppliers", value: "2k+", icon: <Globe size={20} /> },
        { label: "Product Catalog", value: "100k+", icon: <Zap size={20} /> },
        { label: "Quality Awards", value: "15+", icon: <Award size={20} /> },
    ];

    const values = [
        {
            title: "Precision Sourcing",
            desc: "We curate only the finest manufacturers, ensuring every asset meets elite standards.",
            icon: <Target className="text-orange-600" size={24} />
        },
        {
            title: "Growth Acceleration",
            desc: "Our platform is built to scale your business with speed and technological efficiency.",
            icon: <TrendingUp className="text-orange-600" size={24} />
        },
        {
            title: "Secure Enterprise",
            desc: "Advanced security protocols protect every transaction and data point in our ecosystem.",
            icon: <ShieldCheck className="text-orange-600" size={24} />
        }
    ];

    return (
        <div className="bg-white min-h-screen font-urbanist selection:bg-orange-600 selection:text-white pb-24 overflow-x-hidden">

            {/* Hero Section */}
            <div className="relative pt-20 pb-32 md:pt-32 md:pb-48 bg-black overflow-hidden">
                {/* Abstract Background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                            Order <span className="text-orange-600">Excellence</span>. <br />
                            Define <span className="outline-text text-transparent opacity-50 block md:inline" style={{ WebkitTextStroke: '1px white' }}>Retail</span>.
                        </h1>
                        <p className="mt-8 text-lg md:text-2xl text-neutral-400 font-medium max-w-2xl leading-relaxed">
                            Kart Easy is the premier B2B infrastructure for modern procurement. We bridge the gap between global craft and local commerce with absolute precision.
                        </p>
                    </motion.div>
                </div>

                {/* Floating scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 hidden md:block"
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent"></div>
                </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="max-w-[1400px] mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, idx) => (
                        <ScrollReveal key={idx} delay={idx * 0.1}>
                            <div className="bg-white border border-neutral-100 p-8 rounded-3xl shadow-2xl shadow-neutral-200/50 hover:border-orange-200 transition-colors group">
                                <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400 mb-6 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                    {stat.icon}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tighter">{stat.value}</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mt-2">{stat.label}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* Our Philosophy Section */}
            <div className="max-w-[1400px] mx-auto px-6 py-32 md:py-48 grid lg:grid-cols-2 gap-20 items-center">
                <ScrollReveal>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-orange-600">Established 2024</h2>
                            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[1] text-neutral-900">
                                Beyond Simple <br /> <span className="text-neutral-300">Procurement</span>
                            </h3>
                        </div>
                        <p className="text-lg text-neutral-500 font-medium leading-relaxed">
                            We didn't just build an e-commerce platform; we engineered a high-density logistics network. Kart Easy was born from the need for absolute transparency and radical efficiency in the B2B sector.
                        </p>
                        <div className="pt-4">
                            <button className="bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-neutral-800 transition-all active:scale-95 group">
                                Learn our methodology <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-orange-600/5 rounded-[40px] blur-2xl group-hover:bg-orange-600/10 transition-colors"></div>
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                            className="relative rounded-[32px] w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                            alt="Warehouse aesthetics"
                        />
                        <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                            <p className="text-sm font-black text-neutral-900 leading-tight">"Our goal is to make industrial-scale procurement as intuitive as a single tap."</p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Values Section */}
            <div className="bg-neutral-50 py-32 md:py-48">
                <div className="max-w-[1400px] mx-auto px-6">
                    <ScrollReveal className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                        <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-orange-600 italic">Core Protocol</h2>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-neutral-900">Value Infrastructure</h3>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <ScrollReveal key={idx} delay={idx * 0.15}>
                                <div className="bg-white p-10 rounded-[32px] h-full border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-500 flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 border border-orange-100 group-hover:scale-110 transition-transform duration-500">
                                        {value.icon}
                                    </div>
                                    <h4 className="text-xl font-black text-neutral-900 uppercase tracking-tight mb-4">{value.title}</h4>
                                    <p className="text-neutral-500 font-medium leading-relaxed">{value.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter/CTA */}
            <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-24">
                <ScrollReveal>
                    <div className="bg-black rounded-[32px] md:rounded-[48px] p-8 md:p-24 text-center space-y-8 md:space-y-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                        <div className="relative z-10 space-y-4 md:space-y-6">
                            <h3 className="text-3xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
                                Join the <br /> <span className="text-orange-600">Elite Network</span>.
                            </h3>
                            <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto font-medium">
                                Subscribe to our registry for exclusive access to market insights and priority procurement allocations.
                            </p>
                            <div className="max-w-md mx-auto pt-4 md:pt-6">
                                <form className="flex flex-col sm:flex-row bg-neutral-900 border border-neutral-800 p-2 rounded-2xl focus-within:border-orange-600 transition-colors gap-2">
                                    <input
                                        type="email"
                                        placeholder="Secure Email Address"
                                        className="bg-transparent border-none outline-none px-4 py-3 sm:py-0 flex-1 text-white font-medium text-sm"
                                    />
                                    <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-700 transition-colors whitespace-nowrap">
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default About;
