import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import GridBackground from "@/components/GridBackground";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Waiting for something to happen?</title>
      </Head>
      <section
        className="flex-grow flex flex-col items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
      >
        <GridBackground />
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-2 md:gap-4 mb-8"
          >
            <span className="font-[Outfit] text-[6rem] md:text-[10.5rem] font-extrabold" style={{ color: "var(--text-primary)" }}>
              4
            </span>
            <Image
              src="/img/404-cat.png"
              alt="Sleeping Cat"
              width={240}
              height={240}
              className="object-contain transition-all duration-300"
              style={{ filter: "var(--image-invert)" }}
            />
            <span className="font-[Outfit] text-[6rem] md:text-[10.5rem] font-extrabold" style={{ color: "var(--text-primary)" }}>
              4
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-12 space-y-3"
          >
            <p className="font-[Outfit] text-2xl md:text-3xl font-medium tracking-wide" style={{ color: "var(--text-primary)" }}>
              Meow.
            </p>
            <p className="font-[Plus_Jakarta_Sans] text-lg md:text-xl opacity-80" style={{ color: "var(--text-secondary)" }}>
              ( Waiting for something to happen ? )
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md font-[Plus_Jakarta_Sans] text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "transparent",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-color)"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--text-primary)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-color)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
