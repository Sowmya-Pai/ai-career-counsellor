// ...existing code...
import React from "react";
import { useNavigate } from "react-router-dom";

const mbtiCareers = {
  INTJ: ["Scientist", "Engineer", "Architect", "Software Developer"],
  INTP: ["Analyst", "Researcher", "Programmer", "Philosopher"],
  ENTJ: ["Executive", "Manager", "Entrepreneur", "Lawyer"],
  ENTP: ["Inventor", "Consultant", "Journalist", "Marketer"],
  INFJ: ["Counselor", "Psychologist", "Writer", "Teacher"],
  INFP: ["Artist", "Counselor", "Writer", "Social Worker"],
  ENFJ: ["Teacher", "Leader", "HR Manager", "Scout Leader"],
  ENFP: ["Marketing Specialist", "Teacher", "Actor", "Counselor"],
  ISTJ: ["Accountant", "Auditor", "Police Officer", "Military"],
  ISFJ: ["Nurse", "Healthcare Provider", "Librarian", "Administrator"],
  ESTJ: ["Project Manager", "Banker", "Executive", "Judge"],
  ESFJ: ["Nurse", "Teacher", "Social Worker", "Event Planner"],
  ISTP: ["Engineer", "Mechanic", "Pilot", "Detective"],
  ISFP: ["Designer", "Chef", "Artist", "Physical Therapist"],
  ESTP: ["Sales", "Detective", "Entrepreneur", "Paramedic"],
  ESFP: ["Performer", "Guide", "Event Coordinator", "Fitness Trainer"],
};

// Detailed descriptions for recommended careers
const careerDetails = {
  "Scientist": "Scientists investigate questions using the scientific method. Your analytical and future-focused thinking makes you suited to roles that require hypothesis-driven work, experimentation, and long-term research planning.",
  "Engineer": "Engineering fits problem-solvers who convert ideas into practical systems. Your preference for logical structure and designing solutions means you can plan, prototype and iterate effectively.",
  "Architect": "Architecture requires a blend of creativity and technical discipline. You will excel if you can visualize systems, plan at multiple scales and follow through to delivery.",
  "Software Developer": "Software development rewards logical problem solving, structure, and abstraction. Strong conceptual thinking and patience with iterative debugging align well with this career.",
  "Analyst": "Analysts turn data into actionable insight. If you enjoy investigation, patterns, and explaining findings clearly, this role suits your strengths.",
  "Researcher": "Research roles let you dig deep into topics and contribute new knowledge. Your curiosity and tolerance for long investigative efforts are an asset.",
  "Programmer": "Programming is a natural fit when you like designing logical solutions, writing clear code, and iterating on systems to improve reliability and performance.",
  "Philosopher": "Philosophy suits reflective, abstract thinkers who enjoy exploring concepts, constructing arguments, and understanding frameworks of thought.",
  "Executive": "Executive roles require strategic thinking, decisiveness, and leading teams. If you prefer structure, planning and influencing outcomes, this path fits.",
  "Manager": "Management suits those who can organize people and processes, set goals, and measure progress. Leadership and comfort with responsibility are required.",
  "Entrepreneur": "Entrepreneurship rewards initiative, vision, and risk tolerance. If you enjoy building from zero, experimenting, and motivating others, this is a match.",
  "Lawyer": "Law calls for structured argument, attention to precedent and persuasive communication. Logical analysis and strategic planning are core skills here.",
  "Counselor": "Counseling requires empathy, active listening, and long-term client support. Strong feeling-orientation and sensitivity to others are helpful.",
  "Psychologist": "Psychology combines scientific methods with deep empathy and observation — suited to people who want to apply research to human behavior.",
  "Writer": "Writing leverages reflective and expressive strengths. You can translate ideas into narratives, explanations, or persuasive content.",
  "Teacher": "Teaching fits those who enjoy explaining concepts, structuring lessons, and supporting learners through growth.",
  "Artist": "Artistic careers reward originality, emotional expression, and experimentation. If creativity motivates you, this path is appropriate.",
  "Social Worker": "Social work is for people who want to support individuals in practical, emotional, and systemic ways — patience and compassion are essential.",
  "Marketing Specialist": "Marketing combines creativity and persuasion with data-driven decisions. If you like storytelling and influencing audiences, this suits you.",
  "Accountant": "Accounting needs precision, structure, and reliability — clear systems and consistent processes are valued.",
  "Auditor": "Auditing requires attention to detail, objectivity, and the ability to follow rules and assess compliance accurately.",
  "Nurse": "Nursing is hands-on care requiring empathy, reliability, and the ability to work under pressure while following protocols.",
  "Healthcare Provider": "Healthcare roles demand attention to detail, compassion, and long-term commitment to patient outcomes.",
  "Designer": "Design roles fit those who blend creativity with usability and craft. Empathy for users and iterative prototyping are key strengths.",
  "Chef": "Culinary careers combine craft, timing, and creativity. Practical skill, attention to quality and endurance are needed.",
  "Detective": "Detective work appeals to problem solvers who can synthesize evidence, interview witnesses and follow leads systematically.",
  "Sales": "Sales rewards persuasive communication, resilience and ability to form relationships and close deals.",
  "Performer": "Performance careers suit expressive, social people who thrive on stage and connecting with audiences.",
  "Paramedic": "Paramedics need calm under pressure, quick decision-making, and technical care skills for urgent situations.",
  "Fitness Trainer": "Fitness careers suit people who motivate others, design programs and enjoy hands-on coaching and measurable improvement.",
};

export default function SuitableCareers() {
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
  const careers = mbtiCareers[mbti] || ["Career options will be generated here"];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>
            <div style={styles.title}>Recommended Careers</div>
            <div style={styles.subtitle}>Based on your personality</div>
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Recommended Careers for {mbti}</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {careers.map((c) => (
              <div key={c} style={{ padding: 12, borderRadius: 8, background: "#f8fafc" }}>
                <h4 style={{ margin: 0 }}>{c}</h4>
                <p style={{ marginTop: 6, color: "#374151" }}>
                  {careerDetails[c] || "This career matches core strengths detected in your profile."}
                </p>
                <p style={{ marginTop: 6, color: "#6b7280", fontSize: 13 }}>
                  Why this fits: {careerDetails[c] ? "Your profile shows strengths that align with the role: problem solving, planning, or empathy as required." : "This suggestion matches the dominant traits detected in your assessment."}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18 }}>
            <button style={styles.primary} onClick={() => navigate("/assessment/graph-result")}>Back to Summary</button>
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
  list: { listStyle: "disc inside", paddingLeft: 16, color: "#0b3a66" },
  item: { marginBottom: 10 },
  primary: { background: "#0b5ed7", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 8, cursor: "pointer" },
  footer: { textAlign: "center", padding: 18, color: "#6b7280" },
};
// ...existing code...