import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/*
  Updated PieChart: enlarge SVG canvas with margins so outside labels (taglines)
  and leader lines are not clipped. Legend remains one-line per item.
*/

function PieChart({ data = [], size = 360, title }) {
  const [hovered, setHovered] = useState(null);

  // Increased margin for better spacing
  const margin = 120;
  const svgSize = size + margin * 2;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const r = size / 2 - 50;

  const total = data.reduce((s, d) => s + Math.max(0, d.value), 0) || 1;

  let acc = 0;
  const slices = data.map((d, i) => {
    const value = Math.max(0, d.value);
    const start = (acc / total) * Math.PI * 2;
    acc += value;
    const end = (acc / total) * Math.PI * 2;
    const mid = (start + end) / 2;
    const large = end - start > Math.PI ? 1 : 0;

    // Calculate points for pie slice
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);

    // Calculate points for label and leader line
    const labelRadius = r + 40;
    const labelX = cx + labelRadius * Math.cos(mid);
    const labelY = cy + labelRadius * Math.sin(mid);

    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    const percent = (value / total) * 100;

    return { ...d, path, mid, labelX, labelY, percent, i };
  });

  return (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      {/* Pie Chart */}
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        style={{ overflow: "visible" }}
      >
        {title && (
          <text x={cx} y={40} textAnchor="middle" fontSize={16} fontWeight={700} fill="#111827">
            {title}
          </text>
        )}

        {slices.map((s) => (
          <g
            key={s.label + s.i}
            onMouseEnter={() => setHovered(s.i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Pie slice */}
            <path 
              d={s.path} 
              fill={s.color} 
              stroke="#fff" 
              strokeWidth="2"
              opacity={s.value === 0 ? 0.25 : 1}
            />
            
            {/* Leader line and label */}
            <g opacity={s.value === 0 ? 0.5 : 1}>
              <line
                x1={cx + r * Math.cos(s.mid)}
                y1={cy + r * Math.sin(s.mid)}
                x2={s.labelX}
                y2={s.labelY}
                stroke="#9ca3af"
                strokeWidth="1"
              />
              <text
                x={s.labelX}
                y={s.labelY}
                textAnchor={s.labelX < cx ? "end" : "start"}
                fontSize={12}
                fill={hovered === s.i ? "#0b1724" : "#374151"}
                fontWeight={hovered === s.i ? 600 : 500}
                dy="0.3em"
              >
                {s.label} ({s.percent.toFixed(1)}%)
              </text>
            </g>
          </g>
        ))}

        {/* Center circle */}
        <circle cx={cx} cy={cy} r={r * 0.36} fill="#fff" stroke="rgba(15,23,42,0.04)" />
        <text x={cx} y={cy} textAnchor="middle" fontSize={13} fill="#6b7280" dy="-0.5em">
          Total traits:
        </text>
        <text x={cx} y={cy} textAnchor="middle" fontSize={16} fill="#0b5ed7" dy="1em" fontWeight={600}>
          {slices.length}
        </text>
      </svg>

      {/* Legend with detailed descriptions */}
      <div style={{ minWidth: 300, maxWidth: 360 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: "#111827" }}>
          Trait Details
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.map((d, idx) => (
            <div 
              key={d.label + idx} 
              style={{ 
                display: "flex", 
                gap: 12, 
                padding: "10px 12px", 
                borderRadius: 8, 
                background: "#f8fafc",
                borderLeft: `3px solid ${d.color}`
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>
                  {d.label}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
                  {d.tagline}
                </div>
              </div>
              <div style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>
                {((d.value / Math.max(1, data.reduce((s, x) => s + Math.max(0, x.value), 0))) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GraphResult() {
  const navigate = useNavigate();
  const personalityData = JSON.parse(localStorage.getItem("personalityTraits") || "{}");
  const interestData = JSON.parse(localStorage.getItem("interestTraits") || "{}");

  // Updated trait definitions with better organization
  const allTraits = useMemo(() => {
    // Personality traits (8)
    const personalityTraits = [
      { label: "Extraversion", value: personalityData.E || 0, color: "#6366f1", type: "Personality", tagline: "Sociable, energetic, outward-focused" },
      { label: "Introversion", value: personalityData.I || 0, color: "#818cf8", type: "Personality", tagline: "Reserved, reflective, inward-focused" },
      { label: "Sensing", value: personalityData.S || 0, color: "#06b6d4", type: "Personality", tagline: "Practical, detail-oriented, factual" },
      { label: "Intuition", value: personalityData.N || 0, color: "#22d3ee", type: "Personality", tagline: "Abstract, big-picture, theoretical" },
      { label: "Thinking", value: personalityData.T || 0, color: "#f97316", type: "Personality", tagline: "Logical, objective, analytical" },
      { label: "Feeling", value: personalityData.F || 0, color: "#fb923c", type: "Personality", tagline: "Empathetic, value-driven, harmonious" },
      { label: "Judging", value: personalityData.J || 0, color: "#10b981", type: "Personality", tagline: "Planned, structured, organized" },
      { label: "Perceiving", value: personalityData.P || 0, color: "#34d399", type: "Personality", tagline: "Flexible, spontaneous, adaptable" },
    ];

    // Interest traits (10) - Including new Research and Leadership traits
    const defaultInterests = [
      "Realistic", "Investigative", "Artistic", "Social", 
      "Enterprising", "Conventional", "Technical", "Creative"
    ];
    
    const interestTaglines = {
      Realistic: "Hands-on activities and practical problem-solving",
      Investigative: "Analysis, research, and scientific inquiry",
      Artistic: "Creative expression and aesthetic appreciation",
      Social: "Helping others and fostering relationships",
      Enterprising: "Business ventures and persuasive activities",
      Conventional: "Organization and systematic tasks",
      Technical: "Working with technology and systems",
      Creative: "Innovation and original thinking"
    };

    const interestColors = [
      "#ef4444", "#f59e0b", "#84cc16", "#06b6d4", 
      "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"
    ];
    
    const interestEntries = Object.entries(interestData);
    const interestTraits = interestEntries.length > 0 
      ? interestEntries.map(([key, value], idx) => ({
          label: key,
          value: value,
          color: interestColors[idx % interestColors.length],
          type: "Interest",
          tagline: interestTaglines[key] || `${key} focused activities`
        }))
      : defaultInterests.map((key, idx) => ({
          label: key,
          value: 0,
          color: interestColors[idx],
          type: "Interest",
          tagline: interestTaglines[key]
        }));

    // Combine all traits - now includes 18 total (8 personality + 10 interest)
    return [...personalityTraits, ...interestTraits.slice(0, 8)];
  }, [personalityData, interestData]);

  const handleRestart = () => {
    localStorage.removeItem("personalityTraits");
    localStorage.removeItem("interestTraits");
    navigate("/assessment/personality-test");
  };

  function getMBTI() {
    const E = personalityData.E || 0;
    const I = personalityData.I || 0;
    const S = personalityData.S || 0;
    const N = personalityData.N || 0;
    const T = personalityData.T || 0;
    const F = personalityData.F || 0;
    const J = personalityData.J || 0;
    const P = personalityData.P || 0;
    return (E >= I ? "E" : "I") + (S >= N ? "S" : "N") + (T >= F ? "T" : "F") + (J >= P ? "J" : "P");
  }


  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>
            <div style={styles.title}>Assessment Results</div>
            <div style={styles.subtitle}>Personality & interests</div>
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <div style={styles.topRow}>
            <div>
              <h2 style={{ margin: 0 }}>Your Complete Profile</h2>
              <div style={{ color: "#0b5ed7", marginTop: 6 }}>MBTI: {getMBTI()}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigate("/assessment/suitable-careers")} style={styles.smallBtn}>Recommended</button>
              <button onClick={() => navigate("/assessment/not-recommended")} style={styles.smallBtnGhost}>Avoid</button>
              <button onClick={() => navigate("/assessment/report")} style={styles.smallBtnReport}>Report</button>
              <button onClick={handleRestart} style={styles.smallBtnAlt}>Retake</button>
            </div>
          </div>

          <div style={styles.chartContainer}>
            <PieChart 
              data={allTraits} 
              size={720}
              title="Complete Profile Analysis (16 Traits)" 
            />
          </div>

          <div style={styles.legendContainer}>
            <div style={styles.legendSection}>
              <h3 style={styles.legendTitle}>
                Personality Traits (MBTI Based)
              </h3>
              <div style={styles.legendGrid}>
                {allTraits.slice(0, 8).map((trait, idx) => (
                  <div key={trait.label} style={styles.legendItem}>
                    <span style={{...styles.legendColor, backgroundColor: trait.color}} />
                    <div style={styles.legendText}>
                      <strong>{trait.label}</strong>
                      <span style={styles.legendTagline}>{trait.tagline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.legendSection}>
              <h3 style={styles.legendTitle}>
                Interest Traits (8 Categories)
              </h3>
              <div style={styles.legendGrid}>
                {allTraits.slice(8).map((trait, idx) => (
                  <div key={trait.label} style={styles.legendItem}>
                    <span style={{...styles.legendColor, backgroundColor: trait.color}} />
                    <div style={styles.legendText}>
                      <strong>{trait.label}</strong>
                      <span style={styles.legendTagline}>{trait.tagline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Updated styles
const styles = {
  page: { fontFamily: "Inter, system-ui, Arial", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f6f9ff" },
  header: { display: "flex", alignItems: "center", padding: "18px 28px", background: "#fff", borderBottom: "1px solid #e6eef9" },
  brand: { display: "flex", gap: 12, alignItems: "center" },
  logo: { width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#6c63ff,#00c2ff)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  title: { fontWeight: 700 },
  subtitle: { fontSize: 12, color: "#6b7280" },
  container: { flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 28 },
  card: { width: "100%", maxWidth: 1300, background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 12px 30px rgba(15,23,42,0.06)" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  smallBtn: { background: "#0b5ed7", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" },
  smallBtnGhost: { background: "#fff", color: "#374151", border: "1px solid #e5e7eb", padding: "8px 12px", borderRadius: 8 },
  smallBtnReport: { background: "#10b981", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" },
  smallBtnPrint: { background: "#f59e0b", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" },
  smallBtnAlt: { background: "#6c63ff", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" },

  // ✅ UPDATED TO STACK CHARTS VERTICALLY
  twoColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  // ✅ MORE SPACE AROUND EACH CHART
  chartBlock: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 0 50px',
    position: 'relative',
    overflow: 'visible' // Ensure labels aren't clipped
  },
  legendContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    padding: '0 20px',
    marginBottom: '30px'
  },
  legendSection: {
    background: '#f8fafc',
    borderRadius: '12px',
    padding: '24px',
    height: 'fit-content'
  },
  legendTitle: {
    margin: '0 0 20px',
    fontSize: '16px',
    color: '#111827',
    fontWeight: '600',
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: '8px'
  },
  legendGrid: {
    display: 'grid',
    gap: '12px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 3px 6px rgba(0,0,0,0.08)'
    }
  },
  legendColor: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    flexShrink: 0,
    marginTop: '2px'
  },
  legendText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  legendTagline: {
    fontSize: '13px',
    color: '#6b7280',
    lineHeight: '1.4'
  }
};
