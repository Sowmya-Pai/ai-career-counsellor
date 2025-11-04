// ...existing code...
import React from "react";
import { useNavigate } from "react-router-dom";

const mbtiNotRecommendedCareers = {
  INTJ: ["Sales", "Customer Service", "Event Planning"],
  INTP: ["Law Enforcement", "Routine Office Work", "Retail"],
  ENTJ: ["Technical Labor", "Isolated Research", "Routine Admin"],
  ENTP: ["Highly Repetitive Tasks", "Detail-Oriented Admin", "Long Static Work"],
  INFJ: ["High-Pressure Sales", "Manual Labor", "Rigid Bureaucracies"],
  INFP: ["Highly Competitive Sales", "Large Corporations with Little Autonomy"],
  ENFJ: ["Highly Technical Roles", "Isolated Work Without Interaction"],
  ENFP: ["Monotonous Assembly Line", "Strict Rules, No Creativity"],
  ISTJ: ["Creative Arts", "Improvisation Required Work"],
  ISFJ: ["High Competition, High Pressure Sales"],
  ESTJ: ["Ambiguous Roles With No Structure"],
  ESFJ: ["Technical Research", "Isolated Analytical Jobs"],
  ISTP: ["Highly Social Roles Needing Diplomatic Skills"],
  ISFP: ["Highly Competitive Corporate Sales"],
  ESTP: ["Desk-Bound, No Action Roles"],
  ESFP: ["Highly Technical Research Jobs", "Extensive Solo Work"],
};

// Detailed reasons why a career may be less suited
const notRecommendedDetails = {
  "Sales": "Sales roles often require continuous social persuasion, rapid relationship building and tolerance for rejection. If your assessment shows stronger preference for independent, analytical work or emotional sensitivity, high-pressure sales may be draining.",
  "Customer Service": "Customer service demands frequent emotional labor, shifting priorities and constant interaction. For profiles that prefer focused, solitary or highly structured tasks, this can be a tough fit.",
  "Event Planning": "Event planning is fast-paced, requires extreme multitasking and on-the-spot problem solving with many stakeholders. If you prefer predictable, methodical work, this will feel chaotic.",
  "Law Enforcement": "Law enforcement involves high-stress operational decisions and frequent exposure to unpredictable situations. It may conflict with people who prefer low-risk, reflective, or research-focused work.",
  "Routine Office Work": "Very repetitive, narrowly-scoped tasks can be demotivating for creative, strategic or investigative personalities who thrive on variety and conceptual challenge.",
  "Manual Labor": "Intense physical roles may not align with profiles that indicate a stronger preference for cognitive, design or empathic work.",
  "Highly Repetitive Tasks": "Roles that require the same small set of actions constantly can be demotivating for those who need novelty, strategic thinking or creative problem solving.",
  "Highly Technical Research Jobs": "If social interaction, applied work or people-focused impact scored higher, very isolated technical research without human context can be unrewarding.",
};

export default function NotRecommended() {
  const navigate = useNavigate();
  const personalityData = JSON.parse(localStorage.getItem("personalityTraits")) || {};

  const getMBTI = () => {
    const E = personalityData.E || 0;
    const I = personalityData.I || 0;
    const S = personalityData.S || 0;
    const N = personalityData.N || 0;
    const T = personalityData.T || 0;
    const F = personalityData.F || 0;
    const J = personalityData.J || 0;
    const P = personalityData.P || 0;

    return (E >= I ? "E" : "I") +
           (S >= N ? "S" : "N") +
           (T >= F ? "T" : "F") +
           (J >= P ? "J" : "P");
  };

  const mbti = getMBTI();
  const avoidList = mbtiNotRecommendedCareers[mbti] || [];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>
            <div style={styles.title}>Careers to Avoid</div>
            <div style={styles.subtitle}>Suggestions based on your profile</div>
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Careers to Avoid for {mbti}</h2>
          {avoidList.length === 0 ? (
            <p style={{ color: "#374151" }}>No specific recommendations to avoid.</p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {avoidList.map((career) => (
                <div key={career} style={{ background: "#fff7f7", padding: 12, borderRadius: 8 }}>
                  <h4 style={{ margin: 0 }}>{career}</h4>
                  <p style={{ marginTop: 6, color: "#7f1d1d" }}>
                    {notRecommendedDetails[career] || "This career may be less suited because it conflicts with your dominant traits (requires different environment, pace or interpersonal demands)."}
                  </p>
                  <p style={{ marginTop: 6, color: "#6b7280", fontSize: 13 }}>
                    Recommendation: Consider alternatives that better match your strengths and preferred working style.
                  </p>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 18 }}>
            <button style={styles.primary} onClick={() => navigate("/assessment/graph-result")}>Back to Summary</button>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>© {new Date().getFullYear()} AI Career Counsellor</footer>
    </div>
  );
}

// ...existing styles...
const styles = {
  page: { fontFamily: "Inter, system-ui, Arial", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f9ff" },
  header: { display: "flex", alignItems: "center", padding: "18px 28px", background: "#fff", borderBottom: "1px solid #e6eef9" },
  brand: { display: "flex", gap: 12, alignItems: "center" },
  logo: { width: 48, height: 48, borderRadius: 10, background: "linear-gradient(135deg,#6c63ff,#00c2ff)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  title: { fontWeight: 700 },
  subtitle: { fontSize: 12, color: "#6b7280" },
  container: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 28 },
  card: { width: "100%", maxWidth: 720, background: "#fff", padding: 28, borderRadius: 12, boxShadow: "0 12px 30px rgba(15,23,42,0.06)" },
  primary: { background: "#0b5ed7", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 8, cursor: "pointer" },
  footer: { textAlign: "center", padding: 18, color: "#6b7280" },
};
// ...existing code...