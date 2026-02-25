import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import { toast } from "react-toastify";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Encrypted message transmitted to Nexus Core.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="bg-white min-h-screen font-urbanist selection:bg-orange-600 selection:text-white pb-24 overflow-x-hidden">

            {/* Hero Section */}
            <div className="relative pt-20 pb-32 md:pt-32 md:pb-48 bg-black overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-600 mb-6 italic">Secure Protocol</h2>
                        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                            Establish <br /> <span className="text-orange-600">Connection</span>.
                        </h1>
                        <p className="mt-8 text-lg md:text-xl text-neutral-400 font-medium max-w-xl mx-auto leading-relaxed">
                            Initiate a direct link to our Nexus Support Core. Our agents are standing by for priority assistance on your elite requirements.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 -mt-16 lg:-mt-24 relative z-20">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-0 bg-white rounded-[40px] shadow-2xl border border-neutral-100 overflow-hidden">

                    {/* Info Hub */}
                    <div className="lg:col-span-5 bg-neutral-900 p-8 md:p-16 text-white space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black tracking-tighter uppercase italic">Info Hub</h3>
                            <p className="text-neutral-500 text-sm font-medium">Access our global node locations and direct priority lines.</p>
                        </div>

                        <div className="space-y-10">
                            {[
                                { icon: Mail, label: "Neural Link", value: "support@karteasy.com" },
                                { icon: Phone, label: "Priority Voice", value: "+1 (555) 000-NEXUS" },
                                { icon: MapPin, label: "Geographical Node", value: "123 Procurement St, Elite Tower, NY" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-500">
                                        <item.icon size={22} className="text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-600">{item.label}</p>
                                        <p className="text-base font-bold tracking-tight">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-white/5 flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <p className="text-[10px] font-black text-neutral-600 tracking-widest uppercase">Nexus Operations: ACTIVE</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-7 p-8 md:p-16 bg-white">
                        <div className="max-w-xl mx-auto space-y-10">
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase italic">Send Payload</h3>
                                <p className="text-neutral-400 text-sm font-medium">Transmit your query to our central registry.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">Identity</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:bg-white focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all font-bold text-sm"
                                            placeholder="Full Name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">Neural Mail</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:bg-white focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all font-bold text-sm"
                                            placeholder="secure@node.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">Message Payload</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 focus:bg-white focus:border-orange-600 focus:ring-1 focus:ring-orange-600 outline-none transition-all font-bold text-sm resize-none"
                                        placeholder="Explicitly state your requirements..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-200 active:scale-[0.98] flex items-center justify-center gap-4 group"
                                >
                                    Send
                                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>

                            <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-neutral-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400">
                                        <Clock size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Response Avg</p>
                                        <p className="text-xs font-black text-neutral-900 tracking-tight italic">UNDER 120 MINUTES</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400">
                                        <MessageCircle size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Support Mode</p>
                                        <p className="text-xs font-black text-neutral-900 tracking-tight italic">LIVE NEURAL NODE</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Aesthetic FAQ/Hint */}
            <div className="max-w-[1400px] mx-auto px-6 py-32 grid md:grid-cols-3 gap-12">
                {[
                    { title: "Priority Queue", desc: "Enterprise partners receive automated placement in our priority response queue." },
                    { title: "Encrypted Comms", desc: "Every transmission through this node is secured with grade-A encryption." },
                    { title: "Global Reach", desc: "Our nexus core manages queries from over 50 global procurement zones." }
                ].map((item, idx) => (
                    <ScrollReveal key={idx} delay={idx * 0.1}>
                        <div className="space-y-4">
                            <h4 className="font-black text-neutral-900 uppercase tracking-tight flex items-center gap-3">
                                <div className="w-6 h-[2px] bg-orange-600"></div> {item.title}
                            </h4>
                            <p className="text-sm text-neutral-500 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    );
};
export default Contact;
