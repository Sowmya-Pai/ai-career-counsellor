// ...existing code...
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useTheme } from "../theme/ThemeContext";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isDark: dark, toggleTheme } = useTheme();
  const [wide, setWide] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= 992;
  });

  useEffect(() => {
    function onResize() {
      setWide(window.innerWidth >= 992);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Load 3D model viewer once
  useEffect(() => {
    if (typeof window !== "undefined" && window.customElements && window.customElements.get("model-viewer")) return;
    const script = document.createElement("script");
    script.type = "module";
    script.defer = true;
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // If user already signed in, go to home
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home", { replace: true });
    });
    return () => unsub();
  }, [navigate]);

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Google sign-in failed:", err);
      alert(`Google sign-in failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ 
      ...styles.page, 
      background: dark ? "linear-gradient(180deg,rgb(35, 24, 50) 0%,rgb(33, 15, 39) 100%)" : "linear-gradient(180deg,#f6f9ff 0%, #93c5fd 100%)",
      color: dark ? "#f8fafc" : "#0f172a"
    }}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <span style={{ ...styles.title, color: dark ? "#ffffff" : "#0f172a" }}>AI Career Compass</span>
        </div>
        <nav style={styles.nav}>
          <button onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })} style={{ ...styles.link, color: dark ? "#e5e7eb" : "#374151" }}>About</button>
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{ ...styles.link, color: dark ? "#e5e7eb" : "#374151" }}>
            {dark ? "Light mode" : "Dark mode"}
          </button>
          <button onClick={() => navigate("/home")} style={{ 
            ...styles.cta, 
            background: dark ? "#ffffff" : "#1f2937",
            color: dark ? "#111827" : "#ffffff" 
          }}>Take Assessment</button>
        </nav>
      </header>

      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={{ ...styles.grid, gridTemplateColumns: wide ? "1.2fr 1fr" : "1fr" }}>
            <div style={styles.leftPane}>
              <h1 style={{ ...styles.h1, color: dark ? "#ffffff" : "#0f172a" }}>Find the best career path for you</h1>
              <p style={{ ...styles.lead, color: dark ? "#e2e8f0" : "#4b5563" }}>
                Answer a short assessment and get a personalized career report based on your interests and personality.
              </p>
              <div style={{ 
                ...styles.card, 
                background: "#ffffff",
                color: "#0f172a",
                boxShadow: dark ? "0 16px 48px rgba(15, 23, 42, 0.18)" : "0 12px 36px rgba(15,23,42,0.12)"
              }}>
                <h2 style={{ marginTop: 0 }}>Welcome</h2>
                <p style={{ color: "#0f172a" }}>Sign in with Google to begin your assessment and save progress.</p>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  aria-label="Sign in with Google"
                  style={{ ...styles.googleBtn, opacity: loading ? 0.7 : 1 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 10 }}>
                    <path fill="#4285F4" d="M21.35 11.1h-9.18v2.92h5.26c-.23 1.5-1.16 2.76-2.48 3.6v2.98h4.01C20.5 19.14 22 15.46 22 12c0-.63-.06-1.24-.17-1.9z"></path>
                    <path fill="#34A853" d="M12.17 22c2.7 0 4.96-.9 6.62-2.44l-4.01-2.98c-1.11.75-2.52 1.2-4.61 1.2-3.53 0-6.52-2.38-7.59-5.6H.95v3.52C2.62 19.9 7.01 22 12.17 22z"></path>
                    <path fill="#FBBC05" d="M4.58 13.19A7.02 7.02 0 0 1 4 12c0-.4.04-.78.11-1.16V7.32H.95A11.99 11.99 0 0 0 0 12c0 1.9.43 3.7 1.2 5.29l3.38-4.1z"></path>
                    <path fill="#EA4335" d="M12.17 6.48c1.47 0 2.8.51 3.85 1.5l2.89-2.9C17.1 2.88 14.85 2 12.17 2 7.01 2 2.62 4.1.95 7.32l3.16 2.52c1.07-3.22 4.06-5.6 7.59-5.36z"></path>
                  </svg>
                  {loading ? "Signing in..." : "Sign in with Google"}
                </button>
                <div style={styles.chipsRow}>
                  <div style={styles.chip}>2 min setup</div>
                  <div style={styles.chip}>Free report</div>
                  <div style={styles.chip}>Save progress</div>
                </div>
              </div>
              <div style={styles.features}>
                <div style={styles.featureItem}>
                  <div style={{ ...styles.iconCircle, background: dark ? "#111827" : "#eef2ff", color: dark ? "#e5e7eb" : "#1f2937" }}>🧭</div>
                  <div style={styles.featureTitle}>Personalized paths</div>
                </div>
                <div style={styles.featureItem}>
                  <div style={{ ...styles.iconCircle, background: dark ? "#111827" : "#eef2ff", color: dark ? "#e5e7eb" : "#1f2937" }}>⚡</div>
                  <div style={styles.featureTitle}>Real-time insights</div>
                </div>
                <div style={styles.featureItem}>
                  <div style={{ ...styles.iconCircle, background: dark ? "#111827" : "#eef2ff", color: dark ? "#e5e7eb" : "#1f2937" }}>📄</div>
                  <div style={styles.featureTitle}>Export report</div>
                </div>
              </div>
            </div>
            <div style={{ ...styles.rightPane, display: wide ? "block" : "none" }}>
              <div style={styles.viewerWrap}>
                <model-viewer
                  src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                  alt="3D character"
                  camera-controls
                  auto-rotate
                  ar
                  exposure="1.1"
                  shadow-intensity="0.9"
                  style={styles.viewer}
                ></model-viewer>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ ...styles.footer, color: dark ? "#e5e7eb" : "#475569" }}>
        <small>© {new Date().getFullYear()} AI Career Compass — Powered by Who You Are.</small>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(180deg, #0ea5e9 0%, #6366f1 100%)",
    color: "#f8fafc",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 36px",
    maxWidth: 1100,
    width: "100%",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  brand: { display: "flex", alignItems: "center", gap: 12 },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 8,
    background: "linear-gradient(135deg,#6c63ff,#00c2ff)",
    color: "#ffffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    boxShadow: "0 6px 18px rgba(99,102,241,0.18)",
  },
  title: { fontWeight: 700, fontSize: 18 },
  nav: { display: "flex", gap: 12, alignItems: "center" },
  link: { background: "transparent", border: "none", color: "#e5e7eb", cursor: "pointer" },
  cta: {
    background: "#ffffff",
    color: "#111827",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },
  main: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "24px" },
  hero: { width: "100%", maxWidth: 1100, textAlign: "center", paddingTop: 30 },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 24,
    alignItems: "center",
  },
  leftPane: {
    textAlign: "left",
    margin: "0 auto",
    width: "100%",
    maxWidth: 560,
  },
  rightPane: {
    display: "none",
  },
  viewerWrap: {
    width: "100%",
    maxWidth: 520,
    margin: "0 auto",
    aspectRatio: "1 / 1",
    borderRadius: 16,
    background: "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
    boxShadow: "0 20px 60px rgba(15,23,42,0.25)",
    overflow: "hidden",
    border: "1px solid rgba(148,163,184,0.25)",
  },
  viewer: {
    width: "100%",
    height: "100%",
  },
  h1: { fontSize: 34, margin: 0, color: "#ffffff" },
  lead: { color: "#e2e8f0", marginTop: 12, marginBottom: 24 },
  card: {
    margin: "18px auto 0",
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 16px 48px rgba(15, 23, 42, 0.18)",
    padding: 28,
    maxWidth: 680,
    textAlign: "left",
    color: "#0f172a",
  },
  googleBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 14px",
    borderRadius: 8,
    background: "#fff",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    fontWeight: 600,
    marginTop: 12,
  },
  chipsRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 14,
  },
  chip: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "#f1f5f9",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 14,
    marginTop: 24,
    width: "100%",
    maxWidth: 560,
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
    padding: "14px 12px",
    borderRadius: 12,
    background: "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.6))",
    border: "1px solid #e5e7eb",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  featureTitle: {
    fontWeight: 600,
    color: "#0f172a",
  },
  badgesRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 18,
  },
  badge: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "#0f172a",
    color: "#ffffff",
  },
  footer: { textAlign: "center", padding: "18px 12px", color: "#e5e7eb" },
};
// ...existing code...