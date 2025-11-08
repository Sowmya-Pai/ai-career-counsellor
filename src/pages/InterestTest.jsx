import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>
            <div style={styles.title}>Interest Assessment</div>
            <div style={styles.subtitle}>Step 2 of 2</div>
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
