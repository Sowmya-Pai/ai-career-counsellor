// ...existing code...
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useTheme } from "../theme/ThemeContext";

export default function Home() {
  const { isDark } = useTheme();
  const [user, setUser] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
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

  const stageOptions = useMemo(() => [
    { icon: "❓", title: "No Idea", description: "I have no idea about my career" },
    { icon: "🛣️", title: "Confused", description: "I am confused among various career options" },
    { icon: "🔭", title: "Exploring", description: "I am bit sure but want to explore other options as well" },
    { icon: "🗺️", title: "Need Plan", description: "I am very sure about my career choice but need an execution plan" },
  ], []);

  return (
    <div style={{
      ...styles.page,
      background: isDark
        ? "linear-gradient(135deg, rgba(2,6,23,0.94), rgba(30,58,138,0.85)), url('https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1800&q=70')"
        : "linear-gradient(135deg, rgba(226,232,240,0.92), rgba(191,219,254,0.8)), url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=70')",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      color: isDark ? "#e2e8f0" : "#0f172a"
    }}>
      <header style={{
        ...styles.header,
        background: isDark ? "#0b1220" : "#ffffff",
        borderBottom: isDark ? "1px solid rgba(148, 163, 184, 0.2)" : "1px solid #e6eef9"
      }}>
        <div style={styles.brand}>
          <div style={{
            ...styles.logo,
            boxShadow: isDark ? "0 6px 18px rgba(99,102,241,0.35)" : styles.logo.boxShadow
          }}>AI</div>
          <div>
            <div style={{ ...styles.appName, color: isDark ? "#f8fafc" : styles.appName.color }}>AI Career Compass</div>
            <div style={{ ...styles.appTag, color: isDark ? "#94a3b8" : "#6b7280" }}>Personalized career guidance</div>
          </div>
        </div>

        <nav style={styles.nav}>
          <button style={{ ...styles.navBtn, color: isDark ? "#e2e8f0" : "#374151" }} onClick={() => navigate("/home")}>Dashboard</button>
          <button style={{ ...styles.navBtn, color: isDark ? "#e2e8f0" : "#374151" }} onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>About</button>
          <button style={styles.signOut} onClick={handleSignOut}>Sign out</button>
        </nav>
      </header>

      <main style={styles.main}>
        <section style={styles.left}>
          <div style={{
            ...styles.heroCard,
            background: isDark ? "linear-gradient(135deg, rgba(15,23,42,0.85), rgba(37,99,235,0.65))" : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: isDark ? "1px solid rgba(148,163,184,0.18)" : "1px solid #e2e8f0",
            color: isDark ? "#f8fafc" : "#0f172a",
          }}>
            <h1 style={{ ...styles.h1, color: isDark ? "#f8fafc" : "#0f172a" }}>Find the best career path for you</h1>
            <p style={{ ...styles.lead, color: isDark ? "#cbd5f5" : "#475569" }}>
              Take a short assessment and receive tailored career suggestions, learning resources, and step-by-step plans to reach your goals.
            </p>

            <div style={styles.ctaRow}>
              <button style={styles.primaryBtn} onClick={handleStart}>Start Assessment</button>
            </div>

            <div style={styles.features}>
              <Feature title="Personalized" desc="AI-driven recommendations based on your responses." isDark={isDark} />
              <Feature title="Save Progress" desc="Sign in to continue later across devices." isDark={isDark} />
              <Feature title="Actionable Steps" desc="Clear next steps and learning paths." isDark={isDark} />
            </div>
          </div>

          <div style={{
            ...styles.stageCard,
            background: isDark ? "rgba(15,23,42,0.85)" : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: isDark ? "1px solid rgba(148,163,184,0.18)" : "1px solid #e2e8f0",
            color: isDark ? "#f8fafc" : "#0f172a"
          }}>
            <h3 style={{ ...styles.stageTitle, color: isDark ? "#f1f5f9" : "#0f172a" }}>🎯 Define Your Current Stage</h3>
            <p style={{ ...styles.stageSubtitle, color: isDark ? "#cbd5f5" : "#64748b" }}>Help us understand where you are in your career journey</p>
            <div style={styles.stageGrid}>
              {stageOptions.map((option, idx) => (
                <StageOption
                  key={option.title}
                  icon={option.icon}
                  title={option.title}
                  description={option.description}
                  isDark={isDark}
                  isActive={selectedStage === idx}
                  onClick={() => setSelectedStage(idx)}
                />
              ))}
            </div>
          </div>

          <div style={{
            ...styles.infoCard,
            background: isDark ? "rgba(15,23,42,0.85)" : "#fff",
            border: isDark ? "1px solid rgba(148,163,184,0.18)" : "1px solid #e2e8f0",
            color: isDark ? "#f1f5f9" : "#0f172a"
          }}>
            <h3 style={{ ...styles.infoTitle, color: isDark ? "#f8fafc" : "#0f172a" }}>📋 How It Works</h3>
            <ol style={{ paddingLeft: 18, color: isDark ? "#cbd5f5" : "#475569" }}>
              <li>Complete a short personality & interest assessment (5–7 mins).</li>
              <li>Get prioritized career matches with explanations.</li>
            </ol>
          </div>
        </section>

        <aside style={styles.right}>
          <div style={{
            ...styles.profileCard,
            background: isDark ? "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(15,23,42,0.85))" : "#fff",
            border: isDark ? "1px solid rgba(148,163,184,0.18)" : "1px solid #e2e8f0",
            color: isDark ? "#f8fafc" : "#0f172a"
          }}>
            <img
              alt="avatar"
              src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || "User")}&background=1e3a8a&color=fff`}
              style={{ ...styles.avatar, border: isDark ? "2px solid rgba(96,165,250,0.6)" : "2px solid #e2e8f0" }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ ...styles.name, color: isDark ? "#f8fafc" : "#0f172a" }}>{user?.displayName || "Welcome!"}</div>
              <div style={{ ...styles.email, color: isDark ? "#cbd5f5" : "#6b7280" }}>{user?.email}</div>
            </div>
          </div>
        </aside>
      </main>

      <footer style={styles.footer}>
        <div>© {new Date().getFullYear()} AI Career Compass</div>
      </footer>
    </div>
  );
}

function Feature({ title, desc, isDark }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <strong style={{ color: isDark ? "#f8fafc" : "#0f172a" }}>{title}</strong>
      <div style={{ color: isDark ? "#cbd5f5" : "#4b5563" }}>{desc}</div>
    </div>
  );
}

function StageOption({ icon, title, description, isDark, isActive, onClick }) {
  const baseBg = isDark ? "rgba(15,23,42,0.75)" : "#ffffff";
  const activeBg = isDark ? "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(15,23,42,0.9))" : "linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)";
  return (
    <button
      onClick={onClick}
      style={{
        padding: 20,
        background: isActive ? activeBg : baseBg,
        borderRadius: 16,
        border: isActive ? "2px solid rgba(59,130,246,0.6)" : isDark ? "1px solid rgba(148,163,184,0.3)" : "1px solid #e2e8f0",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: isActive ? "0 15px 30px rgba(37, 99, 235, 0.18)" : "none",
        color: isDark ? "#f8fafc" : "#0f172a"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        if (!isActive) {
          e.currentTarget.style.boxShadow = "0 12px 28px rgba(37, 99, 235, 0.12)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        if (!isActive) {
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      <div style={{ fontSize: 34 }}>{icon}</div>
      <div style={{
        fontWeight: 600,
        fontSize: 16,
        color: isActive ? (isDark ? "#bfdbfe" : "#1e3a8a") : (isDark ? "#e2e8f0" : "#0f172a"),
      }}>
        {title}
      </div>
      <div style={{
        fontSize: 14,
        color: isDark ? "#cbd5f5" : "#6366f1"
      }}>
        {description}
      </div>
    </button>
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
    gap: 28,
    padding: 32,
    maxWidth: 1280,
    width: "100%",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  left: { flex: 1, display: "flex", flexDirection: "column", gap: 18 },
  right: { width: 360, display: "flex", flexDirection: "column", gap: 18 },

  heroCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    borderRadius: 16,
    padding: 32,
    boxShadow: "0 20px 40px rgba(15,23,42,0.08)",
    border: "1px solid #e2e8f0",
  },
  badge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 16,
    boxShadow: "0 4px 12px rgba(99,102,241,0.2)",
  },
  h1: { 
    fontSize: 36, 
    margin: "8px 0 0 0", 
    color: "#0f172a",
    fontWeight: 800,
    lineHeight: 1.2,
  },
  lead: { 
    marginTop: 16, 
    color: "#475569",
    fontSize: 16,
    lineHeight: 1.6,
  },
  ctaRow: { display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" },
  primaryBtn: {
    background: "linear-gradient(135deg, #0b5ed7 0%, #0ea5e9 100%)",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
    boxShadow: "0 4px 14px rgba(11,94,215,0.3)",
    transition: "all 0.3s ease",
  },
  secondaryBtn: {
    background: "#fff",
    color: "#0b5ed7",
    border: "2px solid #e2e8f0",
    padding: "12px 24px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
    transition: "all 0.3s ease",
  },
  features: { marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 },

  stageCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    borderRadius: 16,
    padding: 32,
    boxShadow: "0 20px 40px rgba(15,23,42,0.08)",
    border: "1px solid #e2e8f0",
  },
  stageTitle: {
    marginTop: 0,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: 700,
    color: "#0f172a",
  },
  stageSubtitle: {
    marginTop: 0,
    marginBottom: 24,
    fontSize: 15,
    color: "#64748b",
  },
  stageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 18,
  },

  infoCard: {
    background: "#fff",
    borderRadius: 16,
    padding: 28,
    boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
    border: "1px solid #e2e8f0",
  },
  infoTitle: {
    marginTop: 0,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  step: {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    padding: 16,
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
  },
  stepTitle: {
    fontWeight: 600,
    fontSize: 15,
    color: "#0f172a",
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.5,
  },

  profileCard: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    padding: 18,
    borderRadius: 16,
    boxShadow: "0 12px 26px rgba(15,23,42,0.12)",
  },
  avatar: { width: 72, height: 72, borderRadius: "50%", objectFit: "cover" },
  name: { fontWeight: 700 },
  email: { fontSize: 13, color: "#6b7280" },

  statIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  statTitle: {
    display: "block",
    fontSize: 16,
    color: "#0f172a",
    marginBottom: 8,
  },
  statDesc: {
    margin: "8px 0 16px 0",
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.5,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  miniStat: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    padding: 16,
    borderRadius: 12,
    textAlign: "center",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
  },
  miniStatValue: {
    fontSize: 24,
    fontWeight: 700,
    color: "#6366f1",
    marginBottom: 4,
  },
  miniStatLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: 500,
  },

  footer: {
    textAlign: "center",
    padding: 24,
    color: "#94a3b8",
    marginTop: "auto",
    borderTop: "1px solid #e2e8f0",
  },
  footerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    fontSize: 14,
  },
  footerDivider: {
    color: "#cbd5e1",
  },
};
// ...existing code...