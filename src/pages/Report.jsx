import React, { useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// PieChart component from GraphResult
function PieChart({ data = [], size = 360, title }) {
  const [hovered, setHovered] = useState(null);
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

    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);

    const labelRadius = r + 40;
    const labelX = cx + labelRadius * Math.cos(mid);
    const labelY = cy + labelRadius * Math.sin(mid);

    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    const percent = (value / total) * 100;

    return { ...d, path, mid, labelX, labelY, percent, i };
  });

  return (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start", justifyContent: "center", marginBottom: 30 }}>
      <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} style={{ overflow: "visible" }}>
        {title && (
          <text x={cx} y={40} textAnchor="middle" fontSize={16} fontWeight={700} fill="#111827">
            {title}
          </text>
        )}
        {slices.map((s) => (
          <g key={s.label + s.i} onMouseEnter={() => setHovered(s.i)} onMouseLeave={() => setHovered(null)} style={{ cursor: "pointer" }}>
            <path d={s.path} fill={s.color} stroke="#fff" strokeWidth="2" opacity={s.value === 0 ? 0.25 : 1} />
            <g opacity={s.value === 0 ? 0.5 : 1}>
              <line x1={cx + r * Math.cos(s.mid)} y1={cy + r * Math.sin(s.mid)} x2={s.labelX} y2={s.labelY} stroke="#9ca3af" strokeWidth="1" />
              <text x={s.labelX} y={s.labelY} textAnchor={s.labelX < cx ? "end" : "start"} fontSize={12} fill={hovered === s.i ? "#0b1724" : "#374151"} fontWeight={hovered === s.i ? 600 : 500} dy="0.3em">
                {s.label} ({s.percent.toFixed(1)}%)
              </text>
            </g>
          </g>
        ))}
        <circle cx={cx} cy={cy} r={r * 0.36} fill="#fff" stroke="rgba(15,23,42,0.04)" />
        <text x={cx} y={cy} textAnchor="middle" fontSize={13} fill="#6b7280" dy="-0.5em">Total traits:</text>
        <text x={cx} y={cy} textAnchor="middle" fontSize={16} fill="#0b5ed7" dy="1em" fontWeight={600}>{slices.length}</text>
      </svg>
    </div>
  );
}

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

const careerDetails = {
  Scientist: "Investigates questions using the scientific method — suits analytical, patient, long-term thinkers.",
  Engineer: "Turns ideas into practical systems — suits structured problem-solvers and planners.",
  Architect: "Combines creative design with technical discipline — suited for visual/system thinkers.",
  "Software Developer": "Builds software systems — suits logical abstraction, patience and iterative debugging.",
  Analyst: "Turns data into insight — suits investigative pattern-finders and clear communicators.",
  Researcher: "Digs deep into topics — suits curiosity, persistence and rigorous methods.",
  Programmer: "Designs logical solutions in code — suits systematic, detail-oriented thinkers.",
  Philosopher: "Explores abstract frameworks and arguments — suits reflective and conceptual minds.",
  Executive: "Leads strategy and teams — suits decisive planners and influencers.",
  Manager: "Organizes people/processes — suits leadership and goal-focused work.",
  Entrepreneur: "Builds and scales ideas — suits risk-takers, initiators and versatile problem-solvers.",
  Lawyer: "Constructs legal arguments and strategy — suits structured thinking and precision.",
  Counselor: "Supports clients emotionally — suits empathetic, reflective individuals.",
  Psychologist: "Combines research with human insight — suits observational, empathetic thinkers.",
  Writer: "Communicates ideas through text — suits reflective, expressive people.",
  Teacher: "Explains concepts and supports learners — suits patient communicators and organizers.",
  Artist: "Creates expressive works — suits original, creative thinkers.",
  "Social Worker": "Supports people practically and emotionally — suits compassionate helpers.",
  "Marketing Specialist": "Tells stories to influence audiences — suits creative communicators who like data.",
  Accountant: "Manages finances and compliance — suits precise, process-driven people.",
  Auditor: "Assesses compliance and accuracy — suits detail-focused, objective minds.",
  Nurse: "Provides hands-on care — suits reliable, empathetic people working under pressure.",
  Designer: "Solves user problems through design — suits creative problem solvers with empathy.",
  Chef: "Creates food experiences — suits practical craft, timing and creativity.",
  Detective: "Solves crimes through evidence synthesis — suits analytical investigators.",
  Sales: "Builds relationships and closes deals — suits persuasive, resilient communicators.",
  Performer: "Engages audiences on stage — suits expressive, social people.",
  Paramedic: "Delivers urgent care — suits calm decision-makers under pressure.",
  "Fitness Trainer": "Coaches clients to improve health — suits motivational, hands-on coaches.",
};

