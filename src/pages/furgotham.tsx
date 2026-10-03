import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import CollectionAdmin from "@/components/admin/CollectionAdmin";
import type { CollectionName } from "@/lib/collections";
import { requireAuth } from "@/lib/auth";
import type { GetServerSidePropsContext } from "next/types";

const TABS: { id: CollectionName; label: string }[] = [
  { id: "works", label: "Work" },
  { id: "techstacks", label: "Tech Stack" },
  { id: "experiences", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export default function Furgotham({ iconOptions }: { iconOptions: string[] }) {
  const [tab, setTab] = useState<CollectionName>("works");
  const router = useRouter();

  const logout = useCallback(async () => {
    await fetch("/api/furgotham/logout", { method: "POST" }).catch(() => {});
    router.replace("/furgotham-login");
  }, [router]);

  return (
    <>
      <Head>
        <title>CMS - Admin</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section
        className="relative min-h-[calc(100vh-64px-56px)]"
        style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="font-[Outfit] text-3xl sm:text-4xl font-extrabold mb-1" style={{ color: "var(--accent)" }}>
                Content Manager<span style={{ color: "var(--text-primary)" }}>.</span>
              </h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Changes go live on the site within ~30 seconds.
              </p>
            </div>
            <button
              onClick={logout}
              className="tactile-btn-sm px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
              style={{ backgroundColor: "var(--subcard-bg)", color: "var(--text-muted)" }}
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`tactile-btn-sm px-4 py-2 rounded-xl text-xs sm:text-sm uppercase tracking-wider cursor-pointer transition-colors ${
                  tab === t.id ? "font-bold active-pressed" : "font-medium"
                }`}
                style={{
                  backgroundColor: tab === t.id ? "var(--accent)" : "var(--subcard-bg)",
                  color: tab === t.id ? "#FDF8F2" : "var(--text-primary)",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <CollectionAdmin key={tab} collection={tab} iconOptions={iconOptions} />
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  if (!requireAuth(req as never)) {
    return { redirect: { destination: "/furgotham-login", permanent: false } };
  }
  // Icon paths are scanned from public/img so new icons committed to git show
  // up in the admin dropdown.
  const imgDir = join(process.cwd(), "public", "img");
  let iconOptions: string[] = [];
  try {
    iconOptions = readdirSync(imgDir)
      .filter((f) => /\.(svg|png|jpe?g|webp|gif)$/i.test(f))
      .map((f) => `/img/${f}`)
      .sort();
  } catch {
    iconOptions = [];
  }
  return { props: { iconOptions } };
}
