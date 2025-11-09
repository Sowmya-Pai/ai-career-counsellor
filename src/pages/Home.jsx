// ...existing code...
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Home() {
  const [user, setUser] = useState(null);
  const [selectedStage, setSelectedStage] = useState(2); // Pre-select option 3 (index 2)
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
            <div style={styles.appName}>AI Career Compass</div>
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

          <div style={styles.stageCard}>
            <h3 style={styles.stageTitle}>🎯 Define Your Current Stage</h3>
            <p style={styles.stageSubtitle}>Help us understand where you are in your career journey</p>
            <div style={styles.stageGrid}>
              <StageOption
                icon="❓"
                title="No Idea"
                description="I have no idea about my career"
                isSelected={selectedStage === 0}
                onClick={() => setSelectedStage(0)}
              />
              <StageOption
                icon="🛣️"
                title="Confused"
                description="I am confused among various career options"
                isSelected={selectedStage === 1}
                onClick={() => setSelectedStage(1)}
              />
              <StageOption
                icon="🔭"
                title="Exploring"
                description="I am bit sure but want to explore other options as well"
                isSelected={selectedStage === 2}
                onClick={() => setSelectedStage(2)}
              />
              <StageOption
                icon="🗺️"
                title="Need Plan"
                description="I am very sure about my career choice but need an execution plan"
                isSelected={selectedStage === 3}
                onClick={() => setSelectedStage(3)}
              />
            </div>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>📋 How It Works</h3>
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
        <div>© {new Date().getFullYear()} AI Career Compass</div>
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

function StageOption({ icon, title, description, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: 20,
        background: isSelected ? "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)" : "#fff",
        borderRadius: 12,
        border: isSelected ? "2px solid #6366f1" : "2px solid #e2e8f0",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textAlign: "center",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "#cbd5e1";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(99,102,241,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }
      }}
    >
      {isSelected && (
        <div style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#6366f1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 12,
          fontWeight: 700,
        }}>
          ✓
        </div>
      )}
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <div style={{ 
        fontWeight: 600, 
        fontSize: 15, 
        color: isSelected ? "#4338ca" : "#0f172a",
        marginBottom: 8,
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: 13, 
        color: isSelected ? "#6366f1" : "#64748b",
        lineHeight: 1.4,
      }}>
        {description}
      </div>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
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
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
    textAlign: "center",
    border: "1px solid #e2e8f0",
  },
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

  smallBtn: {
    marginTop: 8,
    background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    width: "100%",
    boxShadow: "0 4px 12px rgba(6,182,212,0.3)",
    transition: "all 0.3s ease",
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