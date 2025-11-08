import React from "react";
import { useNavigate } from "react-router-dom";

const mbtiNotRecommendedCareers = {
  INTJ: ["Sales", "CustomerService", "Event Planning"],
  INTP: ["Law Enforcement", "Routine Office Work", "Retail"],
  ENTJ: ["Technical Labor", "Isolated Research", "Routine Admin"],
  ENTP: ["Highly Repetitive Tasks", "Detail-Oriented Admin", "Long Static Work"],
  INFJ: ["High-Pressure Sales", "Manual Labor", "Rigid Bureaucracies"],
  INFP: ["Highly Competitive Sales", "Large Corporations with Little Autonomy"],
  ENFJ: ["Highly Technical Roles", "Isolated Work Without Interaction"],
  ENFP: ["Monotonous Assembly Line", "Strict Rules", "No Creativity"],
  ISTJ: ["Creative Arts", "Improvisation Required Work"],
  ISFJ: ["High Competition", "High Pressure Sales"],
  ESTJ: ["Ambiguous Roles With No Structure"],
  ESFJ: ["Technical Research", "Isolated Analytical Jobs"],
  ISTP: ["Highly Social Roles Needing Diplomatic Skills"],
  ISFP: ["Highly Competitive Corporate Sales"],
  ESTP: ["Desk-Bound, No Action Roles"],
  ESFP: ["Highly Technical Research Jobs", "Extensive Solo Work"],
};

const notRecommendedDetails = {
  Sales: `Sales roles often require continuous social persuasion and rapid rapport building.
They demand tolerance for frequent rejection and shifting targets.
High-pressure quota environments can cause stress and burnout.
They are unsuitable when preference is for solitary or analytical work.
Sales often rewards extroversion and quick emotional recovery from setbacks.
Irregular hours and travel may conflict with stable routines.
They can clash with values-driven or highly structured personalities.
Consider alternatives that offer predictable routines and lower interpersonal strain.`,

  CustomerService: `Customer service involves sustained, frequent interpersonal emotional labor.
It requires constant reaction to unpredictable user needs and conflicts.
High-volume interactions can cause cognitive and emotional fatigue.
This role can be unsuitable for those who prefer deep, focused tasks.
Often enforces strict scripts and offers limited autonomy.
It rewards high patience, rapid conflict resolution and resilience.
Work can be repetitive with little creative control or growth.
Consider roles with structured tasks or independent work if this is draining.`,

  EventPlanning: `Event planning is fast-paced and requires extreme multitasking.
It demands tolerance for last-minute changes and high stress.
Involves long hours, variable schedules and on-site coordination.
Unsuitable for those who prefer predictable, methodical work.
Rewards improvisation, negotiation and logistics skill.
Offers frequent crisis management rather than routine tasks.
Can be socially and emotionally draining during peak events.
Avoid if you prefer stable schedules and low-adrenaline responsibilities.`,

  LawEnforcement: `Law enforcement faces unpredictable, high-risk and emotionally intense situations.
It requires quick operational decisions and physical readiness.
Often involves exposure to traumatic events and high stress.
Unsuitable for highly risk-averse or research-oriented personalities.
Demands strict protocols and adherence to chain-of-command.
Can limit creative autonomy and reflective work time.
Provides strong structure but may conflict with introspective preferences.
Consider lower-risk public service or analytical roles as alternatives.`,

  RoutineOfficeWork: `Routine office work consists of repetitive, narrowly-scoped tasks.
It provides limited cognitive challenge for creative or investigative minds.
Rewards meticulousness and consistency over innovation.
Unsuitable for those who need novelty, autonomy, or conceptual work.
Often involves tight procedures and little strategic input.
Can lead to boredom and disengagement for variety-seekers.
May stifle growth for people seeking complex problem solving.
Consider roles with project variety or increasing responsibility instead.`,

  ManualLabor: `Manual labor demands sustained physical effort and often harsh conditions.
It provides limited alignment for those who prefer cognitive or design work.
Involves predictable, repetitive physical tasks with higher injury risk.
Unsuitable for people seeking intellectual challenge or flexible schedules.
Rewards physical skill, endurance and practical problem solving.
Often offers less autonomy and creative control over processes.
Can be physically taxing over long careers without proper supports.
Consider hybrid roles or vocational training if physical work is not preferred.`,

  HighlyRepetitiveTasks: `These roles require performing the same actions with minimal variation.
They offer little opportunity for creativity or strategic thinking.
Lead to rapid boredom and reduced motivation for novelty seekers.
Unsuitable for investigative, creative or leadership personalities.
Reward consistency, speed and error-free execution rather than innovation.
Often have low decision-making autonomy and limited growth paths.
Can cause cognitive fatigue and disengagement over time.
Consider roles with varied responsibilities or problem-solving components instead.`,

  HighlyTechnicalResearchJobs: `Very technical research roles often involve deep, solitary specialization.
They require tolerance for long projects with slow feedback cycles.
Demand advanced domain knowledge and specialized methods.
Can feel isolating if social interaction or applied impact is preferred.
Reward precision, patience and rigorous scientific training.
May offer fewer visible short-term impacts and slower career milestones.
Unsuitable for those who prefer team-driven, applied or people-focused roles.
Consider applied R&D or cross-functional roles for more collaboration and impact.`,

  // Add other career details as needed
};

export default function NotRecommended() {
  const navigate = useNavigate();

  const personalityData = JSON.parse(localStorage.getItem("personalityTraits") || "{}");
  const E = personalityData.E || 0;
  const I = personalityData.I || 0;
  const S = personalityData.S || 0;
  const N = personalityData.N || 0;
  const T = personalityData.T || 0;
  const F = personalityData.F || 0;
  const J = personalityData.J || 0;
  const P = personalityData.P || 0;

  const getMBTI = () => {
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
          <div>Career Counsellor</div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Careers to Avoid for {mbti}</h2>

          {avoidList.length === 0 ? (
            <p style={{ color: "#374151" }}>No specific recommendations to avoid.</p>
          ) : (
            avoidList.map((career) => (
              <div key={career} style={{ background: "#fff7f7", padding: 12, borderRadius: 8, marginBottom: 12 }}>
                <h4 style={{ margin: 0 }}>{career}</h4>
                <p style={{ marginTop: 6, color: "#7f1d1d" }}>
                  {notRecommendedDetails[career] || "This career may be less suited because it conflicts with your dominant traits, requiring a different environment, pace, or interpersonal demands."}
                </p>
                <p style={{ marginTop: 6, color: "#6b7280", fontSize: 13 }}>
                  Recommendation: Consider alternatives that better match your strengths and preferred working style.
                </p>
              </div>
            ))
          )}

          <div style={{ marginTop: 18 }}>
            <button style={styles.primary} onClick={() => navigate("/assessment/graph-result")}>
              Back to Summary
            </button>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>© {new Date().getFullYear()} AI Career Counsellor</footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Inter, system-ui, Arial",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f6f9ff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "18px 28px",
    background: "#fff",
    borderBottom: "1px solid #e6eef9",
  },
  brand: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    background: "linear-gradient(135deg, #6c63ff, #00c2ff)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "#fff",
    padding: 28,
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
  },
  primary: {
    background: "#0b5ed7",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    padding: 18,
    color: "#6b7280",
  },
};
