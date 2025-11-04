// ...existing code...
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  { text: "I enjoy social activities more than solitude.", trait: "E" },
  { text: "I prefer to recharge by spending time alone.", trait: "I" },
  { text: "I focus on facts rather than possibilities.", trait: "S" },
  { text: "I enjoy imagining future possibilities.", trait: "N" },
  { text: "I base decisions mostly on logic and reason.", trait: "T" },
  { text: "I consider others' feelings when making decisions.", trait: "F" },
  { text: "I like having a planned and organized schedule.", trait: "J" },
  { text: "I prefer to keep options open and be spontaneous.", trait: "P" },
  { text: "I find being in a crowd energizing.", trait: "E" },
  { text: "I enjoy deep personal reflection.", trait: "I" },
  { text: "I trust my past experience.", trait: "S" },
  { text: "I like abstract ideas more than concrete facts.", trait: "N" },
  { text: "I am objective in assessing problems.", trait: "T" },
  { text: "Being empathetic is important to me.", trait: "F" },
  { text: "I like my life organized and settled.", trait: "J" },
  { text: "I adapt easily when plans change.", trait: "P" },
];

// 5-point Likert labels and numeric mapping (-2 .. +2)
const likert = [
  { label: "Strongly disagree", value: -2 },
  { label: "Disagree", value: -1 },
  { label: "Neutral", value: 0 },
  { label: "Agree", value: 1 },
  { label: "Strongly agree", value: 2 },
];

export default function PersonalityTest() {
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const navigate = useNavigate();

  const total = questions.length;
  const progress = Math.round(((currentQ) / total) * 100);

  const handleAnswer = (value) => {
    const trait = questions[currentQ].trait;
    // accumulate values (can be negative/positive)
    const newAnswers = { ...answers, [trait]: (answers[trait] || 0) + value };
    setAnswers(newAnswers);

    if (currentQ + 1 < total) {
      setCurrentQ(currentQ + 1);
    } else {
      // save final answers (keep full numeric range)
      localStorage.setItem("personalityTraits", JSON.stringify(newAnswers));
      navigate("/assessment/interest-test");
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>
            <div style={styles.title}>Personality Test</div>
            <div style={styles.subtitle}>Short MBTI-like assessment — 5-point scale</div>
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <div style={styles.progressWrap}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }} />
          </div>

          <h2 style={styles.question}>{questions[currentQ].text}</h2>

          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            {likert.map((l) => (
              <button
                key={l.value}
                onClick={() => handleAnswer(l.value)}
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  textAlign: "left",
                  border: "1px solid #e6eef9",
                  background: "#fff",
                  cursor: "pointer",
                }}
                aria-label={l.label}
              >
                <strong style={{ marginRight: 8 }}>{l.label}</strong>
                <span style={{ color: "#6b7280" }}>{l.value === 0 ? "Neutral" : l.value > 0 ? `+${l.value}` : `${l.value}`}</span>
              </button>
            ))}
          </div>

          <div style={styles.meta}>
            <span>Question {currentQ + 1} of {total}</span>
            <button
              style={styles.backBtn}
              onClick={() => setCurrentQ((s) => Math.max(0, s - 1))}
              disabled={currentQ === 0}
            >
              Back
            </button>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>© {new Date().getFullYear()} AI Career Counsellor</footer>
    </div>
  );
}

const styles = {
  page: { fontFamily: "Inter, system-ui, Arial", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f9ff" },
  header: { display: "flex", alignItems: "center", padding: "18px 28px", background: "#fff", borderBottom: "1px solid #e6eef9" },
  brand: { display: "flex", gap: 12, alignItems: "center" },
  logo: { width: 48, height: 48, borderRadius: 10, background: "linear-gradient(135deg,#6c63ff,#00c2ff)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  title: { fontWeight: 700 },
  subtitle: { fontSize: 12, color: "#6b7280" },
  container: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 28 },
  card: { width: "100%", maxWidth: 720, background: "#fff", padding: 28, borderRadius: 12, boxShadow: "0 12px 30px rgba(15,23,42,0.06)" },
  progressWrap: { height: 8, background: "#eef2ff", borderRadius: 6, overflow: "hidden", marginBottom: 18 },
  progressBar: { height: "100%", background: "#6366f1", transition: "width 200ms ease" },
  question: { fontSize: 20, margin: "8px 0 18px" },
  controls: { display: "flex", gap: 12 },
  primary: { background: "#0b5ed7", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 8, cursor: "pointer" },
  ghost: { background: "#fff", border: "1px solid #e5e7eb", padding: "10px 16px", borderRadius: 8, cursor: "pointer" },
  meta: { display: "flex", justifyContent: "space-between", marginTop: 18, color: "#6b7280", alignItems: "center" },
  backBtn: { background: "transparent", border: "none", color: "#374151", cursor: "pointer" },
  footer: { textAlign: "center", padding: 18, color: "#6b7280" },
};
// ...existing code...