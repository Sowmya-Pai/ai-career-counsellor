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
          <h1 style={{ ...styles.h1, color: dark ? "#ffffff" : "#0f172a" }}>Find the best career path for you</h1>
          <p style={{ ...styles.lead, color: dark ? "#e2e8f0" : "#4b5563" }}>
            Answer a short assessment and get a personalized career report based on your interests and personality.
          </p>

          <div style={{ 
            ...styles.card, 
            background: dark ? "#ffffff" : "#ffffff",
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
  footer: { textAlign: "center", padding: "18px 12px", color: "#e5e7eb" },
};
// ...existing code...