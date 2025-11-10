import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { useTheme } from "../theme/ThemeContext";

export const mbtiNotRecommendedCareers = {
  INTJ: ["Sales", "CustomerService", "EventPlanning"],
  INTP: ["LawEnforcement", "RoutineOfficeWork", "Retail"],
  ENTJ: ["TechnicalLabor", "IsolatedResearch", "RoutineAdmin"],
  ENTP: ["HighlyRepetitiveTasks", "DetailOrientedAdmin", "LongStaticWork"],
  INFJ: ["HighPressureSales", "ManualLabor", "RigidBureaucracies"],
  INFP: ["HighlyCompetitiveSales", "LargeCorporationswithLittleAutonomy"],
  ENFJ: ["HighlyTechnicalRoles", "IsolatedWorkWithoutInteraction"],
  ENFP: ["MonotonousAssemblyLine", "StrictRules", "NoCreativity"],
  ISTJ: ["CreativeArts", "ImprovisationRequiredWork"],
  ISFJ: ["HighCompetition", "HighPressureSales"],
  ESTJ: ["AmbiguousRolesWithNoStructure"],
  ESFJ: ["TechnicalResearch", "IsolatedAnalyticalJobs"],
  ISTP: ["HighlySocialRolesNeedingDiplomaticSkills"],
  ISFP: ["HighlyCompetitiveCorporateSales"],
  ESTP: ["DeskBoundNoActionRoles"],
  ESFP: ["HighlyTechnicalResearchJobs", "ExtensiveSoloWork"],
};

