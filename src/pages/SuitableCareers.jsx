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

const careerDetails = {
  Scientist: `Works on systematic investigation and discovery.
Suited to analytical, evidence-driven thinkers.
Involves hypothesis testing and experimental design.
Rewards patience, rigor and long-term focus.
Offers opportunity to contribute new knowledge.
Aligns with curiosity and tolerance for iterative failure.
Often provides autonomy over research direction.
Matches well with methodical problem solvers.`,

  Engineer: `Converts ideas into practical, buildable systems.
Suited to logical, systems-oriented problem solvers.
Emphasizes design, testing and optimization.
Rewards precision, planning and technical skill.
Provides tangible outcomes and measurable impact.
Fits people who enjoy structured workflows.
Often involves collaborative multidisciplinary teams.
Aligns with applied, outcome-driven work.`,

  Architect: `Blends creative vision with technical discipline.
Suited to people who like multi-scale planning and detail.
Involves iterative design and client collaboration.
Rewards spatial reasoning and aesthetic judgment.
Requires project management and long-term follow-through.
Offers visible, built results of one’s work.
Matches preference for structured creative processes.
Appeals to those who synthesize art and engineering.`,

  SoftwareDeveloper: `Solves logical problems through code and system design.
Fits analytical, abstract and iterative thinkers.
Rewards debugging, optimization and product thinking.
Offers autonomy and remote/collaborative options.
Provides measurable outputs and rapid feedback loops.
Matches tolerance for sustained concentration and detail.
Enables continuous learning of new technologies.
Aligns with building scalable digital solutions.`,

  Analyst: `Extracts insight from data and patterns.
Suited to detail-oriented and investigative thinkers.
Involves data modeling, reporting and recommendation.
Rewards clear communication of complex findings.
Supports strategic decision-making across teams.
Provides measurable impact on business outcomes.
Fits people who enjoy problem decomposition.
Matches curiosity about trends and causality.`,

  Researcher: `Focuses on deep exploration of specific problems.
Suited to patient, curious and methodical minds.
Involves study design, data gathering and analysis.
Rewards originality and long-term inquiry.
Offers academic or applied impact opportunities.
Requires resilience to setbacks and slow progress.
Matches preference for intellectual independence.
Appeals to those who value contributing to knowledge.`,

  Programmer: `Implements algorithms and software solutions.
Suited to logical sequencing and precise thinking.
Involves building, testing and refining code.
Rewards meticulousness and problem decomposition.
Enables immediate, iterative feedback loops.
Fits those who enjoy constructing reliable systems.
Offers broad career pathways and toolsets.
Matches preference for structured technical work.`,

  Philosopher: `Explores foundational questions and abstract ideas.
Suited to reflective, conceptual and theoretical thinkers.
Involves argument construction and critical analysis.
Rewards clarity of thought and intellectual rigor.
Encourages sustained contemplation and synthesis.
Fits people who prefer conceptual over applied tasks.
Offers roles in academia, ethics and policy writing.
Aligns with interest in frameworks and meaning.`,

  Executive: `Leads organizational strategy and large teams.
Suited to decisive, big-picture and influencing personalities.
Involves setting vision, priorities and resource allocation.
Rewards strategic thinking and stakeholder management.
Requires comfort with responsibility and trade-offs.
Offers significant impact on company direction.
Fits people who enjoy coordinating complex systems.
Matches preference for leadership and decision-making.`,

  Manager: `Organizes people, processes and project delivery.
Suited to practical leadership and coordination skills.
Involves goal-setting, coaching and performance tracking.
Rewards interpersonal clarity and operational focus.
Requires effective communication and delegation.
Provides a balance of strategy and execution.
Fits those who enjoy enabling others’ success.
Aligns with preference for structured responsibility.`,

  Entrepreneur: `Builds ventures from idea to market reality.
Suited to risk-tolerant, initiative-taking personalities.
Involves rapid iteration, fundraising and scaling.
Rewards creativity, resilience and broad skillsets.
Provides autonomy and ownership over outcomes.
Requires comfort with uncertainty and multi-tasking.
Matches preference for high-impact, high-stakes work.
Appeals to those who enjoy creating and leading change.`,

  Lawyer: `Practices structured argument, analysis and advocacy.
Suited to logical, detail-oriented and persuasive thinkers.
Involves research, precedent and precise writing.
Rewards rigorous reasoning and negotiation skill.
Offers defined career paths and professional status.
Requires discipline for long-form preparation and review.
Matches preference for rule-based and systematic tasks.
Fits those who want to influence outcomes through law.`,

  Inventor: `Creates new products, tools or processes.
Suited to curious, experimental and persistent thinkers.
Involves ideation, prototyping and refinement.
Rewards originality and cross-disciplinary thinking.
Offers potential for innovation and recognition.
Requires resilience to trial and failure cycles.
Matches preference for autonomy and novelty.
Appeals to those who turn imagination into reality.`,

  Consultant: `Advises organizations through problem analysis and strategy.
Suited to analytical, communicative and adaptable individuals.
Involves diagnosing issues and proposing actionable solutions.
Rewards efficiency, clarity and impact-oriented results.
Offers diverse project exposure and professional growth.
Requires structured communication and quick learning.
Matches preference for varied, fast-paced work.
Fits those who enjoy solving complex challenges.`,

  Journalist: `Investigates, writes and communicates stories for the public.
Suited to observant, curious and expressive thinkers.
Involves research, interviews and storytelling.
Rewards clarity, integrity and narrative skill.
Requires meeting deadlines and adapting to breaking events.
Offers opportunities to inform and influence audiences.
Matches preference for inquiry and real-world engagement.
Appeals to those passionate about truth and communication.`,

  Marketer: `Promotes products and ideas to target audiences.
Suited to creative, analytical and persuasive individuals.
Involves campaign planning, branding and trend analysis.
Rewards innovation, timing and emotional insight.
Offers roles in digital, product or brand management.
Requires balancing creativity with measurable results.
Matches preference for dynamic, people-centric work.
Fits those who enjoy influencing perception and behavior.`,

  Counselor: `Provides emotional support and guided problem-solving.
Suited to empathetic, patient and listening-focused people.
Involves building trust and long-term client relationships.
Rewards interpersonal sensitivity and reflective practice.
Requires boundaries, ethics and consistent presence.
Offers tangible, personal impact on wellbeing.
Matches preference for meaningful, people-centered work.
Fits those motivated by helping others grow.`,

  Psychologist: `Studies and supports human behavior and mental health.
Suited to analytical empathy and diagnostic thinking.
Involves assessment, therapy and research components.
Rewards deep understanding of individual differences.
Requires scientific rigor plus interpersonal skill.
Offers clinical, research and applied career tracks.
Matches preference for combining science with care.
Appeals to those who want structured support roles.`,

  Writer: `Translates ideas into clear, persuasive text.
Suited to reflective, expressive and structured thinkers.
Involves drafting, editing and audience awareness.
Rewards clarity, narrative skill and consistency.
Offers flexible formats: creative, technical or marketing.
Fits those who enjoy solitary, focused creative work.
Provides channels to influence and inform readers.
Matches preference for shaping ideas through language.`,

  Teacher: `Designs learning experiences and supports development.
Suited to clear communicators and patient facilitators.
Involves lesson planning, assessment and feedback.
Rewards seeing learners progress over time.
Requires adaptability and classroom management skills.
Offers direct social impact and community engagement.
Matches preference for structured, relational roles.
Fits those who enjoy explaining and mentoring others.`,

  Artist: `Focuses on expression, originality and aesthetic creation.
Suited to imaginative, experimental and risk-taking minds.
Involves iterative craft and personal voice development.
Rewards authenticity and continuous skill refinement.
Offers flexible, project-driven work rhythms.
Requires tolerance for uncertainty and variable income.
Matches preference for autonomy and creative freedom.
Appeals to those motivated by aesthetic impact.`,

  SocialWorker: `Supports individuals through practical and emotional help.
Suited to compassionate, resilient and organized people.
Involves casework, advocacy and community coordination.
Rewards direct measurable improvements in clients’ lives.
Requires strong boundaries and administrative skills.
Offers varied settings (clinical, community, policy).
Matches preference for people-centered, service work.
Fits those who want direct social impact and support.`,

  MarketingSpecialist: `Crafts messaging and positions products for audiences.
Suited to creative strategists who enjoy data-driven tests.
Involves campaign planning, analytics and storytelling.
Rewards persuasive communication and audience insight.
Offers cross-functional collaboration with product and sales.
Matches preference for measurable creative impact.
Adapts to fast feedback cycles and market shifts.
Fits those who enjoy shaping perception and growth.`,

  Actor: `Brings characters and stories to life through performance.
Suited to expressive, resilient and creative individuals.
Involves rehearsal, emotional range and stage presence.
Rewards authenticity and audience engagement.
Requires adaptability to varied roles and feedback.
Offers artistic fulfillment and recognition opportunities.
Matches preference for expressive, people-facing work.
Appeals to those who thrive in dynamic, performance settings.`,

  Leader: `Guides teams toward shared goals and success.
Suited to confident, visionary and organized individuals.
Involves decision-making, communication and motivation.
Rewards responsibility, trust and consistent effort.
Requires emotional intelligence and adaptability.
Offers chances to influence culture and outcomes.
Matches preference for structure and social leadership.
Fits those who find fulfillment in guiding others.`,

  HRManager: `Manages employee relations, recruitment and development.
Suited to empathetic, strategic and people-oriented individuals.
Involves policy design, performance management and mediation.
Rewards fairness, listening and clear communication.
Requires confidentiality and organizational insight.
Offers opportunities to shape workplace culture.
Matches preference for structured, people-centered work.
Fits those who enjoy supporting talent and growth.`,

  ScoutLeader: `Mentors youth through skill-building and community projects.
Suited to patient, responsible and encouraging personalities.
Involves teaching teamwork, discipline and leadership.
Rewards meaningful, long-term developmental impact.
Requires planning and coordination of group activities.
Offers community involvement and social contribution.
Matches preference for mentorship and group engagement.
Appeals to those passionate about guiding the next generation.`,

  Accountant: `Manages financial records, compliance and reporting.
Suited to methodical, detail-focused and rule-oriented people.
Involves reconciliations, audits and structured processes.
Rewards accuracy, reliability and process improvement.
Offers clear career progression and professional credentials.
Requires comfort with numeric precision and deadlines.
Matches preference for predictable, structured work.
Fits those who value order and financial clarity.`,

  Auditor: `Reviews processes for accuracy, risk and compliance.
Suited to objective, thorough and investigative minds.
Involves evidence collection, testing and reporting.
Rewards clarity in accountability and controls improvement.
Offers exposure to varied business areas and standards.
Requires skeptical thinking and organized documentation.
Matches preference for rule-based and systematic tasks.
Fits those who enjoy ensuring reliability and governance.`,

  PoliceOfficer: `Maintains public safety and enforces laws.
Suited to disciplined, courageous and observant individuals.
Involves patrol, investigation and crisis response.
Rewards integrity, composure and service commitment.
Requires quick decision-making under pressure.
Offers opportunities to protect and serve communities.
Matches preference for structured, impactful work.
Fits those who value justice and public safety.`,

  Military: `Protects national interests through disciplined service.
Suited to duty-driven, resilient and structured individuals.
Involves teamwork, strategy and physical endurance.
Rewards loyalty, precision and leadership growth.
Requires discipline and readiness for challenge.
Offers career paths across technical and strategic roles.
Matches preference for structured, mission-oriented environments.
Fits those committed to service and excellence.`,

  Nurse: `Provides hands-on care and medical support to patients.
Suited to empathetic, resilient and practical individuals.
Involves clinical assessment, procedures and coordination.
Rewards immediate, tangible improvements in wellbeing.
Requires stamina, adaptability and teamwork under pressure.
Offers varied specializations and career mobility.
Matches preference for service-oriented, applied roles.
Fits those who value caregiving and practical problem solving.`,

  HealthcareProvider: `Delivers diagnosis, treatment and ongoing care to patients.
Suited to scientifically-minded and empathetic practitioners.
Involves clinical decision-making and multidisciplinary work.
Rewards responsibility for patient outcomes and improvement.
Requires lengthy training, ethics and regulatory compliance.
Offers stable demand and meaningful societal contribution.
Matches preference for applied science and human impact.
Fits those committed to long-term professional development.`,

  Librarian: `Organizes and facilitates access to knowledge resources.
Suited to detail-oriented, organized and service-minded individuals.
Involves cataloging, research assistance and information literacy.
Rewards precision, helpfulness and patience.
Requires strong communication and digital literacy.
Offers calm, structured work environments.
Matches preference for order and educational support.
Fits those who value learning and information sharing.`,

  Administrator: `Coordinates and manages organizational operations.
Suited to efficient, organized and responsible individuals.
Involves scheduling, budgeting and records management.
Rewards reliability, foresight and multitasking.
Requires communication with staff and leadership.
Offers structured, predictable workflow and stability.
Matches preference for process optimization and structure.
Fits those who enjoy coordination and system management.`,

  ProjectManager: `Oversees planning, execution and delivery of projects.
Suited to organized, communicative and strategic thinkers.
Involves coordination of people, timelines and resources.
Rewards leadership, foresight and accountability.
Requires multitasking and risk management skills.
Offers visible outcomes and measurable success metrics.
Matches preference for structure and organized teamwork.
Fits those who enjoy turning plans into results.`,

  Banker: `Manages financial assets, lending and investment operations.
Suited to analytical, disciplined and trustworthy individuals.
Involves financial advising, credit assessment and transactions.
Rewards responsibility, ethics and accuracy.
Offers professional growth and financial acumen.
Requires regulatory knowledge and communication skills.
Matches preference for stable, quantitative environments.
Fits those who value structure and client service.`,

  Judge: `Interprets and applies laws to ensure justice.
Suited to analytical, impartial and ethical individuals.
Involves reviewing evidence and delivering fair rulings.
Rewards patience, reasoning and societal trust.
Requires legal expertise and strong moral grounding.
Offers significant social influence and responsibility.
Matches preference for logic and fairness.
Fits those who value justice and civic duty.`,

  EventPlanner: `Designs and executes events for clients or organizations.
Suited to organized, creative and communicative individuals.
Involves budgeting, coordination and vendor management.
Rewards attention to detail and problem-solving.
Requires adaptability under pressure and client focus.
Offers creative satisfaction and visible results.
Matches preference for structured yet dynamic work.
Fits those who enjoy organizing memorable experiences.`,

  Mechanic: `Repairs and maintains mechanical systems and vehicles.
Suited to hands-on, practical and diagnostic thinkers.
Involves troubleshooting, maintenance and component testing.
Rewards precision and mechanical understanding.
Requires patience and safety awareness.
Offers job stability and tangible problem-solving.
Matches preference for practical, result-driven tasks.
Fits those who enjoy working with tools and systems.`,

  Pilot: `Operates aircraft to transport passengers or cargo.
Suited to disciplined, focused and calm individuals.
Involves navigation, communication and systems control.
Rewards precision, responsibility and situational awareness.
Requires training, certification and adherence to safety.
Offers travel opportunities and prestige.
Matches preference for structured, technical environments.
Fits those who thrive under pressure and precision.`,

  Detective: `Investigates facts to solve complex, real-world problems.
Suited to analytical, observant and methodical investigators.
Involves evidence synthesis, interviewing and deduction.
Rewards problem-solving under uncertainty and time pressure.
Requires discretion, resilience and procedural rigor.
Offers high-impact outcomes for public safety and justice.
Matches preference for applied investigation and systems thinking.
Fits those who enjoy piecing disparate clues together.`,

  Designer: `Solves problems through user-centered visual and product design.
Suited to creative, empathetic and iterative thinkers.
Involves prototyping, user research and aesthetic decisions.
Rewards clarity of communication and usability improvements.
Requires collaboration across research and engineering teams.
Offers tangible outputs and user impact.
Matches preference for craft, iteration and creativity.
Fits those who enjoy shaping user experiences.`,

  Chef: `Combines craft, timing and creativity in food preparation.
Suited to hands-on, disciplined and sensory-focused people.
Involves menu design, technique and quality control.
Rewards immediate feedback and tangible results.
Requires stamina, precision and working under pressure.
Offers entrepreneurial and creative career paths.
Matches preference for craft-oriented, practical work.
Fits those who take pride in producing sensory experiences.`,

  Guide: `Leads groups through informative or experiential journeys.
Suited to outgoing, knowledgeable and patient communicators.
Involves storytelling, logistics coordination and safety.
Rewards enthusiasm, reliability and people skills.
Requires adaptability to varied audiences and conditions.
Offers travel, cultural exchange and interpersonal engagement.
Matches preference for dynamic, people-centered work.
Fits those who enjoy educating and inspiring others.`,

  EventCoordinator: `Plans and manages logistics for gatherings and events.
Suited to organized, detail-oriented and adaptable individuals.
Involves scheduling, budgeting and team coordination.
Rewards multitasking, problem-solving and creativity.
Requires calmness under pressure and client focus.
Offers visible, rewarding outcomes through collaboration.
Matches preference for dynamic, structured work.
Fits those who enjoy managing experiences and details.`,

  FitnessTrainer: `Helps clients achieve health and performance goals.
Suited to motivational, disciplined and interpersonal people.
Involves program design, coaching and measurable progress.
Rewards direct client outcomes and visible results.
Requires empathy, teaching ability and consistency.
Offers flexible scheduling and entrepreneurial opportunities.
Matches preference for active, people-facing work.
Fits those who enjoy coaching and physical wellbeing.`,

  Paramedic: `Responds to urgent medical situations with rapid care.
Suited to calm, decisive and technical responders.
Involves on-site triage, stabilization and teamwork.
Rewards saving lives and immediate clinical impact.
Requires physical stamina and high stress tolerance.
Offers meaningful, public-service oriented work.
Matches preference for action, quick judgment and hands-on care.
Fits those who perform reliably under pressure.`,

  PhysicalTherapist: `Provides rehabilitation and mobility improvement through therapeutic exercise.
Suited to hands-on, practical and patient-focused practitioners.
Involves assessment, treatment planning and progress tracking.
Rewards observing measurable recovery and functional gains.
Requires strong anatomy knowledge and manual therapy skills.
Involves frequent patient communication and care coordination.
Offers varied settings: hospitals, clinics, sports and community care.
Matches preference for applied healthcare and problem-solving.`,

  Sales: `Builds relationships and persuades stakeholders to act.
Suited to confident, goal-driven and resilient communicators.
Involves negotiation, pipeline management and target focus.
Rewards measurable outcomes via commissions and growth.
Requires comfort with rejection and fast-paced interaction.
Offers clear performance-based progression and metrics.
Matches preference for social influence and outcome orientation.
Fits those who enjoy persuasion and client-facing roles.`,

  Performer: `Engages audiences through expressive skills and stagecraft.
Suited to extroverted, resilient and expressive individuals.
Involves rehearsal discipline, live execution and feedback.
Rewards emotional connection and creative expression.
Requires stamina, adaptability and audience awareness.
Offers variable career paths across media and live venues.
Matches preference for public-facing creative work.
Fits those who thrive on performance energy and presence.`,
};

export default function SuitableCareers() {
  const navigate = useNavigate();

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
  const careers = mbtiCareers[mbti] || [];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.logo}>AI</div>
          <div>Career Counsellor</div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Recommended Careers for {mbti}</h2>

          {careers.length === 0 ? (
            <p style={{ color: "#374151" }}>No specific recommended careers found.</p>
          ) : (
            careers.map((career) => (
              <div key={career} style={{ background: "#f8fafc", padding: 12, borderRadius: 8, marginBottom: 12 }}>
                <h4 style={{ margin: 0 }}>{career}</h4>
                <p style={{ marginTop: 6, color: "#374151", whiteSpace: "pre-line" }}>
                  {careerDetails[career.replace(/\s+/g, '')] || "This career matches core strengths detected in your profile."}
                </p>
              </div>
            ))
          )}

          <div style={{ marginTop: 18 }}>
            <button style={styles.primary} onClick={() => navigate("/assessment/graph-result")}>
              Back to Summary
            </button>
          </div>
        </div>
      </main>

      <footer style={styles.footer}> {new Date().getFullYear()} AI Career Counsellor</footer>
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