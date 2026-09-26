"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import AudioToggle from "@/components/AudioToggle";

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AboutIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
  </svg>
);

const WorkIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const ProjectIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ContactIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const navLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: AboutIcon },
  { href: "/work", label: "Work", icon: WorkIcon },
  { href: "/project", label: "Project", icon: ProjectIcon },
  { href: "/contact", label: "Contact", icon: ContactIcon },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Active pill position tracking (relative to capsule container)
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeHref, setActiveHref] = useState(router.pathname);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const isInitialRender = useRef(true);

  const updatePill = (targetHref: string = router.pathname) => {
    const activeIndex = navLinks.findIndex((link) => link.href === targetHref);
    if (activeIndex !== -1 && linkRefs.current[activeIndex] && containerRef.current) {
      const linkEl = linkRefs.current[activeIndex]!;
      setPillStyle({
        left: linkEl.offsetLeft,
        width: linkEl.offsetWidth,
        opacity: 1,
      });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  useEffect(() => {
    setActiveHref(router.pathname);
    updatePill(router.pathname);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => updatePill(router.pathname));
    }

    const timer = setTimeout(() => {
      isInitialRender.current = false;
    }, 100);

    const handleResize = () => updatePill(router.pathname);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [router.pathname]);

  const handleNavClick = (href: string, index: number) => {
    setActiveHref(href);
    if (index !== -1 && linkRefs.current[index] && containerRef.current) {
      const linkEl = linkRefs.current[index]!;
      setPillStyle({
        left: linkEl.offsetLeft,
        width: linkEl.offsetWidth,
        opacity: 1,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 w-full z-50 transition-[background-color,border-color,box-shadow] duration-300"
      style={{
        backgroundColor: isScrolled ? "var(--bg-page)" : "transparent",
        backdropFilter: isScrolled ? "none" : "none",
        WebkitBackdropFilter: isScrolled ? "none" : "none",
        boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.06)" : "none",
      }}
    >
      <div className="flex justify-between items-center px-6 md:px-12 lg:px-16 py-3 max-w-7xl mx-auto">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/"
              className="font-[Outfit] text-2xl font-bold tracking-tight inline-flex items-center"
              style={{ color: "var(--text-primary)" }}
            >
              Shabrina<span style={{ color: "var(--accent)" }}>.</span>
            </Link>
          </motion.div>
        </div>

        {/* Center: Capsule Box for Navigation Links + Cat Toggle */}
        <div
          ref={containerRef}
          className="hidden md:flex items-center gap-1 p-2 h-[44px] rounded-2xl border shadow-sm backdrop-blur-md relative"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          {/* Active Sliding Pill: Animates strictly along X axis inside container, never along Y */}
          {pillStyle.opacity > 0 && (
            <motion.div
              className="absolute left-0 top-2 bottom-2 rounded-xl shadow-sm pointer-events-none z-0"
              style={{ backgroundColor: "var(--accent)" }}
              initial={false}
              animate={{
                x: pillStyle.left,
                width: pillStyle.width,
                opacity: pillStyle.opacity,
              }}
              transition={
                isInitialRender.current
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 350, damping: 28 }
              }
            />
          )}

          {navLinks.map((link, index) => {
            const isActive = activeHref === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                ref={(el) => {
                  linkRefs.current[index] = el;
                }}
                href={link.href}
                onClick={() => handleNavClick(link.href, index)}
                className="group relative flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-colors duration-200 z-10"
                style={{
                  color: isActive ? "#FDF8F2" : "var(--text-secondary)",
                }}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span
                  className={`transition-colors duration-200 ${!isActive ? "group-hover:text-[var(--text-primary)]" : ""
                    }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}

          {/* Divider between Contact and Cat Toggle */}
          <div
            className="w-[1px] h-4 self-center mx-1"
            style={{ backgroundColor: "var(--border-color)" }}
          />

          {/* Cat Theme Toggle to the right of Contact */}
          <div className="pr-0.5">
            <ThemeToggle embedded />
          </div>
        </div>

        {/* Right: Audio Player Capsule */}
        <div className="flex-1 hidden md:flex justify-end items-center">
          <AudioToggle embedded />
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex md:hidden items-center gap-2">
          <AudioToggle />
          <ThemeToggle />
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg transition-colors duration-200"
            style={{ color: "var(--text-secondary)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pb-4 overflow-hidden"
            style={{
              backgroundColor: isScrolled ? "var(--bg-page)" : "var(--bg-nav)",
              borderTop: "1px solid var(--border-color)",
            }}
          >
            {navLinks.map((link, index) => {
              const isActive = router.pathname === link.href;
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * index }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 my-1 rounded-xl font-[Plus_Jakarta_Sans] text-sm font-semibold tracking-wider uppercase transition-colors"
                    style={{
                      backgroundColor: isActive ? "rgba(30, 86, 205, 0.15)" : "transparent",
                      color: isActive ? "var(--accent)" : "var(--text-secondary)",
                    }}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}