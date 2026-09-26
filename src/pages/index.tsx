import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  StaggerContainer,
  StaggerItem,
  Floating,
} from "@/components/animations";
import GridBackground from "@/components/GridBackground";
import ArcanaSection from "@/components/ArcanaSection";

const techStack = ["Go", "Gin", "PHP", "Laravel", "NextJS", "TypeScript", "Tailwind CSS"];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Shabrina - Portfolio</title>
        <meta
          name="description"
          content="Shabrina Amalia Safaana - Backend Developer Portfolio"
        />
      </Head>

      <div
        className="flex-grow flex flex-col relative"
        style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
      >
        <GridBackground />
        <div className="flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto w-full relative z-10 py-8 lg:py-0 min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]">
          <section className="w-full my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Side: Typography and Bio */}
              <motion.div
                className="lg:col-span-7 flex flex-col items-start"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >

                {/* Title */}
                <motion.h1
                  variants={itemVariants}
                  className="font-[Outfit] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 leading-tight pt-6 md:pt-8"
                  style={{ color: "var(--text-primary)" }}
                >
                  Hi, I&apos;m{" "}
                  <br className="block md:hidden" />
                  <motion.span
                    className="italic inline-block"
                    style={{ color: "var(--accent)" }}
                    initial={{ opacity: 0, x: -30, rotate: -2 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ duration: 1.0, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Shabrina<span style={{ color: "var(--text-primary)" }}>.</span>
                  </motion.span>
                </motion.h1>

                {/* Bio */}
                <motion.div variants={itemVariants} className="mb-8 lg:mb-4 space-y-3">
                  <p className="font-[Plus_Jakarta_Sans] text-base md:text-lg max-w-xl leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    I&apos;m a T-shaped{" "}
                    <span className="font-medium" style={{ color: "var(--accent)" }}>
                      Backend Developer
                    </span>{" "}
                    navigating the beautiful chaos of Frontend
                    engineering and DevOps, while going down the rabbit hole of
                    {" "}
                    <span className="font-medium" style={{ color: "var(--accent)" }}>
                      Software Architecture
                    </span>{" "}
                    and
                    {" "}
                    <span className="font-medium" style={{ color: "var(--accent)" }}>
                      System Design
                    </span>{" "} lately.
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3 rounded-md font-[Plus_Jakarta_Sans] text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:-translate-y-1"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "#FDF8F2",
                      boxShadow: "0 0 15px rgba(30,86,205,0.3)",
                    }}
                  >
                    Get in Touch
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <a
                    href="https://drive.google.com/drive/folders/1rpSsVFK1jUOqBxiYqPJ7mjmQTIu6hVOE?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-3 backdrop-blur-sm border rounded-md font-[Plus_Jakarta_Sans] text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-card-hover)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-card)";
                    }}
                  >
                    View CV
                  </a>
                </motion.div>
              </motion.div>

              {/* Right Side: Decorative Frame */}
              <motion.div
                className="lg:col-span-5 relative hidden lg:flex items-center justify-center"
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Floating>
                  <div className="relative aspect-square w-56 lg:w-72">
                    <div className="absolute -inset-0.5 rounded-2xl blur-lg opacity-50"
                      style={{ background: "linear-gradient(to top right, rgba(30,86,205,0.3), rgba(168,199,250,0.3))" }}
                    />
                    <div className="absolute -inset-4 border rounded-3xl transform rotate-3"
                      style={{ borderColor: "var(--border-color)" }}
                    />
                    <div className="absolute -inset-4 border rounded-3xl transform -rotate-2"
                      style={{ borderColor: "var(--border-color)" }}
                    />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border shadow-2xl flex items-center justify-center"
                      style={{
                        borderColor: "var(--border-color)",
                        backgroundColor: "var(--bg-card)",
                      }}
                    >
                      <Image
                        src="/img/profile.jpeg"
                        alt="Profile Picture"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </Floating>
              </motion.div>
            </div>

            {/* Bento Grid — muncul setelah hero selesai */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <StaggerContainer staggerDelay={0.18} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                {/* Card 1: Experience */}
                <StaggerItem>
                  <motion.div
                    className="backdrop-blur-md border rounded-xl p-5 group shadow-sm h-full cursor-default glass-card-40 glass-card-hover"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 180, damping: 28 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-[Outfit] text-lg font-semibold tracking-wide"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Experience
                      </h3>
                      <svg
                        className="w-5 h-5 transition-colors group-hover:text-[var(--accent)]"
                        style={{ color: "var(--text-muted)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="font-[Outfit] text-2xl font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      10+ Projects
                    </p>
                    <p className="font-[Plus_Jakarta_Sans] text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Successfully delivered and deployed.
                    </p>
                  </motion.div>
                </StaggerItem>

                {/* Card 2: Main Stack */}
                <StaggerItem>
                  <motion.div
                    className="backdrop-blur-md border rounded-xl p-5 group shadow-sm h-full cursor-pointer glass-card-40 glass-card-hover"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 180, damping: 28 }}
                    onClick={() => {
                      document.getElementById("shab-arcana")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-[Outfit] text-lg font-semibold tracking-wide"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Main Stack
                        </h3>
                      </div>
                      <svg
                        className="w-5 h-5 transition-colors group-hover:text-[var(--accent)]"
                        style={{ color: "var(--text-muted)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {techStack.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 border font-[Plus_Jakarta_Sans] text-xs font-medium rounded-md shadow-sm"
                          style={{
                            backgroundColor: "var(--bg-page)",
                            borderColor: "var(--border-color)",
                            color: "var(--text-primary)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </StaggerItem>

                {/* Card 3: Current Status */}
                <StaggerItem>
                  <motion.div
                    className="backdrop-blur-md border rounded-xl p-5 group shadow-sm h-full flex flex-col justify-between cursor-default glass-card-40 glass-card-hover"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 180, damping: 28 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-[Outfit] text-lg font-semibold tracking-wide"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Current Status
                      </h3>
                      <svg
                        className="w-5 h-5 transition-colors group-hover:text-[var(--accent)]"
                        style={{ color: "var(--text-muted)" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-3 border p-3 rounded-lg"
                      style={{
                        backgroundColor: "var(--bg-page)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                          style={{ backgroundColor: "var(--accent)" }}
                        />
                        <span className="relative inline-flex rounded-full h-3 w-3"
                          style={{ backgroundColor: "var(--accent)" }}
                        />
                      </span>
                      <p className="font-[Plus_Jakarta_Sans] text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Open to Collaborations
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              </StaggerContainer>
            </motion.div>
          </section>
        </div>

        {/* Pick Shab Arcana (Persona 3 Edition) */}
        <ArcanaSection />
      </div>
    </>
  );
}
