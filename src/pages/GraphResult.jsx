// ...existing code...
import React from "react";
import { useNavigate } from "react-router-dom";

function PieChart({ data, size = 260 }) {
  // data: [{label, value, color}]
  const total = data.reduce((s, d) => s + Math.max(0, d.value), 0) || 1;
  let cumulative = 0;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;

  const slices = data.map((d) => {
    const start = (cumulative / total) * Math.PI * 2;
    cumulative += Math.max(0, d.value);
    const end = (cumulative / total) * Math.PI * 2;
    const large = end - start > Math.PI ? 1 : 0;

    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);

    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    return { ...d, path, percent: ((d.value / total) * 100).toFixed(0) };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Pie chart">
      {slices.map((s, i) => <path key={s.label + i} d={s.path} fill={s.color} stroke="#fff" strokeWidth="1" />)}
    </svg>
  );
}

export default function GraphResult() {
  const navigate = useNavigate();
  const personalityData = JSON.parse(localStorage.getItem("personalityTraits")) || {};
  const interestData = JSON.parse(localStorage.getItem("interestTraits")) || {};

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

  const mbtiType = getMBTI();

  // Create slices for the 8 personality trait scores (show distribution)
  const barsData = [
    { label: "Extraversion", value: Math.max(0, personalityData.E || 0), color: "#6366f1" },
    { label: "Introversion", value: Math.max(0, personalityData.I || 0), color: "#a78bfa" },
    { label: "Sensing", value: Math.max(0, personalityData.S || 0), color: "#06b6d4" },
    { label: "Intuition", value: Math.max(0, personalityData.N || 0), color: "#7dd3fc" },
    { label: "Thinking", value: Math.max(0, personalityData.T || 0), color: "#f97316" },
    { label: "Feeling", value: Math.max(0, personalityData.F || 0), color: "#fb7185" },
    { label: "Judging", value: Math.max(0, personalityData.J || 0), color: "#10b981" },
    { label: "Perceiving", value: Math.max(0, personalityData.P || 0), color: "#34d399" },
  ];

  // Interest slices (top categories)
  const interestEntries = Object.entries(interestData);
  const interestSlices = interestEntries.map(([k, v], i) => ({
    label: k,
    value: v,
    color: ["#ef4444", "#f59e0b", "#10b981", "#06b6d4", "#6366f1"][i % 5],
  }));

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>
            <div style={styles.title}>Results</div>
            <div style={styles.subtitle}>Personality & interest summary</div>
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ marginTop: 0, marginBottom: 6 }}>Your Personality Summary</h2>
          <h3 style={{ color: "#0b5ed7", marginTop: 0, marginBottom: 18 }}>MBTI Type: {mbtiType}</h3>

          <section style={styles.summaryGrid}>
            <div style={styles.chartWrap}>
              <div style={styles.chartInner}>
                <PieChart data={barsData} />
                <div style={styles.chartLabel}>Personality distribution</div>
              </div>

              <div style={styles.smallChart}>
                {interestSlices.length === 0 ? (
                  <div style={{ color: "#6b7280", paddingTop: 8 }}>No interest data</div>
                ) : (
                  <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
                    <PieChart data={interestSlices} size={120} />
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>Interests</div>
                      <ul style={{ paddingLeft: 18, margin: 0 }}>
                        {interestSlices.sort((a,b)=>b.value-a.value).map(s => (
                          <li key={s.label} style={{ marginBottom: 6 }}><strong>{s.label}</strong>: {s.value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.details}>
              <h4 style={{ marginTop: 0 }}>Top personality signals</h4>
              <ul style={{ paddingLeft: 18, marginTop: 8 }}>
                {barsData
                  .filter(b => b.value !== 0)
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 5)
                  .map((b) => (
                    <li key={b.label} style={{ marginBottom: 10 }}>
                      <strong>{b.label}</strong>
                      <div style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>
                        Score: {b.value} — {Math.round((b.value / (barsData.reduce((s, x) => s + x.value, 0) || 1)) * 100)}%
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </section>

          <div style={styles.actions}>
            <button style={styles.primary} onClick={() => navigate("/assessment/suitable-careers")}>See Recommended Careers</button>
            <button style={styles.ghost} onClick={() => navigate("/assessment/not-recommended")}>See Careers to Avoid</button>
            <button style={{ ...styles.primary, ...styles.reportBtn }} onClick={() => navigate("/report")}>Download / Print Report</button>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>© {new Date().getFullYear()} AI Career Counsellor</footer>
    </div>
  );
}

const styles = {
  page: { fontFamily: "Inter, system-ui, Arial", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f9ff" },
  header: { display: "flex", alignItems: "center", padding: "20px 28px", background: "#fff", borderBottom: "1px solid #e6eef9" },
  brand: { display: "flex", gap: 14, alignItems: "center" },
  logo: { width: 52, height: 52, borderRadius: 10, background: "linear-gradient(135deg,#6c63ff,#00c2ff)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  title: { fontWeight: 700, fontSize: 18 },
  subtitle: { fontSize: 13, color: "#6b7280" },
  container: { flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 32 },
  card: { width: "100%", maxWidth: 980, background: "#fff", padding: 32, borderRadius: 14, boxShadow: "0 14px 40px rgba(15,23,42,0.06)" },
  summaryGrid: { display: "grid", gridTemplateColumns: "320px 1fr", gap: 28, alignItems: "start" },
  chartWrap: { display: "flex", flexDirection: "column", gap: 18, alignItems: "center" },
  chartInner: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 8 },
  chartLabel: { marginTop: 6, color: "#374151", fontSize: 13 },
  smallChart: { marginTop: 8, width: "100%" },
  details: { paddingLeft: 6 },
  actions: { display: "flex", gap: 12, justifyContent: "center", marginTop: 28 },
  primary: { background: "#0b5ed7", color: "#fff", border: "none", padding: "10px 18px", borderRadius: 8, cursor: "pointer", minWidth: 160 },
  ghost: { background: "#fff", border: "1px solid #e5e7eb", padding: "10px 18px", borderRadius: 8, cursor: "pointer", minWidth: 160 },
  reportBtn: { background: "#10b981", minWidth: 200 },
  footer: { textAlign: "center", padding: 18, color: "#6b7280", marginTop: 18 },
};
// ...existing code...