import React, { useMemo, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";

/*
  Updated PieChart: enlarge SVG canvas with margins so outside labels (taglines)
  and leader lines are not clipped. Legend remains one-line per item.
*/

export function PieChart({ data = [], size = 360, title, isDark = false }) {
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

  // Resolve label collisions: adjust labelY positions per side (left/right) with a minimum gap
  const minGap = 16;
  const adjustedYByIndex = new Map();
  // Left side (labelX < cx)
  const left = [...slices].filter(s => s.labelX < cx).sort((a, b) => a.labelY - b.labelY);
  let lastYLeft = -Infinity;
  left.forEach((s) => {
    const proposed = Math.max(s.labelY, lastYLeft + minGap);
    adjustedYByIndex.set(s.i, proposed);
    lastYLeft = proposed;
  });
  // Right side (labelX >= cx)
  const right = [...slices].filter(s => s.labelX >= cx).sort((a, b) => a.labelY - b.labelY);
  let lastYRight = -Infinity;
  right.forEach((s) => {
    const proposed = Math.max(s.labelY, lastYRight + minGap);
    adjustedYByIndex.set(s.i, proposed);
    lastYRight = proposed;
  });

  const textColor = isDark ? "#e2e8f0" : "#111827";
  const subTextColor = isDark ? "#cbd5f5" : "#6b7280";
  const legendBg = isDark ? "rgba(15,23,42,0.75)" : "#f8fafc";

  return (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start", color: textColor }}>
      {/* Pie Chart */}
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        style={{ overflow: "visible" }}
      >
        {title && (
          <text x={cx} y={40} textAnchor="middle" fontSize={16} fontWeight={700} fill={textColor}>
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
                y2={adjustedYByIndex.get(s.i) ?? s.labelY}
                stroke="#9ca3af"
                strokeWidth="1"
              />
              <text
                x={s.labelX}
                y={adjustedYByIndex.get(s.i) ?? s.labelY}
                textAnchor={s.labelX < cx ? "end" : "start"}
                fontSize={12}
                fill={hovered === s.i ? (isDark ? "#f8fafc" : "#0b1724") : (isDark ? "#e2e8f0" : "#374151")}
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
        <text x={cx} y={cy} textAnchor="middle" fontSize={13} fill={subTextColor} dy="-0.5em">
          Total traits:
        </text>
        <text x={cx} y={cy} textAnchor="middle" fontSize={16} fill={isDark ? "#38bdf8" : "#0b5ed7"} dy="1em" fontWeight={600}>
          {slices.length}
        </text>
      </svg>

      {/* Legend with detailed descriptions */}
      <div style={{ minWidth: 300, maxWidth: 360 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: textColor }}>
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
                background: legendBg,
                borderLeft: `3px solid ${d.color}`
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: textColor }}>
                  {d.label}
                </div>
                <div style={{ fontSize: 13, color: subTextColor, marginTop: 2 }}>
                  {d.tagline}
                </div>
              </div>
              <div style={{ fontSize: 13, color: textColor, fontWeight: 500 }}>
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
  const reportRef = useRef(null);
  const { isDark } = useTheme();
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

  async function downloadPDF() {
    if (!reportRef.current) return;
    // hide any elements we don't want included in the captured PDF (marked with data-skip-pdf)
    const hidden = [];
    const toHide = reportRef.current.querySelectorAll('[data-skip-pdf]');
    toHide.forEach((el) => {
      hidden.push({ el, display: el.style.display, visibility: el.style.visibility });
      el.style.display = 'none';
    });

    // Prefer capturing the chart SVG only so icons and surrounding chrome are excluded
    const chartEl = reportRef.current.querySelector('svg');
    // helper to hide icon-like elements inside a root element (optionally excluding an element)
    const hideIcons = (root, exceptEl) => {
      const iconSelectors = ['img', 'svg', '[data-icon]', '.icon', 'button svg', 'button img'];
      const nodes = root.querySelectorAll(iconSelectors.join(','));
      const hiddenLocal = [];
      nodes.forEach((el) => {
        if (!el) return;
        // don't hide the chart SVG or elements that contain the chart
        if (exceptEl && (el === exceptEl || el.contains(exceptEl) || exceptEl.contains(el))) return;
        hiddenLocal.push({ el, display: el.style.display, visibility: el.style.visibility });
        el.style.display = 'none';
      });
      return hiddenLocal;
    };
    try {
      // Try vector SVG -> PDF export first when a chart SVG is present
      if (chartEl) {
        // hide icons around the chart so they don't interfere
        const hiddenIcons = hideIcons(reportRef.current, chartEl);
        try {
          const { jsPDF } = await import("jspdf");
          let svg2pdf;
          try {
            // dynamic import so project doesn't break if package isn't installed
            svg2pdf = (await import("svg2pdf.js")).default || (await import("svg2pdf.js"));
          } catch (e) {
            svg2pdf = null;
          }

          if (svg2pdf) {
            // Use svg2pdf to render vector SVG into the PDF
            const pdf = new jsPDF({ unit: "pt", format: "a4" });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 20;

            // Compute svg dimensions in CSS pixels
            const rect = chartEl.getBoundingClientRect();
            const pxToPt = 72 / 96; // convert px -> pt
            const svgWPt = rect.width * pxToPt;
            const svgHPt = rect.height * pxToPt;

            const scale = Math.min((pageWidth - margin * 2) / svgWPt, (pageHeight - margin * 2) / svgHPt, 1);
            const targetW = svgWPt * scale;
            const targetH = svgHPt * scale;
            const x = Math.max(margin, (pageWidth - targetW) / 2);
            const y = margin;

            // Clone the SVG so we don't mutate the page; inline styles may be required for complex CSS-based charts
            const svgClone = chartEl.cloneNode(true);

            // Inline computed styles for text/labels so vector rendering preserves appearance (best-effort)
            try {
              const inlineStyles = (el) => {
                const children = el.querySelectorAll ? el.querySelectorAll('*') : [];
                [el, ...children].forEach((node) => {
                  if (!(node instanceof Element)) return;
                  const cs = window.getComputedStyle(node);
                  const styleStr = [];
                  // copy a subset of useful properties
                  ['font', 'font-size', 'font-family', 'font-weight', 'fill', 'stroke', 'stroke-width', 'text-anchor', 'letter-spacing'].forEach((k) => {
                    const v = cs.getPropertyValue(k);
                    if (v) styleStr.push(`${k}:${v}`);
                  });
                  if (styleStr.length) node.setAttribute('style', styleStr.join(';'));
                });
              };
              inlineStyles(svgClone);
            } catch (e) {
              // ignore style inlining errors
            }

            // svg2pdf expects an SVGElement attached to DOM in some environments; attach off-screen
            const wrapper = document.createElement('div');
            wrapper.style.position = 'fixed';
            wrapper.style.left = '-9999px';
            wrapper.style.top = '-9999px';
            wrapper.appendChild(svgClone);
            document.body.appendChild(wrapper);

            try {
              // render vector SVG into PDF at requested position/size
              svg2pdf(svgClone, pdf, { x, y, width: targetW, height: targetH });
              pdf.save(`graph-result-${getMBTI() || 'profile'}.pdf`);
              return; // success; don't run raster fallback
            } finally {
              document.body.removeChild(wrapper);
            }
          }
        } finally {
          hiddenIcons.forEach(({ el, display, visibility }) => {
            el.style.display = display || '';
            el.style.visibility = visibility || '';
          });
        }
      }

      // Fallback: rasterize using html2canvas (keeps earlier behavior)
      let canvas;
      if (chartEl) {
        const hiddenIcons = hideIcons(reportRef.current, chartEl);
        try {
          canvas = await html2canvas(chartEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        } finally {
          hiddenIcons.forEach(({ el, display, visibility }) => {
            el.style.display = display || '';
            el.style.visibility = visibility || '';
          });
        }
      } else {
        const globalHidden = [];
        const globalToHide = document.querySelectorAll('header, footer, .logo');
        globalToHide.forEach((el) => {
          globalHidden.push({ el, display: el.style.display, visibility: el.style.visibility });
          el.style.display = 'none';
        });
        const hiddenIcons = hideIcons(reportRef.current, null);
        try {
          canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        } finally {
          hiddenIcons.forEach(({ el, display, visibility }) => {
            el.style.display = display || '';
            el.style.visibility = visibility || '';
          });
          globalHidden.forEach(({ el, display, visibility }) => {
            el.style.display = display || '';
            el.style.visibility = visibility || '';
          });
        }
      }

      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;

      let imgWidth = canvas.width;
      let imgHeight = canvas.height;
      const ratio = Math.min((pageWidth - margin * 2) / imgWidth, (pageHeight - margin * 2) / imgHeight);
      imgWidth = imgWidth * ratio;
      imgHeight = imgHeight * ratio;

      const x = Math.max(margin, (pageWidth - imgWidth) / 2);
      const y = margin;
      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`graph-result-${getMBTI() || 'profile'}.pdf`);
    } catch (err) {
      const w = window.open("", "_blank");
      if (!w) return alert("Popup blocked. Allow popups to download the PDF.");
      w.document.write(document.documentElement.outerHTML);
      w.document.close();
      setTimeout(() => w.print(), 300);
    } finally {
      // restore hidden elements regardless of success/failure
      hidden.forEach(({ el, display, visibility }) => {
        el.style.display = display || '';
        el.style.visibility = visibility || '';
      });
    }
  }

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


  const pageBackground = isDark
    ? "linear-gradient(135deg, rgba(2,6,23,0.92), rgba(30,58,138,0.85)), url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=70')"
    : "linear-gradient(135deg, rgba(226,232,240,0.92), rgba(191,219,254,0.85)), url('https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1800&q=70')";

  const cardStyle = {
    ...styles.card,
    background: isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.96)",
    border: isDark ? "1px solid rgba(148,163,184,0.18)" : "1px solid rgba(226,232,240,0.9)",
    boxShadow: isDark ? "0 22px 50px rgba(8,15,40,0.6)" : "0 24px 48px rgba(15,23,42,0.15)",
    color: isDark ? "#f8fafc" : "#0f172a",
    backdropFilter: "blur(10px)"
  };

  const legendSectionStyle = {
    background: isDark ? "rgba(15,23,42,0.6)" : "#f8fafc",
    border: isDark ? "1px solid rgba(148,163,184,0.25)" : "1px solid #e2e8f0"
  };

  const legendItemStyle = {
    ...styles.legendItem,
    background: isDark ? "rgba(15,23,42,0.75)" : "#fff",
    color: isDark ? "#e2e8f0" : "#0f172a",
    boxShadow: isDark ? "0 12px 22px rgba(8,15,40,0.35)" : "0 8px 16px rgba(15,23,42,0.08)"
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
        background: isDark ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.92)",
        borderBottom: isDark ? "1px solid rgba(148,163,184,0.3)" : "1px solid rgba(226,232,240,0.85)",
        backdropFilter: "blur(12px)"
      }}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>
            <div style={{ ...styles.title, color: isDark ? "#f8fafc" : styles.title.color }}>Assessment Results</div>
            <div style={{ ...styles.subtitle, color: isDark ? "#cbd5f5" : "#6b7280" }}>Personality & interests</div>
          </div>
        </div>
        <button
          style={{
            ...styles.homeButton,
            background: isDark ? "linear-gradient(135deg,#38bdf8,#6366f1)" : styles.homeButton.background,
            boxShadow: isDark ? "0 12px 26px rgba(59,130,246,0.35)" : "0 10px 22px rgba(11,94,215,0.25)"
          }}
          onClick={() => navigate("/home")}
        >
          Home
        </button>
      </header>

      <main style={{ ...styles.container, alignItems: "stretch" }}>
  <div ref={reportRef} style={cardStyle}>
          <div style={styles.topRow}>
            <div>
              <h2 style={{ margin: 0, color: isDark ? "#f8fafc" : "#0f172a" }}>Your Complete Profile</h2>
              <div style={{ color: isDark ? "#38bdf8" : "#0b5ed7", marginTop: 6 }}>MBTI: {getMBTI()}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigate("/assessment/suitable-careers")} style={{ ...styles.smallBtn, background: isDark ? "linear-gradient(135deg,#22c55e,#4ade80)" : styles.smallBtn.background }}>
                Recommended
              </button>
              <button onClick={() => navigate("/assessment/not-recommended")} style={{ ...styles.smallBtnGhost, background: isDark ? "rgba(15,23,42,0.75)" : "#fff", color: isDark ? "#e2e8f0" : "#374151", border: isDark ? "1px solid rgba(148,163,184,0.35)" : styles.smallBtnGhost.border }}>
                Avoid
              </button>
              <button data-skip-pdf onClick={downloadPDF} style={{ ...styles.smallBtnPrint, background: isDark ? "linear-gradient(135deg,#f59e0b,#f97316)" : styles.smallBtnPrint.background }}>
                Download PDF
              </button>
              <button onClick={handleRestart} style={{ ...styles.smallBtnAlt, background: isDark ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : styles.smallBtnAlt.background }}>
                Retake
              </button>
            </div>
          </div>

          <div style={styles.chartContainer}>
            <PieChart 
              data={allTraits} 
              size={720}
              title="Complete Profile Analysis (16 Traits)"
              isDark={isDark}
            />
          </div>

          <div style={styles.legendContainer}>
            <div style={{ ...styles.legendSection, ...legendSectionStyle }}>
              <h3 style={{ ...styles.legendTitle, color: isDark ? "#f8fafc" : "#111827" }}>
                Personality Traits (MBTI Based)
              </h3>
              <div style={styles.legendGrid}>
                {allTraits.slice(0, 8).map((trait, idx) => (
                  <div key={trait.label} style={legendItemStyle}>
                    <span style={{...styles.legendColor, backgroundColor: trait.color}} />
                    <div style={styles.legendText}>
                      <strong style={{ color: isDark ? "#f8fafc" : "#111827" }}>{trait.label}</strong>
                      <span style={{ ...styles.legendTagline, color: isDark ? "#cbd5f5" : "#6b7280" }}>{trait.tagline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...styles.legendSection, ...legendSectionStyle }}>
              <h3 style={{ ...styles.legendTitle, color: isDark ? "#f8fafc" : "#111827" }}>
                Interest Traits (8 Categories)
              </h3>
              <div style={styles.legendGrid}>
                {allTraits.slice(8).map((trait, idx) => (
                  <div key={trait.label} style={legendItemStyle}>
                    <span style={{...styles.legendColor, backgroundColor: trait.color}} />
                    <div style={styles.legendText}>
                      <strong style={{ color: isDark ? "#f8fafc" : "#111827" }}>{trait.label}</strong>
                      <span style={{ ...styles.legendTagline, color: isDark ? "#cbd5f5" : "#6b7280" }}>{trait.tagline}</span>
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
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 28px", background: "#fff", borderBottom: "1px solid #e6eef9" },
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
  homeButton: { background: "#0b5ed7", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 600, transition: "background 0.2s ease" },

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
