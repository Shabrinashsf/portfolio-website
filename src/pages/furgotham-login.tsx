import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function FurgothamLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/furgotham/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Gagal login");
        return;
      }
      router.replace("/furgotham");
    } catch {
      setError("Gagal login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - CMS</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section
        className="min-h-[calc(100vh-64px-56px)] flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-page)", color: "var(--text-primary)" }}
      >
        <form
          onSubmit={submit}
          className="w-full max-w-xs rounded-2xl border p-6 space-y-4"
          style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-card)" }}
        >
          <div className="text-center">
            <h1 className="font-[Outfit] text-2xl font-extrabold" style={{ color: "var(--accent)" }}>
              Furgotham<span style={{ color: "var(--text-primary)" }}>.</span>
            </h1>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Content Manager</p>
          </div>

          {error && (
            <div className="px-3 py-2 rounded-lg border text-xs" style={{ borderColor: "rgba(244,63,94,.4)", backgroundColor: "rgba(244,63,94,.08)" }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
              Username
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--bg-page)] border outline-none focus:border-[var(--accent)] transition-colors"
              style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--bg-page)] border outline-none focus:border-[var(--accent)] transition-colors"
              style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="tactile-btn w-full py-2.5 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-60"
            style={{ backgroundColor: "var(--accent)", color: "#FDF8F2" }}
          >
            {loading ? "…" : "Login"}
          </button>
        </form>
      </section>
    </>
  );
}
