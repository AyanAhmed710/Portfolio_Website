"use client";

import { motion } from "framer-motion";

const socials = [
    {
        label: "Email",
        value: "sheikhayanahmad710@gmail.com",
        href: "mailto:sheikhayanahmad710@gmail.com",
    },
    {
        label: "LinkedIn",
        value: "ayanahmad-81067a27b",
        href: "https://www.linkedin.com/in/ayanahmad-81067a27b/",
    },
    {
        label: "GitHub",
        value: "AyanAhmed710",
        href: "https://github.com/AyanAhmed710",
    },
    {
        label: "Phone",
        value: "+92 332-4214692",
        href: "tel:+923324214692",
    },
];

const SocialIcon = ({ label }: { label: string }) => {
    if (label === "Email") return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
    if (label === "LinkedIn") return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
    if (label === "GitHub") return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    );
};

export default function Contact() {
    return (
        <section className="relative py-32 px-4 md:px-12 border-t border-white/5">
            <div className="absolute inset-0 bg-[#080808]" />
            <div className="relative z-[2] max-w-4xl mx-auto text-center">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p className="text-orange-500 font-mono text-xs tracking-[0.3em] uppercase mb-5">Let's Connect</p>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">Contact Me</h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                        Whether it's a collaboration, an internship opportunity, or just a hello —
                        my inbox is always open.
                    </p>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    {socials.map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            target={social.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="group flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/8 bg-[#101010] hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300 w-full sm:w-auto"
                        >
                            <span className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20 transition-colors duration-300 shrink-0">
                                <SocialIcon label={social.label} />
                            </span>
                            <div className="text-left">
                                <p className="text-xs text-gray-500 font-mono">{social.label}</p>
                                <p className="text-white text-sm font-medium group-hover:text-orange-100 transition-colors duration-300">
                                    {social.value}
                                </p>
                            </div>
                        </a>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <a
                        href="mailto:sheikhayanahmad710@gmail.com"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-orange-500 text-black font-semibold text-sm hover:bg-orange-400 transition-all duration-200 shadow-[0_0_40px_rgba(249,115,22,0.25)] hover:shadow-[0_0_60px_rgba(249,115,22,0.4)]"
                    >
                        Send me an Email
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
