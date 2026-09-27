"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations";
import GridBackground from "@/components/GridBackground";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Shabrinashsf",
    icon: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shabrinasf/",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/shabrina.amalia_/",
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Collaboration Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:shabrinaamalia860@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 600);
  };

  return (
    <section
      className="flex-grow flex flex-col justify-center relative overflow-hidden min-h-[calc(100vh-64px-56px)] lg:h-[calc(100vh-64px-56px)] py-8 sm:py-12 lg:py-0"
      style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      <GridBackground />

      <div className="relative z-10 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full my-auto">
        <ScrollReveal>
          {/* Main 2-Column Card Frame */}
          <div
            className="rounded-3xl border p-6 sm:p-8 lg:p-8 xl:p-10 shadow-xl transition-all flex flex-col justify-center"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center">

              {/* Left Column: Narrative & Info */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Heading: Let's talk. */}
                <h1
                  className="font-[Outfit] text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3 lg:mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Let&apos;s{" "}
                  <motion.span
                    className="italic inline-block"
                    style={{ color: "var(--accent)" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    talk<span style={{ color: "var(--text-primary)" }}>.</span>
                  </motion.span>
                </h1>

                {/* Subtitle */}
                <p
                  className="font-[Plus_Jakarta_Sans] text-sm sm:text-base leading-relaxed mb-4 lg:mb-6 max-w-xl"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Want to chat or buy me a coffee? Just shoot me a message and I&apos;ll respond whenever I can.
                </p>

                {/* Location, Phone & Email */}
                <div
                  className="font-[Plus_Jakarta_Sans] space-y-2.5 sm:space-y-3 mb-5 lg:mb-7 text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {/* Row 1: Location & Phone */}
                  <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#1E56CD] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span style={{ color: "var(--text-primary)" }}>Surabaya, Indonesia</span>
                    </div>

                    <a
                      href="https://wa.me/6282352070334"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 transition-opacity hover:opacity-80"
                    >
                      <svg className="w-4 h-4 text-[#1E56CD] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="underline underline-offset-4" style={{ color: "var(--text-primary)" }}>+6282352070334</span>
                    </a>
                  </div>

                  {/* Row 2: Email (right below location & phone) */}
                  <div className="flex items-center pt-0.5">
                    <a
                      href="mailto:shabrinaamalia860@gmail.com"
                      className="flex items-center gap-2 transition-opacity hover:opacity-80"
                    >
                      <svg className="w-4 h-4 text-[#1E56CD] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className="underline underline-offset-4" style={{ color: "var(--text-primary)" }}>shabrinaamalia860@gmail.com</span>
                    </a>
                  </div>
                </div>

                {/* Social Buttons: 1 row when wide, 2 1 centered when wrapped, 3 rows centered on narrow */}
                <div
                  className="pt-4 lg:pt-6 border-t flex flex-wrap justify-center lg:justify-start items-center gap-2.5 sm:gap-3.5"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tactile-btn flex items-center justify-center gap-2.5 px-4 sm:px-5.5 py-2.5 sm:py-3 rounded-xl cursor-pointer"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {link.icon}
                      </svg>
                      <span className="font-[Plus_Jakarta_Sans] text-xs sm:text-sm font-semibold tracking-wide">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Column: Clean Action Form Card */}
              <div className="lg:col-span-5 h-full flex flex-col justify-center">
                <div className="p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl text-white shadow-xl bg-gradient-to-br from-[#1E56CD] to-[#1544a8] border border-blue-400/30">
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                    {/* Field 1: Your Name (Wajib) */}
                    <div>
                      <label className="block text-xs font-[JetBrains_Mono] font-semibold text-blue-100 mb-1">
                        Your Name <span className="font-bold text-rose-300" style={{ color: "#ff6b6b" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Name"
                        className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm bg-white/15 border border-white/25 text-white placeholder-blue-100/60 focus:outline-none focus:bg-white/25 focus:border-white transition-all font-[Plus_Jakarta_Sans]"
                      />
                    </div>

                    {/* Field 2: Your Email (Wajib) */}
                    <div>
                      <label className="block text-xs font-[JetBrains_Mono] font-semibold text-blue-100 mb-1">
                        Your Email <span className="font-bold text-rose-300" style={{ color: "#ff6b6b" }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                        className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm bg-white/15 border border-white/25 text-white placeholder-blue-100/60 focus:outline-none focus:bg-white/25 focus:border-white transition-all font-[Plus_Jakarta_Sans]"
                      />
                    </div>

                    {/* Field 3: Message (Wajib) */}
                    <div>
                      <label className="block text-xs font-[JetBrains_Mono] font-semibold text-blue-100 mb-1">
                        Message <span className="font-bold text-rose-300" style={{ color: "#ff6b6b" }}>*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project or inquiry..."
                        className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm bg-white/15 border border-white/25 text-white placeholder-blue-100/60 focus:outline-none focus:bg-white/25 focus:border-white transition-all resize-none font-[Plus_Jakarta_Sans]"
                      />
                    </div>

                    {/* Submit Button: Let's collaborate (Tactile 3D press) */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="tactile-btn w-full mt-2 py-3 sm:py-3.5 px-5 rounded-xl font-[JetBrains_Mono] text-xs sm:text-sm font-bold uppercase tracking-wider bg-white text-[#1E56CD] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? "Sending..." : "Let's collaborate"}
                    </button>

                    {submitStatus === "success" && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-[Plus_Jakarta_Sans] text-blue-100 text-center mt-1.5"
                      >
                        Thank you! Your message has been sent.
                      </motion.p>
                    )}
                  </form>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

