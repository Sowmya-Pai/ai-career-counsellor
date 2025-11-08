import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  // E vs I questions
  { text: "I enjoy social activities more than solitude.", trait: "E" },
  { text: "I prefer to recharge by spending time alone.", trait: "I" },
  { text: "I find it easy to start conversations with new people.", trait: "E" },
  { text: "I need quiet time to concentrate.", trait: "I" },
  { text: "I enjoy being the center of attention.", trait: "E" },
  { text: "I prefer working independently.", trait: "I" },

  // S vs N questions
  { text: "I focus on facts rather than possibilities.", trait: "S" },
  { text: "I enjoy imagining future possibilities.", trait: "N" },
  { text: "I trust practical experience over theories.", trait: "S" },
  { text: "I enjoy thinking about abstract concepts.", trait: "N" },
  { text: "I prefer concrete details to theoretical discussions.", trait: "S" },
  { text: "I like exploring different ways of doing things.", trait: "N" },

  // T vs F questions
  { text: "I base decisions mostly on logic and reason.", trait: "T" },
  { text: "I consider others' feelings when making decisions.", trait: "F" },
  { text: "I value truth over tact.", trait: "T" },
  { text: "I naturally show empathy to others.", trait: "F" },
  { text: "I prefer objective criteria over personal values.", trait: "T" },
  { text: "I consider harmony and emotions important in decisions.", trait: "F" },

  // J vs P questions
  { text: "I like having a planned and organized schedule.", trait: "J" },
  { text: "I prefer to keep options open and be spontaneous.", trait: "P" },
  { text: "I enjoy following a routine.", trait: "J" },
  { text: "I like adapting to new situations.", trait: "P" },
  { text: "I prefer clear structure and guidelines.", trait: "J" },
  { text: "I enjoy flexibility and spontaneity.", trait: "P" }
];

const likert = [
  { label: "Strongly disagree", value: -2 },
  { label: "Disagree", value: -1 },
  { label: "Neutral", value: 0 },
  { label: "Agree", value: 1 },
  { label: "Strongly agree", value: 2 }
];

export default function PersonalityTest() {
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const navigate = useNavigate();
  const total = questions.length;

  const handleAnswer = (value) => {
    const trait = questions[currentQ].trait;
    const prevScore = answers[trait] || 0;
    const newAnswers = { ...answers, [trait]: prevScore + value };
    setAnswers(newAnswers);

    if (currentQ + 1 < total) {
      setCurrentQ(currentQ + 1);
    } else {
      localStorage.setItem("personalityTraits", JSON.stringify(newAnswers));
      navigate("/assessment/interest-test");
    }
  };

  const progress = ((currentQ + 1) / total) * 100;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>
            <div style={styles.title}>Personality Assessment</div>
            <div style={styles.subtitle}>Step 1 of 2</div>
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <div style={styles.progressWrap}>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>
            <div style={styles.progressText}>Question {currentQ + 1} of {total}</div>
          </div>

          <h2 style={styles.question}>{questions[currentQ].text}</h2>

          <div style={styles.options}>
            {likert.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                style={styles.option}
                onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.background = '#fff'}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Inter, system-ui, Arial",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f6f9ff"
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "18px 28px",
    background: "#fff",
    borderBottom: "1px solid #e6eef9"
  },
  brand: {
    display: "flex",
    gap: 12,
    alignItems: "center"
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    background: "linear-gradient(135deg,#6c63ff,#00c2ff)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700
  },
  title: {
    fontWeight: 700
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280"
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 28
  },
  card: {
    width: "100%",
    maxWidth: 640,
    background: "#fff",
    padding: 28,
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(15,23,42,0.06)"
  },
  progressWrap: {
    marginBottom: 24
  },
  progressBar: {
    height: 6,
    background: "#e5e7eb",
    borderRadius: 3,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    background: "#0b5ed7",
    transition: "width 0.3s ease"
  },
  progressText: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 8
  },
  question: {
    fontSize: 20,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 24,
    lineHeight: 1.4
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  option: {
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    background: "#fff",
    cursor: "pointer",
    fontSize: 15,
    textAlign: "left",
    transition: "all 0.2s ease",
    color: "#374151"
  }
};
