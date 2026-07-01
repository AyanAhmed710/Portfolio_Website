"use client";

import { motion } from "framer-motion";

const roles = [
    {
        title: "Class Representative",
        department: "Senior Batch — BS Computer Science",
        period: "Oct 2024 – Present",
        description:
            "Elected CR for the senior batch at UET Lahore. Bridge between students and faculty, representing class interests, resolving academic concerns, and coordinating departmental activities. Built the AI Face Detection System specifically to eliminate proxy attendance.",
        accent: "orange",
        tag: "Academic Leadership",
    },
    {
        title: "Lead of Event Management",
        department: "Data Science Department · UET",
        period: "Sep 2025 – Present",
        description:
            "Leading all event operations for the Data Science department. Successfully hosted orientation programmes for the 2024 and 2025 batches, and conducted the Welcome Party with 700+ attendees and the Vice Chancellor of UET as Chief Guest.",
        accent: "blue",
        tag: "Event Management",
    },
];

const awards = [
    {
        title: "Hohnaar Scholarship",
        org: "Government of Pakistan",
        period: "2024 – Present",
    },
    {
        title: "ML Seminar Speaker",
        org: "Conducted for 500+ Students",
        period: "Dec 2025",
    },
    {
        title: "Welcome Party Sr. Lead",
        org: "700+ Attendees · Chief Guest: VC of UET",
        period: "Sep – Nov 2024",
    },
    {
        title: "Orientation Host",
        org: "2024 & 2025 Batches · Data Science Dept.",
        period: "2024 & 2025",
    },
    {
        title: "Finalist — AI Seekho Hackathon",
        org: "Competitive AI Challenge",
        period: "2025",
    },
    {
        title: "Best Project Award",
        org: "Semester 2, 3 & 4 — UET Lahore",
        period: "2024 – 2025",
    },
];

export default function Leadership() {
    return (
        <section className="relative py-32 px-4 md:px-12 border-t border-white/5">
            <div className="absolute inset-0 bg-[#0a0a0a]" />
            <div className="relative z-[2] max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="text-orange-500 font-mono text-xs tracking-[0.3em] uppercase mb-5">
                        University of Engineering and Technology, Lahore
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                        Leadership & Roles
                    </h2>
                </motion.div>

                {/* Role Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-24">
                    {roles.map((role, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className={`relative p-8 rounded-2xl border overflow-hidden group transition-all duration-500 cursor-default
                                ${role.accent === "orange"
                                    ? "border-orange-500/20 hover:border-orange-500/50"
                                    : "border-blue-500/20 hover:border-blue-500/50"
                                }`}
                            style={{ background: "#121212" }}
                        >
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                ${role.accent === "orange"
                                    ? "bg-gradient-to-br from-orange-500/8 via-transparent to-transparent"
                                    : "bg-gradient-to-br from-blue-500/8 via-transparent to-transparent"
                                }`}
                            />
                            <div className={`absolute top-0 left-0 right-0 h-px
                                ${role.accent === "orange"
                                    ? "bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"
                                    : "bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
                                }`}
                            />
                            <div className="relative z-10">
                                <span className={`inline-block text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full mb-6 border
                                    ${role.accent === "orange"
                                        ? "text-orange-400 border-orange-500/30 bg-orange-500/5"
                                        : "text-blue-400 border-blue-500/30 bg-blue-500/5"
                                    }`}>
                                    {role.tag}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{role.title}</h3>
                                <p className={`text-sm font-mono mb-1 ${role.accent === "orange" ? "text-orange-400/80" : "text-blue-400/80"}`}>
                                    {role.department}
                                </p>
                                <p className="text-gray-600 text-xs font-mono mb-6">{role.period}</p>
                                <p className="text-gray-300 leading-relaxed text-sm">{role.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Awards & Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <p className="text-gray-600 font-mono text-xs tracking-[0.3em] uppercase mb-8 text-center">
                        Awards & Achievements
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {awards.map((award, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="p-5 rounded-2xl border border-white/8 bg-[#121212] hover:border-orange-500/30 transition-all duration-300 group"
                            >
                                <span className="text-xs font-mono text-orange-500/60 tracking-widest mb-3 block group-hover:text-orange-500 transition-colors duration-300">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-orange-100 transition-colors duration-300">{award.title}</h4>
                                <p className="text-gray-500 text-xs mb-2">{award.org}</p>
                                <p className="text-gray-600 text-xs font-mono">{award.period}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Moments Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-600 font-mono text-xs tracking-[0.3em] uppercase mb-8 text-center">
                        Moments
                    </p>

                    <div className="flex flex-col gap-4">

                        {/* Top — Welcome Party full width, natural height */}
                        <div className="relative group overflow-hidden rounded-2xl border border-white/10">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                            <img
                                src="/Special.JPG"
                                alt="Welcome Party with Vice Chancellor of UET"
                                className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                                <p className="text-white text-sm font-semibold">Welcome Party 2024</p>
                                <p className="text-gray-300 text-xs font-mono mt-0.5">With Vice Chancellor · 700+ Attendees</p>
                            </div>
                        </div>

                        {/* Bottom row — Seminar + Open Day side by side */}
                        <div className="grid grid-cols-2 gap-4">

                            <div className="relative group overflow-hidden rounded-2xl border border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                <img
                                    src="/seminar.jpeg"
                                    alt="ML Seminar for 500+ students"
                                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                                    <p className="text-white text-sm font-semibold">ML Seminar</p>
                                    <p className="text-gray-300 text-xs font-mono mt-0.5">500+ Students · Dec 2025</p>
                                </div>
                            </div>

                            <div className="relative group overflow-hidden rounded-2xl border border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                <img
                                    src="/projects-open-day.jpeg"
                                    alt="Projects Open Day"
                                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                                    <p className="text-white text-sm font-semibold">Projects Open Day</p>
                                    <p className="text-gray-300 text-xs font-mono mt-0.5">UET · Data Science Dept.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
