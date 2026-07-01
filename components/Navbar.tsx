"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Certifications", href: "#certifications" },
    { label: "Projects", href: "#projects" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNav = (href: string) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.header
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? "bg-black/75 backdrop-blur-xl border-b border-white/6"
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-5 md:px-12 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="text-white font-bold text-lg tracking-tight hover:text-orange-400 transition-colors duration-200"
                    >
                        Ayan Ahmed
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNav(link.href)}
                                className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* Contact Button */}
                    <div className="hidden md:block">
                        <button
                            onClick={() => handleNav("#contact")}
                            className="px-5 py-2 rounded-xl border border-orange-500/40 text-orange-400 text-sm font-medium hover:bg-orange-500/10 hover:border-orange-500/70 transition-all duration-200"
                        >
                            Contact Me
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <motion.span
                            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="block w-5 h-px bg-white origin-center transition-all"
                        />
                        <motion.span
                            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block w-5 h-px bg-white"
                        />
                        <motion.span
                            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="block w-5 h-px bg-white origin-center transition-all"
                        />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/8 md:hidden"
                    >
                        <div className="px-5 py-6 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNav(link.href)}
                                    className="text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium transition-all duration-200"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => handleNav("#contact")}
                                className="mt-2 px-4 py-3 rounded-xl border border-orange-500/40 text-orange-400 text-sm font-medium hover:bg-orange-500/10 transition-all duration-200 text-left"
                            >
                                Contact Me
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