const mbtiNotRecommendedCareers = {
  INTJ: ["Sales", "Customer Service", "Event Planning"],
  INTP: ["Law Enforcement", "Routine Office Work", "Retail"],
  ENTJ: ["Technical Labor", "Isolated Research", "Routine Admin"],
  ENTP: ["Highly Repetitive Tasks", "Detail-Oriented Admin", "Long Static Work"],
  INFJ: ["High-Pressure Sales", "Manual Labor", "Rigid Bureaucracies"],
  INFP: ["Highly Competitive Sales", "Large Corporations with Little Autonomy"],
  ENFJ: ["Highly Technical Roles", "Isolated Work Without Interaction"],
  ENFP: ["Monotonous Assembly Line", "Strict Rules, No Creativity"],
  ISTJ: ["Creative Arts", "Improvisation Required Work"],
  ISFJ: ["High Competition, High Pressure Sales"],
  ESTJ: ["Ambiguous Roles With No Structure"],
  ESFJ: ["Technical Research", "Isolated Analytical Jobs"],
  ISTP: ["Highly Social Roles Needing Diplomatic Skills"],
  ISFP: ["Highly Competitive Corporate Sales"],
  ESTP: ["Desk-Bound, No Action Roles"],
  ESFP: ["Highly Technical Research Jobs", "Extensive Solo Work"],
};

const notRecommendedDetails = {
  Sales: {
    why: "Requires continuous outreach, persuasion and resilience to rejection. May exhaust those who prefer independent, analytical work.",
    alternatives: "Marketing strategy, product evangelism, or analyst roles where persuasion is less transactional.",
  },
  "Customer Service": {
    why: "High emotional labor, fast context switching and repetitive interactions — not ideal for those preferring focused, predictable tasks.",
    alternatives: "Account management with clear SLAs, documentation or QA roles.",
  },
  "Event Planning": {
    why: "High-pressure coordination with many stakeholders and last-minute changes — challenging for those preferring methodical work.",
    alternatives: "Program coordination, operations with predictable processes, or project management.",
  },
  "Law Enforcement": {
    why: "Frequent exposure to unpredictable high-risk scenarios — may conflict with preference for low-risk, research-focused environments.",
    alternatives: "Forensic analyst, compliance investigator, research analyst.",
  },
  "Routine Office Work": {
    why: "Repetitive tasks with little variety reduce engagement for creative or investigative profiles.",
    alternatives: "Process improvement, automation, or analyst roles with problem-solving scope.",
  },
  "Manual Labor": {
    why: "Physically intensive work may not align with cognitive/design-oriented strengths.",
    alternatives: "Lab technician, CAD designer, equipment technician.",
  },
  "Highly Repetitive Tasks": {
    why: "Low novelty and problem-solving opportunities; may quickly demotivate those needing conceptual challenge.",
    alternatives: "Automation roles, RPA, or rotational positions that increase variety.",
  },
  "Highly Technical Research Jobs": {
    why: "Very isolated research may lack immediate applied impact and collaboration, which some profiles value more.",
    alternatives: "Applied research, product research, UX research or interdisciplinary roles.",
  },
};

