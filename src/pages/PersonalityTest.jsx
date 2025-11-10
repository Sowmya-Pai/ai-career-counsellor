import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";

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
  const { isDark } = useTheme();
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

  const pageBackground = isDark
    ? "linear-gradient(135deg, rgba(2,6,23,0.92), rgba(30,58,138,0.84)), url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=70')"
    : "linear-gradient(135deg, rgba(226,232,240,0.92), rgba(191,219,254,0.85)), url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=70')";

  const cardStyle = {
    ...styles.card,
    background: isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.95)",
    border: isDark ? "1px solid rgba(148,163,184,0.2)" : "1px solid rgba(226,232,240,0.8)",
    boxShadow: isDark ? "0 18px 40px rgba(8,15,40,0.55)" : "0 20px 40px rgba(15,23,42,0.12)",
    color: isDark ? "#f8fafc" : "#111827",
    backdropFilter: "blur(8px)"
  };

  const progressBarStyle = {
    ...styles.progressBar,
    background: isDark ? "rgba(51,65,85,0.6)" : "#e5e7eb"
  };

  const progressFillStyle = {
    ...styles.progressFill,
    background: isDark ? "linear-gradient(135deg,#38bdf8,#6366f1)" : "linear-gradient(135deg,#0b5ed7,#38bdf8)"
  };

  const questionStyle = {
    ...styles.question,
    color: isDark ? "#e2e8f0" : "#111827"
  };

  const baseOptionStyle = {
    ...styles.option,
    background: isDark ? "rgba(15,23,42,0.6)" : "#fff",
    color: isDark ? "#e2e8f0" : "#374151",
    border: isDark ? "1px solid rgba(148,163,184,0.25)" : "1px solid #e5e7eb",
    boxShadow: isDark ? "0 8px 18px rgba(15,23,42,0.45)" : "0 6px 18px rgba(15,23,42,0.08)"
  };

  const handleHover = (event, isEntering) => {
    if (isEntering) {
      event.currentTarget.style.background = isDark ? "rgba(59,130,246,0.22)" : "#f1f5f9";
      event.currentTarget.style.transform = "translateY(-2px)";
      event.currentTarget.style.boxShadow = isDark
        ? "0 12px 24px rgba(37,99,235,0.35)"
        : "0 10px 22px rgba(148,163,184,0.24)";
    } else {
      event.currentTarget.style.background = baseOptionStyle.background;
      event.currentTarget.style.transform = "translateY(0)";
      event.currentTarget.style.boxShadow = baseOptionStyle.boxShadow;
    }
  };

  return (
    <div
      style={{
        ...styles.page,
        background: pageBackground,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        color: isDark ? "#f8fafc" : "#0f172a"
      }}
    >
      <header style={{
        ...styles.header,
        background: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.9)",
        borderBottom: isDark ? "1px solid rgba(148,163,184,0.3)" : "1px solid rgba(226,232,240,0.9)",
        backdropFilter: "blur(12px)"
      }}>
        <div style={styles.brand}>
          <div style={{
            ...styles.logo,
            boxShadow: isDark ? "0 10px 20px rgba(99,102,241,0.35)" : styles.logo.boxShadow
          }}>AI</div>
          <div>
            <div style={{ ...styles.title, color: isDark ? "#f8fafc" : styles.title.color }}>Personality Assessment</div>
            <div style={{ ...styles.subtitle, color: isDark ? "#cbd5f5" : "#64748b" }}>Step 1 of 2</div>
          </div>
        </div>
        <button
          style={{
            ...styles.homeButton,
            background: isDark ? "linear-gradient(135deg,#38bdf8,#6366f1)" : styles.homeButton.background,
            boxShadow: isDark ? "0 10px 22px rgba(59,130,246,0.35)" : "0 8px 18px rgba(11,94,215,0.28)"
          }}
          onClick={() => navigate("/home")}
        >
          Home
        </button>
      </header>

      <main style={styles.container}>
        <div style={cardStyle}>
          <div style={styles.progressWrap}>
            <div style={progressBarStyle}>
              <div style={{ ...progressFillStyle, width: `${progress}%` }} />
            </div>
            <div style={{ ...styles.progressText, color: isDark ? "#cbd5f5" : "#6b7280" }}>
              Question {currentQ + 1} of {total}
            </div>
          </div>

          <h2 style={questionStyle}>{questions[currentQ].text}</h2>

          <div style={styles.options}>
            {likert.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                style={baseOptionStyle}
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
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
    justifyContent: "space-between",
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
  homeButton: {
    background: "#0b5ed7",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.2s ease"
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
