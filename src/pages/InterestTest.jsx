import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";

const questions = [
  // Realistic
  { text: "I enjoy working with tools and machines.", trait: "Realistic" },
  { text: "I like fixing mechanical things.", trait: "Realistic" },
  { text: "I prefer hands-on activities.", trait: "Realistic" },
  { text: "I enjoy building physical things.", trait: "Realistic" },

  // Investigative
  { text: "I like solving complex problems.", trait: "Investigative" },
  { text: "I enjoy scientific research.", trait: "Investigative" },
  { text: "I like analyzing data and information.", trait: "Investigative" },
  { text: "I enjoy understanding how things work.", trait: "Investigative" },

  // Artistic
  { text: "I enjoy creative activities.", trait: "Artistic" },
  { text: "I like expressing myself through art.", trait: "Artistic" },
  { text: "I enjoy designing things.", trait: "Artistic" },
  { text: "I appreciate aesthetic qualities.", trait: "Artistic" },

  // Social
  { text: "I enjoy teaching others.", trait: "Social" },
  { text: "I like helping people solve their problems.", trait: "Social" },
  { text: "I'm good at understanding others' feelings.", trait: "Social" },
  { text: "I enjoy group activities.", trait: "Social" },

  // Enterprising
  { text: "I like leading projects.", trait: "Enterprising" },
  { text: "I enjoy persuading others.", trait: "Enterprising" },
  { text: "I'm good at selling ideas or products.", trait: "Enterprising" },
  { text: "I like taking initiative.", trait: "Enterprising" },

  // Conventional
  { text: "I enjoy organizing information.", trait: "Conventional" },
  { text: "I like following clear procedures.", trait: "Conventional" },
  { text: "I'm good at paying attention to details.", trait: "Conventional" },
  { text: "I prefer structured environments.", trait: "Conventional" },

  // Research (new trait)
  { text: "I enjoy conducting in-depth research.", trait: "Research" },
  { text: "I like exploring and discovering new information.", trait: "Research" },
  { text: "I enjoy academic or scholarly activities.", trait: "Research" },
  { text: "I like investigating and finding answers.", trait: "Research" },

  // Leadership (new trait)
  { text: "I enjoy taking charge of situations.", trait: "Leadership" },
  { text: "I like motivating and inspiring others.", trait: "Leadership" },
  { text: "I'm comfortable making important decisions.", trait: "Leadership" },
  { text: "I enjoy developing and executing strategies.", trait: "Leadership" }
];

const likert = [
  { label: "Strongly dislike", value: 0 },
  { label: "Dislike", value: 1 },
  { label: "Neutral", value: 2 },
  { label: "Like", value: 3 },
  { label: "Strongly like", value: 4 }
];

export default function InterestTest() {
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
      localStorage.setItem("interestTraits", JSON.stringify(newAnswers));
      navigate("/assessment/graph-result");
    }
  };

  const progress = ((currentQ + 1) / total) * 100;

  const pageBackground = isDark
    ? "linear-gradient(135deg, rgba(2,6,23,0.92), rgba(30,58,138,0.84)), url('https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1800&q=70')"
    : "linear-gradient(135deg, rgba(226,232,240,0.92), rgba(191,219,254,0.85)), url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=70')";

  const cardStyle = {
    ...styles.card,
    background: isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.95)",
    border: isDark ? "1px solid rgba(148,163,184,0.2)" : "1px solid rgba(226,232,240,0.85)",
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
    background: isDark ? "linear-gradient(135deg,#f97316,#fb7185)" : "linear-gradient(135deg,#f59e0b,#ef4444)"
  };

  const questionStyle = {
    ...styles.question,
    color: isDark ? "#e2e8f0" : "#111827"
  };

  const baseOptionStyle = {
    ...styles.option,
    background: isDark ? "rgba(15,23,42,0.6)" : "#fff",
    color: isDark ? "#f8fafc" : "#374151",
    border: isDark ? "1px solid rgba(148,163,184,0.25)" : "1px solid #e5e7eb",
    boxShadow: isDark ? "0 8px 18px rgba(15,23,42,0.45)" : "0 6px 18px rgba(15,23,42,0.08)"
  };

  const handleHover = (event, isEntering) => {
    if (isEntering) {
      event.currentTarget.style.background = isDark ? "rgba(249,115,22,0.25)" : "#fef3c7";
      event.currentTarget.style.transform = "translateY(-2px)";
      event.currentTarget.style.boxShadow = isDark
        ? "0 12px 24px rgba(244,114,182,0.28)"
        : "0 10px 24px rgba(248,181,0,0.3)";
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
            <div style={{ ...styles.title, color: isDark ? "#f8fafc" : styles.title.color }}>Interest Assessment</div>
            <div style={{ ...styles.subtitle, color: isDark ? "#cbd5f5" : "#64748b" }}>Step 2 of 2</div>
          </div>
        </div>
        <button
          style={{
            ...styles.homeButton,
            background: isDark ? "linear-gradient(135deg,#f97316,#fb7185)" : "linear-gradient(135deg,#f97316,#facc15)",
            boxShadow: isDark ? "0 12px 24px rgba(249,115,22,0.35)" : "0 10px 20px rgba(249,115,22,0.28)"
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
  // Same styles object as PersonalityTest.jsx
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
