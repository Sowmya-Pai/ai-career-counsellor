// ...existing code...
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <span style={styles.title}>AI Career Counsellor</span>
        </div>
        <nav style={styles.nav}>
          <button onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })} style={styles.link}>About</button>
          <button onClick={() => navigate("/home")} style={styles.cta}>Take Assessment</button>
        </nav>
      </header>

      <main style={styles.main}>
        <section style={styles.hero}>
          <h1 style={styles.h1}>Find the best career path for you</h1>
          <p style={styles.lead}>
            Answer a short assessment and get a personalized career report based on your interests and personality.
          </p>

          <div style={styles.card}>
            <h2 style={{ marginTop: 0 }}>Welcome</h2>
            <p style={{ color: "#030319ff" }}>Sign in with Google to start your personalized assessment and save your progress.</p>

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

            <ul style={styles.benefits}>
              <li>Personalized career suggestions</li>
              <li>Save progress across devices</li>
              <li>Secure Google authentication</li>
            </ul>
          </div>
        </section>

        <section id="about" style={styles.info}>
          <h3>How it works</h3>
          <p style={{ maxWidth: 720 }}>
            The app uses AI to analyze your answers and recommends suitable career paths.
          </p>
        </section>
      </main>

      <footer style={styles.footer}>
        <small>© {new Date().getFullYear()} AI Career Counsellor — Built with Firebase & React</small>
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
    background: "linear-gradient(180deg,#f6f9ff 0%, #2fa2e0ff 40%)",
    color: "#080c30ff",
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
  link: { background: "transparent", border: "none", color: "#444", cursor: "pointer" },
  cta: {
    background: "#1f2937",
    color: "#ffffffff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },
  main: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "24px" },
  hero: { width: "100%", maxWidth: 1100, textAlign: "center", paddingTop: 30 },
  h1: { fontSize: 34, margin: 0, color: "#03101cff" },
  lead: { color: "#445774ff", marginTop: 12, marginBottom: 24 },
  card: {
    margin: "18px auto 0",
    background: "#8ed4e9ff",
    borderRadius: 12,
    boxShadow: "0 12px 40px rgba(99, 105, 115, 0.08)",
    padding: 28,
    maxWidth: 680,
    textAlign: "left",
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
  benefits: { marginTop: 14, color: "#555", display: "grid", gap: 6 },
  info: { marginTop: 40, maxWidth: 1100, padding: "18px", textAlign: "center" },
  footer: { textAlign: "center", padding: "18px 12px", color: "#6b7280" },
};
// ...existing code...