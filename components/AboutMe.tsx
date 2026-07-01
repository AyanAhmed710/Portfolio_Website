"use client";

import { motion } from "framer-motion";

const stats = [
    { value: "3.70", label: "CGPA / 4.0" },
    { value: "7mo", label: "Experience" },
    { value: "500+", label: "Seminar Students" },
    { value: "700+", label: "Event Attendees" },
];


export default function AboutMe() {
    return (
        <section className="relative py-32 px-4 md:px-12 border-t border-white/5">
            <div className="absolute inset-0 z-[1] bg-[#0a0a0a]" />
            <div className="relative z-[2] max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <p className="text-orange-500 font-mono text-xs tracking-[0.3em] uppercase mb-5">Get to know me</p>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">About Me</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 items-start mb-24">

                    {/* Left — Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Hi, I'm <span className="text-white font-semibold">Ayan Ahmed</span> — an aspiring AI Engineer
                            and BS Computer Science student at the <span className="text-white font-semibold">University of Engineering and Technology, Lahore</span>,
                            maintaining a CGPA of 3.70/4.0.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            I have 7 months of practical experience building machine learning and data-driven applications
                            using Python and Django. My focus lies in Generative AI, LLMs, and applying deep learning
                            architectures to solve real-world problems — from anti-proxy face detection systems to
                            AWS-deployed network security models.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Beyond code, I lead as Class Representative and Event Head in my department — having hosted
                            orientation events for 700+ students with the Vice Chancellor of UET as Chief Guest, and
                            conducted a Machine Learning seminar for 500+ students.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            I'm a proud <span className="text-orange-400 font-medium">Hohnaar Scholarship holder</span> — awarded by the Government of Pakistan.
                        </p>

                        <div className="pt-2">
                            <button
                                onClick={() => {
                                    const el = document.querySelector("#contact");
                                    if (el) el.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="px-6 py-3 rounded-xl border border-orange-500/40 text-orange-400 text-sm font-medium hover:bg-orange-500/10 hover:border-orange-500/70 transition-all duration-200"
                            >
                                Get in Touch →
                            </button>
                        </div>
                    </motion.div>

                    {/* Right — Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative p-6 rounded-2xl border border-white/8 bg-[#121212] overflow-hidden group hover:border-orange-500/30 transition-all duration-300"
                            >
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/50 transition-all duration-500" />
                                <p className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</p>
                                <p className="text-gray-500 text-sm font-mono">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Education */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-600 font-mono text-xs tracking-[0.3em] uppercase mb-8">Education</p>
                    <div className="p-6 rounded-2xl border border-white/8 bg-[#121212] hover:border-orange-500/20 transition-all duration-300 group">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-white font-semibold text-base mb-1">BS Computer Science</p>
                                <p className="text-orange-400/80 text-sm font-mono mb-4">
                                    University of Engineering and Technology, Lahore
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 text-xs font-mono rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400">
                                        3.70 / 4.0 GPA
                                    </span>
                                    <span className="px-3 py-1 text-xs font-mono rounded-full border border-white/8 bg-white/3 text-gray-400">
                                        Hohnaar Scholar
                                    </span>
                                    <span className="px-3 py-1 text-xs font-mono rounded-full border border-white/8 bg-white/3 text-gray-400">
                                        Class Representative
                                    </span>
                                </div>
                            </div>
                            <span className="text-gray-600 text-xs font-mono shrink-0 pt-1">2022 – 2026</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