export const notRecommendedDetails = {
   Sales: `Focuses on promoting and selling products or services.
Rewards confidence, communication, and persistence.
Requires relationship building and persuasion.
Can feel stressful for reflective or analytical individuals.
Demands resilience against rejection and target pressure.
Offers high earning potential but emotional fatigue.
May underuse strategic or creative problem-solving.
Best for socially energetic, goal-driven personalities.`,

  CustomerService: `Involves direct interaction with clients and customers.
Rewards patience, empathy, and quick problem-solving.
Requires managing expectations and emotional responses.
Can feel draining for private or independent individuals.
Demands calmness under pressure and constant communication.
Offers immediate feedback but limited autonomy.
May under-stimulate analytical or conceptual strengths.
Best for compassionate, adaptable communicators.`,

    EventPlanning: `Involves organizing logistics, vendors, and client experiences.
Rewards creativity, multitasking, and adaptability.
Demands calm under time pressure and last-minute changes.
May overwhelm reflective or analytical personalities.
Requires constant coordination and social energy.
Offers visible results but frequent stress cycles.
Can feel unpredictable for structured thinkers.
Best for spontaneous, socially confident individuals.`,

  LawEnforcement: `Focuses on enforcing laws and ensuring public safety.
Rewards discipline, courage, and quick judgment.
Demands composure under pressure and strict rule adherence.
May feel restrictive for flexible or imaginative types.
Requires teamwork and compliance with hierarchy.
Offers purpose but emotional and physical stress.
Can limit autonomy and creative expression.
Better for structured, decisive individuals.`,

  RoutineOfficeWork: `Centers on clerical, documentation, and process repetition.
Rewards consistency, organization, and accuracy.
Requires patience with data entry and routine tasks.
May bore imaginative or big-picture personalities.
Offers predictability but limited intellectual challenge.
Demands long focus on procedural correctness.
Can underuse creativity or strategic thinking.
Best for steady, task-oriented workers.`,

  Retail: `Involves customer interaction, sales, and merchandise handling.
Rewards energy, patience, and service focus.
Requires adaptability to diverse customers and busy hours.
May drain introverted or analytical personalities.
Offers immediate feedback but limited autonomy.
Demands emotional control and conflict resolution.
Can feel repetitive for strategic or conceptual types.
Better for expressive, people-oriented communicators.`,

  TechnicalLabor: `Involves hands-on technical maintenance or mechanical work.
Rewards precision, endurance, and process reliability.
Requires repetitive, method-driven task completion.
May frustrate visionary or leadership-oriented thinkers.
Offers tangible output and job stability.
Demands focus on details and safety protocols.
Can lack creative or strategic variation.
Best for practical, steady implementers.`,

  IsolatedResearch: `Centers on solitary study and data analysis.
Rewards focus, independence, and patience.
Requires minimal collaboration and prolonged solitude.
May disengage socially motivated personalities.
Offers intellectual depth but limited variety.
Demands sustained attention and long-term focus.
Can feel monotonous for energetic communicators.
Better for independent, reflective thinkers.`,

  RoutineAdmin: `Handles procedural records, scheduling, and coordination.
Rewards reliability, consistency, and organization.
Requires rule-following and deadline management.
May frustrate creative or flexible individuals.
Offers stable, predictable environments.
Demands long attention to repetitive details.
Can limit strategic decision-making opportunities.
Better for structured, dependable workers.`,

  HighlyRepetitiveTasks: `Focuses on repeating identical procedures daily.
Rewards patience, accuracy, and discipline.
Requires comfort with routine and low variety.
Can feel draining for creative or innovative minds.
Offers predictability but limited growth.
Demands endurance and steady focus.
May cause disengagement for dynamic individuals.
Better for those valuing structure over novelty.`,

  DetailOrientedAdmin: `Emphasizes precision in administrative documentation.
Rewards patience, diligence, and thoroughness.
Requires sustained attention to minor details.
May frustrate big-picture or spontaneous thinkers.
Offers predictable structure and reliability.
Demands adherence to systems and protocol.
Can feel confining for conceptual individuals.
Better for meticulous, process-driven professionals.`,

  LongStaticWork: `Involves extended sedentary tasks and low variation.
Rewards endurance, patience, and focus.
Requires minimal movement and sustained attention.
Can be tiring for active or extroverted individuals.
Offers quiet stability but little stimulation.
Demands persistence through repetition.
May under-engage fast-paced personalities.
Best for calm, steady workers.`,

  HighPressureSales: `Demands constant persuasion under performance stress.
Rewards competitiveness and resilience.
Requires rapid thinking and social adaptability.
Can feel draining for empathetic or calm personalities.
Offers high rewards but emotional volatility.
Demands rejection tolerance and persistent energy.
May conflict with values-driven or reserved individuals.
Better for assertive, results-oriented sellers.`,

  ManualLabor: `Focuses on physical effort and endurance-based tasks.
Rewards strength, discipline, and persistence.
Requires adherence to safety and time constraints.
Can feel monotonous for strategic or creative thinkers.
Offers tangible results and team involvement.
Demands consistency in output and physical stamina.
May limit intellectual engagement.
Better for pragmatic, action-oriented workers.`,

  RigidBureaucracies: `Operates within strict hierarchy and process compliance.
Rewards discipline, rule-following, and documentation.
Requires patience with procedures and red tape.
Can frustrate adaptable or innovative personalities.
Offers job security but limited autonomy.
Demands tolerance for slow-paced decision-making.
May stifle creativity and independent thinking.
Better for structured, process-focused individuals.`,

  HighlyCompetitiveSales: `Centers on aggressive targets and performance metrics.
Rewards persuasion, energy, and persistence.
Requires constant networking and competition.
Can exhaust reflective or peace-oriented types.
Offers financial reward but emotional fluctuation.
Demands tolerance for rejection and pressure.
May clash with collaborative or ethical mindsets.
Best for assertive, target-driven professionals.`,

  LargeCorporationswithLittleAutonomy: `Operates within hierarchical systems and fixed roles.
Rewards consistency, compliance, and loyalty.
Requires navigating bureaucracy and limited flexibility.
Can frustrate autonomous or creative thinkers.
Offers stability but minimal personal control.
Demands patience and respect for authority.
May underuse initiative or individuality.
Better for structured, patient employees.`,

  HighlyTechnicalRoles: `Focuses on deep specialization and technical rigor.
Rewards precision, logic, and concentration.
Requires learning complex systems in detail.
May alienate relationally focused individuals.
Offers stability but little emotional engagement.
Demands technical accuracy over flexibility.
Can feel isolating for communicative personalities.
Best for analytical, system-driven professionals.`,

  IsolatedWorkWithoutInteraction: `Centers on independent tasks with minimal teamwork.
Rewards focus, solitude, and self-discipline.
Requires long hours of concentration alone.
May demotivate social or collaborative personalities.
Offers autonomy but limited external stimulation.
Demands reliability without supervision.
Can cause disconnection for empathetic individuals.
Better for introspective, self-reliant workers.`,

  MonotonousAssemblyLine: `Involves repetitive production tasks in sequence.
Rewards steadiness, focus, and reliability.
Requires physical endurance and consistency.
Can frustrate creative or adaptive personalities.
Offers stability but minimal variation.
Demands adherence to timing and safety protocols.
May underuse strategic or conceptual strengths.
Best for patient, process-oriented individuals.`,

  StrictRules: `Operates under fixed policies with no flexibility.
Rewards order, compliance, and consistency.
Requires following procedure without deviation.
Can restrict imaginative or adaptive thinkers.
Offers predictability but little autonomy.
Demands patience and respect for hierarchy.
May discourage creative problem solving.
Better for disciplined, rule-abiding workers.`,

  NoCreativity: `Focuses solely on routine or procedural execution.
Rewards compliance, order, and precision.
Requires repetition with minimal variation.
Can frustrate expressive or innovative personalities.
Offers clarity and predictability.
Demands patience over improvisation.
May limit engagement for idea-driven workers.
Better for those who value order and stability.`,

  CreativeArts: `Focuses on open-ended artistic self-expression.
Rewards imagination and emotional resonance.
Requires tolerance for ambiguity and variable income.
Can feel unstable for structure-seeking individuals.
Offers fulfillment but lacks predictability.
Demands creative risk-taking and perseverance.
May unsettle those preferring rules and routine.
Best for intuitive, flexible creators.`,

  ImprovisationRequiredWork: `Demands quick adaptation and unscripted decision-making.
Rewards flexibility, confidence, and spontaneity.
Requires thinking on your feet in uncertain settings.
May overwhelm structured or cautious personalities.
Offers dynamic engagement but minimal predictability.
Demands comfort with change and incomplete plans.
May frustrate methodical, steady individuals.
Better for outgoing, improvisational communicators.`,

  HighCompetition: `Emphasizes performance in rivalry-based environments.
Rewards ambition, confidence, and persistence.
Requires endurance under constant comparison.
Can feel draining for harmony-oriented individuals.
Offers motivation but increases stress and instability.
Demands resilience against loss or failure.
May conflict with cooperative, empathetic values.
Best for assertive, goal-oriented professionals.`,

  AmbiguousRolesWithNoStructure: `Lack clear guidelines or defined responsibilities.
Rewards adaptability, initiative, and independence.
Requires tolerance for uncertainty and self-management.
Can stress individuals who prefer defined systems.
Offers freedom but inconsistent expectations.
Demands problem-solving without clear direction.
May reduce efficiency for rule-oriented thinkers.
Better for flexible, self-starting personalities.`,

  TechnicalResearch: `Involves deep scientific or data-driven investigation.
Rewards precision, patience, and logic.
Requires detailed focus and procedural rigor.
Can feel isolating for outgoing or empathetic workers.
Offers intellectual challenge but low interaction.
Demands commitment to long study periods.
May underuse creative or social strengths.
Better for patient, analytical researchers.`,

  IsolatedAnalyticalJobs: `Centers on data processing and solo problem-solving.
Rewards accuracy, persistence, and independence.
Requires focus without external collaboration.
Can disengage socially driven personalities.
Offers autonomy but limited teamwork.
Demands patience with routine analysis.
May under-stimulate expressive individuals.
Better for focused, solitary analysts.`,

  HighlySocialRolesNeedingDiplomaticSkills: `Involves negotiation, empathy, and emotional awareness.
Rewards communication, tact, and adaptability.
Requires constant social engagement and diplomacy.
May exhaust private or task-focused individuals.
Offers variety but emotional complexity.
Demands sensitivity to others’ needs and cues.
Can feel draining for action-oriented workers.
Better for socially intuitive, emotionally balanced people.`,

  HighlyCompetitiveCorporateSales: `Centers on target-driven persuasion and client retention.
Rewards charisma, persistence, and networking ability.
Requires handling rejection and pressure professionally.
May drain reflective or steady personalities.
Offers financial reward but unstable emotional balance.
Demands constant adaptability to market change.
Can conflict with altruistic or process-focused values.
Better for assertive, performance-oriented individuals.`,

  DeskBoundNoActionRoles: `Involves long sedentary periods and routine paperwork.
Rewards focus, patience, and stability.
Requires minimal movement or active engagement.
Can frustrate physically driven or adventurous people.
Offers safety and predictability but low excitement.
Demands endurance for repetitive tasks.
May reduce motivation for dynamic personalities.
Best for calm, methodical workers.`,

  HighlyTechnicalResearchJobs: `Engages in specialized study and controlled experimentation.
Rewards thoroughness, concentration, and discipline.
Requires long solitary focus on technical precision.
Can disengage expressive or high-energy individuals.
Offers intellectual fulfillment but minimal variety.
Demands adherence to rigid protocols and standards.
May underuse interpersonal strengths.
Better for patient, meticulous researchers.`,

  ExtensiveSoloWork: `Focuses on independent output without collaboration.
Rewards focus, discipline, and autonomy.
Requires self-motivation and consistent performance.
Can isolate social or team-driven personalities.
Offers freedom but minimal feedback or support.
Demands patience and time management.
May reduce engagement for socially oriented workers.
Best for independent, introspective professionals.`,

};

