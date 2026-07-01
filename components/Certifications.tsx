"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Cert = {
    id: number;
    name: string;
    issuer: string;
    year: string;
    imageUrl?: string;
    certificateUrl?: string;
    hasCertificate: boolean;
};

const certifications: Cert[] = [
    {
        id: 1,
        name: "Complete Data Science, Machine Learning, DL, NLP Bootcamp",
        issuer: "KrishNaik & Udemy",
        year: "2024",
        hasCertificate: true,
        certificateUrl: "https://www.udemy.com/certificate/UC-c223c757-101d-4b56-9d77-67422d432c95/",
    },
    {
        id: 2,
        name: "Generative AI with Large Language Models",
        issuer: "DeepLearning.AI & Coursera",
        year: "2024",
        hasCertificate: true,
        certificateUrl: "https://www.coursera.org/account/accomplishments/certificate/PBIHWQLPDLO7",
    },
    {
        id: 3,
        name: "LangChain Course",
        issuer: "CampusX (YouTube)",
        year: "2024",
        hasCertificate: false,
    },
    {
        id: 4,
        name: "MLOps Course",
        issuer: "Vikash Das (YouTube)",
        year: "2025",
        hasCertificate: false,
    },
    {
        id: 5,
        name: "Finalist — Google AI Seekho Hackathon",
        issuer: "Google Pakistan",
        year: "2026",
        hasCertificate: true,
        imageUrl: "/certificates/ai-seekho-2026.jpg",
    },
];

export default function Certifications() {
    const [selected, setSelected] = useState<Cert | null>(null);

    return (
        <section className="relative py-32 px-4 md:px-12 border-t border-white/5">
            <div className="absolute inset-0 bg-[#080808]" />
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
                        Verified Achievements
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                        Certifications
                    </h2>
                </motion.div>

                {/* Certificate Grid */}
                <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
                    {certifications.map((cert, index) => (
                        <motion.button
                            key={cert.id}
                            onClick={() => {
                                if (!cert.hasCertificate) return;
                                if (cert.certificateUrl) {
                                    window.open(cert.certificateUrl, "_blank", "noreferrer");
                                } else {
                                    setSelected(cert);
                                }
                            }}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4 }}
                            className={`text-left p-6 rounded-2xl border border-white/8 bg-[#101010] group relative overflow-hidden transition-all duration-300 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.08)] cursor-pointer w-full${certifications.length % 2 !== 0 && index === certifications.length - 1 ? " sm:col-span-2" : ""}`}
                        >
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/70 transition-all duration-500" />

                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/15 transition-colors duration-300">
                                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>

                            <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-orange-50 transition-colors duration-300">
                                {cert.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-4">{cert.issuer}</p>

                            <div className="flex items-center justify-between">
                                <span className="text-xs font-mono text-gray-600">{cert.year}</span>
                                {cert.hasCertificate && (
                                    <span className="text-xs text-orange-500/70 font-mono group-hover:text-orange-400 transition-colors duration-300 flex items-center gap-1">
                                        View Certificate
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                )}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0f0f0f] overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

                            <div className="aspect-[4/3] bg-white/3 border-b border-white/8 flex flex-col items-center justify-center">
                                {selected.imageUrl ? (
                                    <img src={selected.imageUrl} alt={selected.name} className="w-full h-full object-contain" />
                                ) : (
                                    <div className="text-center px-8">
                                        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 text-sm">Certificate available upon request.</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-bold text-base leading-snug">{selected.name}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{selected.issuer} · {selected.year}</p>
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 shrink-0 ml-4"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
