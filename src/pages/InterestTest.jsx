// ...existing code...
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  { text: "I like solving mathematical or scientific problems.", trait: "Investigative" },
  { text: "I enjoy creating art, music, or writing.", trait: "Artistic" },
  { text: "I enjoy helping others learn or grow.", trait: "Social" },
  { text: "I like leading and persuading groups.", trait: "Enterprising" },
  { text: "I like fixing machines or making things work.", trait: "Realistic" },
  { text: "I prefer organizing data or finances.", trait: "Conventional" },
  { text: "I enjoy designing and building structures.", trait: "Realistic" },
  { text: "I am curious and enjoy research.", trait: "Investigative" },
  { text: "I like planning events or social gatherings.", trait: "Enterprising" },
  { text: "I enjoy working with animals or nature.", trait: "Realistic" },
];

const likert = [
  { label: "Strongly dislike", value: 0 },
  { label: "Dislike", value: 1 },
  { label: "Neutral", value: 2 },
  { label: "Like", value: 3 },
  { label: "Strongly like", value: 4 },
];

export default function InterestTest() {
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const navigate = useNavigate();

  const total = questions.length;
  const progress = Math.round(((currentQ) / total) * 100);

  const handleAnswer = (value) => {
    const trait = questions[currentQ].trait;
    const newAnswers = { ...answers, [trait]: (answers[trait] || 0) + value };
    setAnswers(newAnswers);

    if (currentQ + 1 < total) {
      setCurrentQ(currentQ + 1);
    } else {
      localStorage.setItem("interestTraits", JSON.stringify(newAnswers));
      navigate("/assessment/graph-result");
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>
            <div style={styles.title}>Interest Test</div>
            <div style={styles.subtitle}>5-point scale to capture intensity</div>
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
              >
                <strong style={{ marginRight: 8 }}>{l.label}</strong>
                <span style={{ color: "#6b7280" }}>{l.value}</span>
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

// ...existing styles (unchanged) ...
const styles = {
  page: { fontFamily: "Inter, system-ui, Arial", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f9ff" },
  header: { display: "flex", alignItems: "center", padding: "18px 28px", background: "#fff", borderBottom: "1px solid #e6eef9" },
  brand: { display: "flex", gap: 12, alignItems: "center" },
  logo: { width: 48, height: 48, borderRadius: 10, background: "linear-gradient(135deg,#6c63ff,#00c2ff)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  title: { fontWeight: 700 },
  subtitle: { fontSize: 12, color: "#6b7280" },
  container: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 28 },
  card: { width: "100%", maxWidth: 720, background: "#fff", padding: 28, borderRadius: 12, boxShadow: "0 12px 30px rgba(15,23,42,0.06)" },
  progressWrap: { height: 8, background: "#ecfdf5", borderRadius: 6, overflow: "hidden", marginBottom: 18 },
  progressBar: { height: "100%", background: "#059669", transition: "width 200ms ease" },
  question: { fontSize: 20, margin: "8px 0 18px" },
  controls: { display: "flex", gap: 12 },
  primary: { background: "#10b981", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 8, cursor: "pointer" },
  ghost: { background: "#fff", border: "1px solid #e5e7eb", padding: "10px 16px", borderRadius: 8, cursor: "pointer" },
  meta: { display: "flex", justifyContent: "space-between", marginTop: 18, color: "#6b7280", alignItems: "center" },
  backBtn: { background: "transparent", border: "none", color: "#374151", cursor: "pointer" },
  footer: { textAlign: "center", padding: 18, color: "#6b7280" },
};
// ...existing code...