export default function NotRecommended() {
  const navigate = useNavigate();
  const reportRef = useRef(null);
  const { isDark } = useTheme();

  const personalityData = JSON.parse(localStorage.getItem("personalityTraits") || "{}");
  const E = personalityData.E || 0;
  const I = personalityData.I || 0;
  const S = personalityData.S || 0;
  const N = personalityData.N || 0;
  const T = personalityData.T || 0;
  const F = personalityData.F || 0;
  const J = personalityData.J || 0;
  const P = personalityData.P || 0;

  const getMBTI = () => {
    return (E >= I ? "E" : "I") +
      (S >= N ? "S" : "N") +
      (T >= F ? "T" : "F") +
      (J >= P ? "J" : "P");
  };

  const mbti = getMBTI();

  const avoidList = mbtiNotRecommendedCareers[mbti] || [];

  async function downloadPDF() {
    if (!reportRef.current) return;
    const hidden = [];
    const toHide = reportRef.current.querySelectorAll('[data-skip-pdf]');
    toHide.forEach((el) => {
      hidden.push({ el, display: el.style.display, visibility: el.style.visibility });
      el.style.display = 'none';
    });
    // prefer capturing a chart SVG only (no icons); otherwise hide page chrome while capturing
    const chartEl = reportRef.current.querySelector('svg');
    const hideIcons = (root, exceptEl) => {
      const iconSelectors = ['img', 'svg', '[data-icon]', '.icon', 'button svg', 'button img'];
      const nodes = root.querySelectorAll(iconSelectors.join(','));
      const hiddenLocal = [];
      nodes.forEach((el) => {
        if (!el) return;
        if (exceptEl && (el === exceptEl || el.contains(exceptEl) || exceptEl.contains(el))) return;
        hiddenLocal.push({ el, display: el.style.display, visibility: el.style.visibility });
        el.style.display = 'none';
      });
      return hiddenLocal;
    };

    try {
      // Try vector export first when a chart SVG exists
      if (chartEl) {
        const hiddenIcons = hideIcons(reportRef.current, chartEl);
        try {
          const { jsPDF } = await import("jspdf");
          let svg2pdf;
          try {
            svg2pdf = (await import("svg2pdf.js")).default || (await import("svg2pdf.js"));
          } catch (e) {
            svg2pdf = null;
          }

          if (svg2pdf) {
            const pdf = new jsPDF({ unit: "pt", format: "a4" });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 20;

            const rect = chartEl.getBoundingClientRect();
            const pxToPt = 72 / 96;
            const svgWPt = rect.width * pxToPt;
            const svgHPt = rect.height * pxToPt;
            const scale = Math.min((pageWidth - margin * 2) / svgWPt, (pageHeight - margin * 2) / svgHPt, 1);
            const targetW = svgWPt * scale;
            const targetH = svgHPt * scale;
            const x = Math.max(margin, (pageWidth - targetW) / 2);
            const y = margin;

            const svgClone = chartEl.cloneNode(true);
            try {
              const inlineStyles = (el) => {
                const children = el.querySelectorAll ? el.querySelectorAll('*') : [];
                [el, ...children].forEach((node) => {
                  if (!(node instanceof Element)) return;
                  const cs = window.getComputedStyle(node);
                  const styleStr = [];
                  ['font', 'font-size', 'font-family', 'font-weight', 'fill', 'stroke', 'stroke-width', 'text-anchor', 'letter-spacing'].forEach((k) => {
                    const v = cs.getPropertyValue(k);
                    if (v) styleStr.push(`${k}:${v}`);
                  });
                  if (styleStr.length) node.setAttribute('style', styleStr.join(';'));
                });
              };
              inlineStyles(svgClone);
            } catch (e) {}

            const wrapper = document.createElement('div');
            wrapper.style.position = 'fixed';
            wrapper.style.left = '-9999px';
            wrapper.style.top = '-9999px';
            wrapper.appendChild(svgClone);
            document.body.appendChild(wrapper);
            try {
              svg2pdf(svgClone, pdf, { x, y, width: targetW, height: targetH });
              pdf.save(`not-recommended-${mbti || 'profile'}.pdf`);
              return;
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

      // Raster fallback
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
      const margin = 20;

      let imgWidth = canvas.width;
      let imgHeight = canvas.height;
      const ratio = Math.min((pageWidth - margin * 2) / imgWidth, (pdf.internal.pageSize.getHeight() - margin * 2) / imgHeight);
      imgWidth = imgWidth * ratio;
      imgHeight = imgHeight * ratio;

      const x = Math.max(margin, (pageWidth - imgWidth) / 2);
      const y = margin;
      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      pdf.save(`not-recommended-${mbti || 'profile'}.pdf`);
    } catch (err) {
      const w = window.open("", "_blank");
      if (!w) return alert("Popup blocked. Allow popups to download the PDF.");
      w.document.write(document.documentElement.outerHTML);
      w.document.close();
      setTimeout(() => w.print(), 300);
    } finally {
      hidden.forEach(({ el, display, visibility }) => {
        el.style.display = display || '';
        el.style.visibility = visibility || '';
      });
    }
  }


  const pageBackground = isDark
    ? "linear-gradient(135deg, rgba(2,6,23,0.92), rgba(30,58,138,0.85)), url('https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1800&q=70')"
    : "linear-gradient(135deg, rgba(226,232,240,0.92), rgba(191,219,254,0.82)), url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=70')";

  const cardStyle = {
    ...styles.card,
    background: isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.96)",
    border: isDark ? "1px solid rgba(148,163,184,0.25)" : "1px solid rgba(226,232,240,0.85)",
    boxShadow: isDark ? "0 18px 40px rgba(8,15,40,0.6)" : "0 22px 44px rgba(15,23,42,0.14)",
    color: isDark ? "#f8fafc" : "#0f172a",
    backdropFilter: "blur(10px)"
  };

  const pillBackground = isDark ? "rgba(239,68,68,0.2)" : "#fff7f7";
  const pillText = isDark ? "#fecaca" : "#7f1d1d";
  const secondaryText = isDark ? "#cbd5f5" : "#6b7280";

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
        background: isDark ? "rgba(15,23,42,0.7)" : "rgba(255,255,255,0.92)",
        borderBottom: isDark ? "1px solid rgba(148,163,184,0.25)" : "1px solid rgba(226,232,240,0.8)",
        backdropFilter: "blur(12px)",
        color: isDark ? "#f8fafc" : "#0f172a"
      }}>
        <div style={styles.brand}>
          <div style={{
            ...styles.logo,
            boxShadow: isDark ? "0 10px 20px rgba(99,102,241,0.35)" : styles.logo.boxShadow
          }}>AI</div>
          <div>Career Counsellor</div>
        </div>
      </header>

      <main style={styles.container}>
        <div ref={reportRef} style={cardStyle}>
          <h2 style={{ marginTop: 0, color: isDark ? "#f8fafc" : "#0f172a" }}>Careers to Avoid for {mbti}</h2>

          {avoidList.length === 0 ? (
            <p style={{ color: secondaryText }}>No specific recommendations to avoid.</p>
          ) : (
            avoidList.map((career) => (
              <div
                key={career}
                style={{
                  background: pillBackground,
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 14,
                  border: isDark ? "1px solid rgba(248,113,113,0.35)" : "1px solid rgba(248,113,113,0.25)",
                  boxShadow: isDark ? "0 12px 22px rgba(239,68,68,0.25)" : "0 10px 20px rgba(239,68,68,0.12)"
                }}
              >
                <h4 style={{ margin: 0, color: isDark ? "#fecaca" : "#b91c1c" }}>{career}</h4>
                <p style={{ marginTop: 6, color: pillText }}>
                  {notRecommendedDetails[career] || "This career may be less suited because it conflicts with your dominant traits, requiring a different environment, pace, or interpersonal demands."}
                </p>
                <p style={{ marginTop: 6, color: secondaryText, fontSize: 13 }}>
                  Recommendation: Consider alternatives that better match your strengths and preferred working style.
                </p>
              </div>
            ))
          )}

          <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
            <button
              style={{
                ...styles.primary,
                background: isDark ? "linear-gradient(135deg,#38bdf8,#6366f1)" : styles.primary.background,
                boxShadow: isDark ? "0 12px 26px rgba(59,130,246,0.32)" : "0 10px 22px rgba(11,94,215,0.22)"
              }}
              onClick={() => navigate("/assessment/graph-result")}
            >
              Back to Summary
            </button>
            <button
              data-skip-pdf
              style={{
                ...styles.pdfBtn,
                background: isDark ? "linear-gradient(135deg,#10b981,#34d399)" : styles.pdfBtn.background,
                boxShadow: isDark ? "0 12px 24px rgba(16,185,129,0.35)" : "0 10px 20px rgba(16,185,129,0.22)"
              }}
              onClick={downloadPDF}
            >
              Download PDF
            </button>
          </div>
        </div>
      </main>

      <footer style={{ ...styles.footer, color: secondaryText }}>© {new Date().getFullYear()} AI Career Counsellor</footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Inter, system-ui, Arial",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f6f9ff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "18px 28px",
    background: "#fff",
    borderBottom: "1px solid #e6eef9",
  },
  brand: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    background: "linear-gradient(135deg, #6c63ff, #00c2ff)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "#fff",
    padding: 28,
    borderRadius: 12,
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
  },
  primary: {
    background: "#0b5ed7",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
  },
  pdfBtn: {
    background: "#10b981",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
  },
  printBtn: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    padding: 18,
    color: "#6b7280",
  },
};
