// ...existing code...
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
      else navigate("/", { replace: true });
    });
    return () => unsub();
  }, [navigate]);

  const handleStart = () => navigate("/assessment/personality-test");
  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/", { replace: true });
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>
            <div style={styles.appName}>AI Career Counsellor</div>
            <div style={styles.appTag}>Personalized career guidance</div>
          </div>
        </div>

        <nav style={styles.nav}>
          <button style={styles.navBtn} onClick={() => navigate("/home")}>Dashboard</button>
          <button style={styles.navBtn} onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>About</button>
          <button style={styles.signOut} onClick={handleSignOut}>Sign out</button>
        </nav>
      </header>

      <main style={styles.main}>
        <section style={styles.left}>
          <div style={styles.heroCard}>
            <h1 style={styles.h1}>Find the best career path for you</h1>
            <p style={styles.lead}>
              Take a short assessment and receive tailored career suggestions, learning resources, and step-by-step plans to reach your goals.
            </p>

            <div style={styles.ctaRow}>
              <button style={styles.primaryBtn} onClick={handleStart}>Start Assessment</button>
            </div>

            <div style={styles.features}>
              <Feature title="Personalized" desc="AI-driven recommendations based on your responses." />
              <Feature title="Save Progress" desc="Sign in to continue later across devices." />
              <Feature title="Actionable Steps" desc="Clear next steps and learning paths." />
            </div>
          </div>

          <div style={styles.infoCard}>
            <h3 style={{ marginTop: 0 }}>How it works</h3>
            <ol style={{ paddingLeft: 18 }}>
              <li>Complete a short personality & interest assessment (5–7 mins).</li>
              <li>Get prioritized career matches with explanations.</li>
            </ol>
          </div>
        </section>

        <aside style={styles.right}>
          <div style={styles.profileCard}>
            <img
              alt="avatar"
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "User")}&background=6c63ff&color=fff`}
              style={styles.avatar}
            />
            <div style={{ flex: 1 }}>
              <div style={styles.name}>{user?.displayName || "Welcome!"}</div>
              <div style={styles.email}>{user?.email}</div>
            </div>
          </div>

          <div style={styles.cardStat}>
            <strong>Next step</strong>
            <p style={{ margin: 6 }}>Take the personality test to generate your first set of career matches.</p>
            <button style={styles.smallBtn} onClick={handleStart}>Begin</button>
          </div>
        </aside>
      </main>

      <footer style={styles.footer}>
        <div>© {new Date().getFullYear()} AI Career Counsellor</div>
      </footer>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <strong>{title}</strong>
      <div style={{ color: "#4b5563" }}>{desc}</div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f6f9ff",
    color: "#0f172a",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 28px",
    borderBottom: "1px solid #e6eef9",
    background: "#fff",
  },
  brand: { display: "flex", alignItems: "center", gap: 12 },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    background: "linear-gradient(135deg,#6c63ff,#00c2ff)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 18,
    boxShadow: "0 6px 18px rgba(99,102,241,0.12)",
  },
  appName: { fontWeight: 700, fontSize: 16 },
  appTag: { fontSize: 12, color: "#6b7280" },
  nav: { display: "flex", gap: 12, alignItems: "center" },
  navBtn: { background: "transparent", border: "none", color: "#374151", cursor: "pointer", padding: 8 },
  signOut: { background: "#ef4444", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" },

  main: {
    display: "flex",
    gap: 24,
    padding: 28,
    maxWidth: 1100,
    width: "100%",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  left: { flex: 1, display: "flex", flexDirection: "column", gap: 18 },
  right: { width: 320, display: "flex", flexDirection: "column", gap: 14 },

  heroCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
  },
  h1: { fontSize: 28, margin: 0, color: "#0b3a66" },
  lead: { marginTop: 12, color: "#374151" },
  ctaRow: { display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" },
  primaryBtn: {
    background: "#0b5ed7",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
  features: { marginTop: 18, display: "grid", gap: 8 },

  infoCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 8px 20px rgba(15,23,42,0.04)",
  },

  profileCard: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    background: "#fff",
    padding: 14,
    borderRadius: 12,
    boxShadow: "0 8px 22px rgba(15,23,42,0.04)",
  },
  avatar: { width: 64, height: 64, borderRadius: 12, objectFit: "cover" },
  name: { fontWeight: 700 },
  email: { fontSize: 13, color: "#6b7280" },

  cardStat: {
    background: "#fff",
    padding: 14,
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(15,23,42,0.04)",
    textAlign: "left",
  },

  smallBtn: {
    marginTop: 8,
    background: "#06b6d4",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    padding: 18,
    color: "#6b7280",
    marginTop: "auto",
  },
};
// ...existing code...