// helper to compute MBTI from numeric trait scores
function computeMBTI(personalityData = {}) {
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
}

export default function Report() {
  const navigate = useNavigate();
  const personalityData = JSON.parse(localStorage.getItem("personalityTraits")) || {};
  const interestData = JSON.parse(localStorage.getItem("interestTraits")) || {};
  const generatedAt = new Date().toLocaleString();
  const mbti = computeMBTI(personalityData);
  const recommended = mbtiCareers[mbti] || [];
  const avoidList = mbtiNotRecommendedCareers[mbti] || [];

  const report = {
    generatedAt,
    mbti,
    personality: personalityData,
    interests: interestData,
    recommendedCareers: recommended,
    avoidCareers: avoidList,
  };

  // Trait data for PieChart from GraphResult
  const allTraits = useMemo(() => {
    const personalityTraits = [
      { label: "Extraversion", value: personalityData.E || 0, color: "#6366f1" },
      { label: "Introversion", value: personalityData.I || 0, color: "#818cf8" },
      { label: "Sensing", value: personalityData.S || 0, color: "#06b6d4" },
      { label: "Intuition", value: personalityData.N || 0, color: "#22d3ee" },
      { label: "Thinking", value: personalityData.T || 0, color: "#f97316" },
      { label: "Feeling", value: personalityData.F || 0, color: "#fb923c" },
      { label: "Judging", value: personalityData.J || 0, color: "#10b981" },
      { label: "Perceiving", value: personalityData.P || 0, color: "#34d399" },
    ];

    const interestColors = ["#ef4444", "#f59e0b", "#84cc16", "#06b6d4", "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"];
    const interestEntries = Object.entries(interestData);
    const interestTraits = interestEntries.length > 0 
      ? interestEntries.map(([key, value], idx) => ({
          label: key,
          value: value,
          color: interestColors[idx % interestColors.length]
        }))
      : [];

    return [...personalityTraits, ...interestTraits.slice(0, 8)];
  }, [personalityData, interestData]);

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `career-report-${mbti || "profile"}-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function downloadPDF() {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      let y = 60;
      const left = 40;
      doc.setFontSize(18);
      doc.text("AI Career Counsellor - Report", left, y);
      doc.setFontSize(11);
      y += 26;
      doc.text(`Generated: ${generatedAt}`, left, y);
      y += 18;
      doc.text(`MBTI: ${mbti}`, left, y);
      y += 20;

      doc.setFontSize(13);
      doc.text("Personality (scores):", left, y); y += 16;
      doc.setFontSize(11);
      Object.entries(personalityData).forEach(([k, v]) => {
        doc.text(`${k}: ${v}`, left + 10, y); y += 14;
        if (y > 760) { doc.addPage(); y = 40; }
      });

      y += 6;
      doc.setFontSize(13);
      doc.text("Interests (scores):", left, y); y += 16;
      doc.setFontSize(11);
      Object.entries(interestData).forEach(([k, v]) => {
        doc.text(`${k}: ${v}`, left + 10, y); y += 14;
        if (y > 760) { doc.addPage(); y = 40; }
      });

      y += 6;
      doc.setFontSize(13);
      doc.text("Recommended careers (with reasons):", left, y); y += 16;
      doc.setFontSize(11);
      recommended.forEach((c) => {
        doc.text(`- ${c}: ${careerDetails[c] || "Matches your detected strengths."}`, left + 10, y); y += 14;
        if (y > 760) { doc.addPage(); y = 40; }
      });

      y += 6;
      doc.setFontSize(13);
      doc.text("Careers to avoid (with reasons):", left, y); y += 16;
      doc.setFontSize(11);
      avoidList.forEach((c) => {
        const info = notRecommendedDetails[c];
        const text = info ? `${info.why} Alternatives: ${info.alternatives}` : "May conflict with your dominant traits.";
        doc.text(`- ${c}: ${text}`, left + 10, y); y += 14;
        if (y > 760) { doc.addPage(); y = 40; }
      });

      doc.save(`career-report-${mbti || "profile"}.pdf`);
      return;
    } catch (err) {
      // fallback to printable window
    }

    const html = `
      <html><head><title>Career report</title><style>
      body { font-family: Inter, system-ui, Arial; padding: 24px; color: #0b172a }
      pre { background: #f3f4f6; padding: 12px; border-radius: 8px; }
      h2,h3 { color: #0b5ed7 }
      .card { background:#fff;padding:12px;border-radius:8px;margin-bottom:10px }
      </style></head><body>
      <h2>AI Career Counsellor - Report</h2>
      <p><strong>Generated:</strong> ${generatedAt}</p>
      <p><strong>MBTI:</strong> ${mbti}</p>
      <h3>Personality (scores)</h3><pre>${JSON.stringify(personalityData, null, 2)}</pre>
      <h3>Interests (scores)</h3><pre>${JSON.stringify(interestData, null, 2)}</pre>
      <h3>Recommended careers (with reasons)</h3>
      ${recommended.map(c => `<div class="card"><strong>${c}</strong><div>${careerDetails[c] || "Matches your detected strengths."}</div></div>`).join("")}
      <h3>Careers to avoid (with reasons & alternatives)</h3>
      ${avoidList.length ? avoidList.map(c => {
        const info = notRecommendedDetails[c];
        return `<div class="card"><strong>${c}</strong><div>${info ? info.why + "<br/><em>Alternatives:</em> " + info.alternatives : "May conflict with your dominant traits."}</div></div>`;
      }).join("") : "<div class='card'>No specific avoid recommendations.</div>"}
      <p style="font-size:12px;color:#666">Generated by AI Career Counsellor</p>
      <div style="margin-top:20px"><button onclick="window.print()" style="padding:10px 14px;background:#0b5ed7;color:#fff;border:none;border-radius:6px;cursor:pointer">Print</button></div>
      </body></html>
    `;
    const w = window.open("", "_blank");
    if (!w) return alert("Popup blocked. Allow popups to print/download PDF.");
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }

  function printReport() {
    // Reuse downloadPDF fallback printable HTML for printing quickly
    const html = `
      <html><head><title>Career report - Print</title><style>
      body { font-family: Inter, system-ui, Arial; padding: 24px; color: #0b172a }
      pre { background: #f3f4f6; padding: 12px; border-radius: 8px; white-space: pre-wrap; word-break: break-word; }
      h1,h2,h3 { color: #0b5ed7; margin: 6px 0 }
      .card { background:#fff;padding:12px;border-radius:8px;margin-bottom:10px }
      @media print { button { display: none } }
      </style></head><body>
      <h1>AI Career Counsellor - Report</h1>
      <div><strong>Generated:</strong> ${generatedAt}</div>
      <div><strong>MBTI:</strong> ${mbti}</div>
      <h2>Personality (scores)</h2><pre>${JSON.stringify(personalityData, null, 2)}</pre>
      <h2>Interests (scores)</h2><pre>${JSON.stringify(interestData, null, 2)}</pre>
      <h2>Recommended careers</h2>
      ${recommended.map(c => `<div class="card"><strong>${c}</strong><div>${careerDetails[c] || ""}</div></div>`).join("")}
      <h2>Careers to avoid</h2>
      ${avoidList.length ? avoidList.map(c => {
        const info = notRecommendedDetails[c];
        return `<div class="card"><strong>${c}</strong><div>${info ? info.why + "<br/><em>Alternatives:</em> " + info.alternatives : "May conflict with your dominant traits."}</div></div>`;
      }).join("") : "<div class='card'>No specific avoid recommendations.</div>"}
      <div style="margin-top:24px"><button onclick="window.print()" style="padding:10px 14px;background:#0b5ed7;color:#fff;border:none;border-radius:6px;cursor:pointer">Print</button></div>
      </body></html>
    `;
    const w = window.open("", "_blank");
    if (!w) return alert("Popup blocked. Allow popups to print the report.");
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  }

  return (
    <div style={{ fontFamily: "Inter, system-ui, Arial", padding: 28, maxWidth: 980, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>Assessment Report</h1>
          <div style={{ color: "#6b7280" }}>Combined summary, recommended careers and careers to avoid</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => navigate(-1)} style={{ padding: "8px 12px", cursor: "pointer" }}>Back</button>
        </div>
      </header>

      <main style={{ marginTop: 18, background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 8px 20px rgba(15,23,42,0.04)" }}>
        <section style={{ marginBottom: 12 }}>
          <strong>Generated:</strong> <span style={{ color: "#374151" }}>{generatedAt}</span><br />
          <strong>MBTI:</strong> <span style={{ color: "#0b5ed7" }}>{mbti}</span>
        </section>

        {/* Pie Chart Section */}
        <section style={{ marginTop: 20, marginBottom: 30 }}>
          <h3 style={{ marginTop: 0, textAlign: "center" }}>Personality & Interest Profile</h3>
          <PieChart data={allTraits} size={400} title="Complete Profile Analysis" />
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <h3 style={{ marginTop: 0 }}>Personality (scores)</h3>
            <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 8 }}>{JSON.stringify(personalityData, null, 2)}</pre>
          </div>

          <div>
            <h3 style={{ marginTop: 0 }}>Interests (scores)</h3>
            <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 8 }}>{JSON.stringify(interestData, null, 2)}</pre>
          </div>
        </section>

        <section style={{ marginTop: 12 }}>
          <h3 style={{ marginTop: 0 }}>Recommended careers</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {recommended.length ? recommended.map((c) => (
              <div key={c} style={{ padding: 12, borderRadius: 8, background: "#f8fafc" }}>
                <h4 style={{ margin: 0 }}>{c}</h4>
                <p style={{ marginTop: 6, color: "#374151" }}>{careerDetails[c] || "Matches core strengths detected in your profile."}</p>
              </div>
            )) : <div style={{ color: "#6b7280" }}>No recommendations available</div>}
          </div>
        </section>

        <section style={{ marginTop: 12 }}>
          <h3 style={{ marginTop: 0 }}>Careers to avoid</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {avoidList.length ? avoidList.map((c) => {
              const info = notRecommendedDetails[c];
              return (
                <div key={c} style={{ padding: 12, borderRadius: 8, background: "#fff7f7" }}>
                  <h4 style={{ margin: 0 }}>{c}</h4>
                  <p style={{ marginTop: 6, color: "#7f1d1d" }}>{info?.why ?? "May conflict with your dominant traits."}</p>
                  {info?.alternatives && <p style={{ marginTop: 6, color: "#6b7280", fontSize: 13 }}><strong>Alternatives:</strong> {info.alternatives}</p>}
                </div>
              );
            }) : <div style={{ color: "#6b7280" }}>No avoid recommendations.</div>}
          </div>
        </section>

        <section style={{ marginTop: 18, display: "flex", gap: 10 }}>
          <button onClick={downloadJSON} style={{ background: "#0b5ed7", color: "#fff", padding: "10px 14px", borderRadius: 8, border: "none", cursor: "pointer" }}>
            Download JSON
          </button>

          <button onClick={downloadPDF} style={{ background: "#06b6d4", color: "#fff", padding: "10px 14px", borderRadius: 8, border: "none", cursor: "pointer" }}>
            Download PDF
          </button>

          <button onClick={printReport} style={{ background: "#10b981", color: "#fff", padding: "10px 14px", borderRadius: 8, border: "none", cursor: "pointer" }}>
            Print Report
          </button>
        </section>
      </main>
    </div>
  );
}