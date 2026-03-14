import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;700;900&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{
  font-family:'Source Serif 4',Georgia,serif;
  background:#f5f5f0;
  color:#1a1a1a;
  font-weight:300;
}

:root{
  --white:#ffffff;
  --off:#f5f5f0;
  --ink:#1a1a1a;
  --red:#cc0000;
  --blue:#003380;
  --grid:#d8d8d0;
  --muted:#666660;
  --light:#ebebE6;
}

/* GRID BACKGROUND */
.doc{
  min-height:100vh;
  background:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px),
    var(--off);
  background-size: 48px 48px;
  position:relative;
}

/* SIDEBAR */
.layout{display:flex;min-height:100vh;}
.sidebar{
  width:260px;flex-shrink:0;
  background:var(--ink);
  position:sticky;top:0;height:100vh;
  display:flex;flex-direction:column;
  overflow:hidden;
  z-index:100;
}
.sb-logo{
  padding:32px 28px 24px;
  border-bottom:1px solid rgba(255,255,255,0.08);
}
.sb-monogram{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:3.2rem;font-weight:900;
  color:var(--white);
  line-height:1;
  letter-spacing:-0.02em;
}
.sb-monogram span{color:var(--red);}
.sb-inst{
  font-family:'JetBrains Mono',monospace;
  font-size:0.58rem;color:rgba(255,255,255,0.35);
  letter-spacing:0.1em;margin-top:6px;
  line-height:1.5;
}
.sb-nav{flex:1;padding:24px 0;overflow-y:auto;}
.sb-section-label{
  font-family:'JetBrains Mono',monospace;
  font-size:0.52rem;color:rgba(255,255,255,0.25);
  letter-spacing:0.2em;text-transform:uppercase;
  padding:0 28px;margin-bottom:8px;margin-top:20px;
}
.sb-section-label:first-child{margin-top:0;}
.sb-link{
  display:flex;align-items:center;gap:12px;
  padding:9px 28px;
  font-family:'Source Serif 4',serif;
  font-size:0.82rem;font-weight:400;
  color:rgba(255,255,255,0.5);
  text-decoration:none;
  transition:all 0.18s;
  border-left:2px solid transparent;
}
.sb-link:hover{color:var(--white);border-left-color:var(--red);background:rgba(255,255,255,0.04);}
.sb-link-num{
  font-family:'JetBrains Mono',monospace;
  font-size:0.62rem;color:var(--red);
  flex-shrink:0;min-width:28px;
}
.sb-res{
  margin:20px 20px 28px;
  background:var(--red);
  color:#fff;text-decoration:none;
  font-family:'Big Shoulders Display',sans-serif;
  font-size:0.78rem;font-weight:700;
  letter-spacing:0.12em;text-transform:uppercase;
  padding:12px 16px;
  display:block;text-align:center;
  transition:background 0.2s;
}
.sb-res:hover{background:#aa0000;}
.sb-status{
  margin:0 20px 20px;
  border:1px solid rgba(255,255,255,0.1);
  padding:12px 14px;
}
.sb-status-dot{
  width:7px;height:7px;border-radius:50%;
  background:#22cc66;
  display:inline-block;margin-right:7px;
  box-shadow:0 0 8px #22cc66;
  animation:pulse 2s infinite;
}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
.sb-status-txt{
  font-family:'JetBrains Mono',monospace;
  font-size:0.6rem;color:rgba(255,255,255,0.5);
  letter-spacing:0.06em;
}

/* MAIN */
.main{flex:1;min-width:0;padding:0 72px 100px;max-width:900px;}

/* PAGE HEADER */
.page-hdr{
  padding:60px 0 40px;
  border-bottom:3px solid var(--ink);
  margin-bottom:0;
  animation:fadein 0.6s ease both;
}
.ph-doc-num{
  font-family:'JetBrains Mono',monospace;
  font-size:0.64rem;color:var(--muted);
  letter-spacing:0.16em;margin-bottom:14px;
  display:flex;align-items:center;gap:16px;
}
.ph-doc-num::after{content:'';flex:1;height:1px;background:var(--grid);}
.ph-name{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:clamp(3.5rem,6vw,6rem);
  font-weight:900;
  color:var(--ink);
  line-height:0.88;
  letter-spacing:-0.02em;
  margin-bottom:14px;
}
.ph-name em{font-style:normal;color:var(--red);}
.ph-title{
  font-family:'Source Serif 4',serif;
  font-size:1.1rem;font-weight:300;
  font-style:italic;
  color:var(--muted);
  margin-bottom:28px;
  letter-spacing:0.01em;
}
.ph-meta{
  display:grid;grid-template-columns:repeat(4,1fr);
  gap:0;
  border:1px solid var(--grid);
  background:var(--white);
}
.ph-cell{
  padding:14px 18px;
  border-right:1px solid var(--grid);
}
.ph-cell:last-child{border-right:none;}
.ph-cell-l{
  font-family:'JetBrains Mono',monospace;
  font-size:0.55rem;color:var(--red);
  letter-spacing:0.14em;text-transform:uppercase;
  margin-bottom:4px;
}
.ph-cell-v{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:1rem;font-weight:700;color:var(--ink);
}

/* SECTION */
.section{
  padding:52px 0 0;
  animation:fadein 0.7s ease both;
}
@keyframes fadein{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
.sec-hdr{
  display:grid;
  grid-template-columns:64px 1fr;
  gap:0;
  border-top:3px solid var(--ink);
  margin-bottom:32px;
  padding-top:16px;
  align-items:start;
}
.sec-num{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:2.2rem;font-weight:900;
  color:var(--red);
  line-height:1;
  letter-spacing:-0.02em;
}
.sec-right{}
.sec-label{
  font-family:'JetBrains Mono',monospace;
  font-size:0.58rem;color:var(--muted);
  letter-spacing:0.18em;text-transform:uppercase;
  margin-bottom:3px;
}
.sec-title{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:1.8rem;font-weight:700;
  color:var(--ink);line-height:1;
  letter-spacing:-0.01em;
}

/* ABOUT */
.about-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:start;}
.about-body p{
  font-size:0.96rem;line-height:1.92;
  color:var(--ink);margin-bottom:14px;
  font-weight:300;
  text-align:justify;
}
.about-body strong{font-weight:600;color:var(--ink);}
.data-table{border:1px solid var(--grid);background:var(--white);}
.dt-header{
  background:var(--ink);padding:10px 16px;
  font-family:'Big Shoulders Display',sans-serif;
  font-size:0.78rem;font-weight:700;
  color:var(--white);letter-spacing:0.12em;text-transform:uppercase;
}
.dt-row{
  display:grid;grid-template-columns:140px 1fr;
  border-bottom:1px solid var(--grid);
}
.dt-row:last-child{border-bottom:none;}
.dt-k{
  padding:10px 16px;
  font-family:'JetBrains Mono',monospace;
  font-size:0.66rem;color:var(--muted);
  border-right:1px solid var(--grid);
  letter-spacing:0.06em;
  background:rgba(0,0,0,0.02);
  display:flex;align-items:center;
}
.dt-v{
  padding:10px 16px;
  font-size:0.84rem;font-weight:400;color:var(--ink);
  display:flex;align-items:center;
}
.dt-v.accent{color:var(--red);font-weight:600;}
.dt-v.blue{color:var(--blue);font-weight:600;}

/* RESEARCH — PRIDE OF PLACE */
.research-block{
  border-left:4px solid var(--red);
  background:var(--white);
  border:1px solid var(--grid);
  border-left:4px solid var(--red);
}
.rb-head{
  background:rgba(204,0,0,0.05);
  border-bottom:1px solid var(--grid);
  padding:14px 24px;
  display:flex;align-items:center;gap:16px;
}
.rb-badge{
  font-family:'JetBrains Mono',monospace;
  font-size:0.56rem;color:var(--white);
  background:var(--red);
  padding:3px 10px;letter-spacing:0.12em;
  flex-shrink:0;
}
.rb-journal{font-family:'JetBrains Mono',monospace;font-size:0.64rem;color:var(--muted);letter-spacing:0.06em;}
.rb-body{padding:24px;}
.rb-title{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:1.3rem;font-weight:700;
  color:var(--ink);line-height:1.22;
  margin-bottom:10px;letter-spacing:-0.01em;
}
.rb-authors{
  font-family:'Source Serif 4',serif;
  font-size:0.84rem;color:var(--blue);
  font-style:italic;margin-bottom:12px;
}
.rb-meta-row{
  display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;
}
.rb-meta-item{
  font-family:'JetBrains Mono',monospace;
  font-size:0.6rem;color:var(--muted);
  border:1px solid var(--grid);
  padding:4px 10px;background:var(--off);
}
.rb-abstract{
  font-size:0.88rem;line-height:1.86;
  color:var(--ink);font-weight:300;
  border-top:1px solid var(--grid);
  padding-top:14px;margin-bottom:14px;
  text-align:justify;
}
.rb-kws{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;}
.rb-kw{
  font-family:'JetBrains Mono',monospace;
  font-size:0.58rem;color:var(--blue);
  border:1px solid rgba(0,51,128,0.25);
  padding:3px 9px;background:rgba(0,51,128,0.04);
}
.btn{
  display:inline-flex;align-items:center;gap:8px;
  padding:10px 22px;
  font-family:'Big Shoulders Display',sans-serif;
  font-size:0.8rem;font-weight:700;letter-spacing:0.1em;
  text-transform:uppercase;text-decoration:none;
  transition:all 0.18s;cursor:pointer;border:none;
}
.btn-red{background:var(--red);color:#fff;}
.btn-red:hover{background:#aa0000;}
.btn-outline{background:transparent;color:var(--ink);border:1.5px solid var(--ink);}
.btn-outline:hover{background:var(--ink);color:#fff;}

/* PROJECTS */
.proj-list{display:flex;flex-direction:column;gap:0;}
.proj{
  display:grid;grid-template-columns:64px 1fr;
  gap:0;
  border-bottom:1px solid var(--grid);
  padding:22px 0;
  transition:background 0.18s;
}
.proj:last-child{border-bottom:none;}
.proj:hover{background:var(--white);margin:0 -24px;padding:22px 24px;}
.proj-n{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:1.6rem;font-weight:900;
  color:var(--grid);line-height:1;
  letter-spacing:-0.02em;padding-top:2px;
}
.proj-content{}
.proj-cat{
  font-family:'JetBrains Mono',monospace;
  font-size:0.56rem;color:var(--red);
  letter-spacing:0.14em;text-transform:uppercase;
  margin-bottom:4px;
}
.proj-title{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:1.25rem;font-weight:700;
  color:var(--ink);line-height:1.1;
  margin-bottom:6px;letter-spacing:-0.01em;
}
.proj-desc{
  font-size:0.86rem;line-height:1.78;
  color:var(--muted);margin-bottom:10px;
  font-weight:300;
}
.tech{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;}
.tech span{
  font-family:'JetBrains Mono',monospace;
  font-size:0.58rem;color:var(--muted);
  border:1px solid var(--grid);
  padding:3px 7px;background:var(--white);
}
.plinks{display:flex;gap:14px;}
.plink{
  font-family:'JetBrains Mono',monospace;
  font-size:0.62rem;color:var(--blue);
  text-decoration:none;
  letter-spacing:0.04em;
  border-bottom:1px solid rgba(0,51,128,0.3);
  transition:all 0.18s;
  padding-bottom:1px;
}
.plink:hover{color:var(--red);border-bottom-color:var(--red);}

/* SKILLS */
.skills-table{background:var(--white);border:1px solid var(--grid);}
.sk-row{
  display:grid;grid-template-columns:200px 1fr;
  border-bottom:1px solid var(--grid);
}
.sk-row:last-child{border-bottom:none;}
.sk-cat{
  padding:16px 20px;
  font-family:'Big Shoulders Display',sans-serif;
  font-size:0.88rem;font-weight:700;
  color:var(--white);
  background:var(--ink);
  letter-spacing:0.06em;text-transform:uppercase;
  display:flex;align-items:center;
  border-right:1px solid rgba(255,255,255,0.08);
}
.sk-tags{padding:14px 20px;display:flex;flex-wrap:wrap;gap:6px;align-content:flex-start;align-items:center;}
.sk-tag{
  font-family:'Source Serif 4',serif;
  font-size:0.8rem;font-weight:400;
  color:var(--ink);
  border:1px solid var(--grid);
  padding:4px 11px;
  background:var(--off);
  transition:all 0.16s;
}
.sk-tag:hover{background:var(--ink);color:#fff;border-color:var(--ink);}

/* EXPERIENCE */
.exp-list{display:flex;flex-direction:column;gap:0;}
.exp-item{
  display:grid;grid-template-columns:180px 1fr;
  gap:0;
  border-bottom:1px solid var(--grid);
  padding:24px 0;
}
.exp-item:last-child{border-bottom:none;}
.exp-left{padding-right:24px;border-right:1px solid var(--grid);}
.exp-period{
  font-family:'JetBrains Mono',monospace;
  font-size:0.64rem;color:var(--red);
  letter-spacing:0.08em;margin-bottom:6px;
  line-height:1.5;
}
.exp-org{
  font-size:0.78rem;font-weight:400;
  color:var(--muted);line-height:1.5;font-style:italic;
}
.exp-right{padding-left:24px;}
.exp-role{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:1.1rem;font-weight:700;
  color:var(--ink);margin-bottom:10px;
  letter-spacing:-0.01em;
}
.exp-ul{list-style:none;}
.exp-ul li{
  font-size:0.84rem;line-height:1.78;
  color:var(--ink);font-weight:300;
  padding-left:16px;position:relative;
  margin-bottom:4px;
}
.exp-ul li::before{
  content:'–';position:absolute;left:0;
  color:var(--red);font-weight:400;
}

/* CONTACT */
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid var(--grid);background:var(--white);}
.contact-left{padding:32px;border-right:1px solid var(--grid);}
.contact-right{padding:32px;}
.cf{display:flex;flex-direction:column;gap:14px;}
.cf-row{display:flex;flex-direction:column;gap:4px;}
.cf-label{
  font-family:'JetBrains Mono',monospace;
  font-size:0.58rem;color:var(--muted);
  letter-spacing:0.14em;text-transform:uppercase;
}
.fi{
  font-family:'Source Serif 4',serif;font-size:0.9rem;
  background:var(--off);
  border:1px solid var(--grid);border-radius:0;
  padding:10px 14px;color:var(--ink);outline:none;
  transition:border-color 0.2s;width:100%;font-weight:300;
}
.fi:focus{border-color:var(--ink);}
.fta{
  font-family:'Source Serif 4',serif;font-size:0.9rem;
  background:var(--off);
  border:1px solid var(--grid);border-radius:0;
  padding:10px 14px;color:var(--ink);outline:none;
  transition:border-color 0.2s;width:100%;
  resize:vertical;min-height:120px;font-weight:300;
}
.fta:focus{border-color:var(--ink);}
.fsub{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:0.82rem;font-weight:700;
  letter-spacing:0.12em;text-transform:uppercase;
  background:var(--ink);color:#fff;
  border:none;padding:12px 28px;
  cursor:pointer;transition:all 0.18s;
  align-self:flex-start;
}
.fsub:hover{background:var(--red);}
.fsub:disabled{opacity:0.4;cursor:not-allowed;}
.fst-ok{font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#1a7a3a;letter-spacing:0.06em;}
.fst-err{font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:var(--red);}
.contact-links{display:flex;flex-direction:column;gap:0;}
.cl-item{
  display:flex;align-items:center;gap:0;
  border-bottom:1px solid var(--grid);
  text-decoration:none;
  transition:background 0.16s;
}
.cl-item:last-child{border-bottom:none;}
.cl-item:hover{background:var(--off);}
.cl-type{
  width:120px;flex-shrink:0;
  font-family:'JetBrains Mono',monospace;
  font-size:0.6rem;color:var(--muted);
  letter-spacing:0.1em;text-transform:uppercase;
  padding:13px 14px;
  border-right:1px solid var(--grid);
}
.cl-val{
  padding:13px 16px;
  font-size:0.84rem;color:var(--blue);
  font-weight:400;
}
.cl-val:hover{color:var(--red);}

/* FOOTER */
.foot{
  border-top:3px solid var(--ink);
  padding:28px 72px;
  display:flex;justify-content:space-between;align-items:center;
  background:var(--white);
  position:relative;z-index:1;
}
.foot-left{
  font-family:'JetBrains Mono',monospace;
  font-size:0.6rem;color:var(--muted);
  letter-spacing:0.1em;line-height:1.7;
}
.foot-left span{color:var(--red);}
.foot-right{
  font-family:'Big Shoulders Display',sans-serif;
  font-size:2rem;font-weight:900;color:var(--grid);
  letter-spacing:-0.02em;
}

@media(max-width:900px){
  .layout{flex-direction:column;}
  .sidebar{width:100%;height:auto;position:relative;}
  .sb-nav{display:none;}
  .main{padding:0 24px 60px;}
  .about-grid{grid-template-columns:1fr;}
  .proj{grid-template-columns:40px 1fr;}
  .exp-item{grid-template-columns:1fr;}
  .exp-left{border-right:none;padding-right:0;margin-bottom:10px;}
  .exp-right{padding-left:0;}
  .contact-grid{grid-template-columns:1fr;}
  .contact-left{border-right:none;border-bottom:1px solid var(--grid);}
  .ph-meta{grid-template-columns:1fr 1fr;}
  .foot{flex-direction:column;gap:12px;padding:24px;}
  .sk-row{grid-template-columns:1fr;}
  .sk-cat{border-right:none;border-bottom:1px solid rgba(255,255,255,0.08);}
}
`;

const PROJECTS = [
  { n: "01", cat: "AI / Explainability", title: "Gastro-XAI", desc: "Explainable AI framework for gastrointestinal disease classification and polyp segmentation. Integrates Grad-CAM visualisations with deep learning; produces clinician-readable automated reports.", tech: ["Python", "PyTorch", "Flask", "React", "Grad-CAM"], gh: "https://github.com/sarthakpapneja/Gastro-XAI", live: null },
  { n: "02", cat: "AI / Auditing", title: "ModelAuditAI", desc: "Production-grade ML audit system evaluating models across Performance, Fairness, Drift, Overfitting, and Leakage dimensions. Generates comprehensive model health reports.", tech: ["TypeScript", "React", "Python", "FastAPI"], gh: "https://github.com/sarthakpapneja/ML-Auditor", live: null },
  { n: "03", cat: "NLP / AI", title: "Resume Analyzer", desc: "Intelligent resume parsing tool delivering actionable insights, skill gap analysis, and ATS compatibility scoring.", tech: ["TypeScript", "React", "Python", "NLP"], gh: "https://github.com/sarthakpapneja/resume-analyzer", live: null },
  { n: "04", cat: "Full-Stack", title: "Finance Track", desc: "MERN stack finance tracker with transaction management, balance computation, data visualisation, and responsive dashboard.", tech: ["JavaScript", "React", "Node.js", "MongoDB", "Express"], gh: "https://github.com/sarthakpapneja/Finance-Track", live: null },
  { n: "05", cat: "AI / FinTech", title: "Regulatory Reporting Assistant", desc: "AI-powered assistant streamlining regulatory compliance and financial reporting workflows through intelligent automation.", tech: ["Python", "Flask", "AI/ML"], gh: "https://github.com/sarthakpapneja/Regulatory-Reporting-Assistant", live: null },
  { n: "06", cat: "Computer Vision", title: "RoadVision VMS", desc: "Vehicle Management System applying computer vision to road monitoring, traffic analysis, and automated vehicle tracking.", tech: ["Python", "Computer Vision", "Deep Learning"], gh: "https://github.com/sarthakpapneja/RoadVision-VMS", live: null },
  { n: "07", cat: "Web Development", title: "School Website", desc: "Full-featured institutional website with dynamic content, event management, video integration and responsive design.", tech: ["JavaScript", "React", "Vite", "CSS"], gh: "https://github.com/sarthakpapneja/school-website-", live: "https://school-website-murex-seven.vercel.app/" },
  { n: "08", cat: "Database Systems", title: "Bank Security System", desc: "Bank management application ensuring data segregation and integrity through Role-Based Access Control (RBAC).", tech: ["Python", "MySQL", "RBAC"], gh: "https://github.com/sarthakpapneja/banksecuritysystem", live: null },
  { n: "09", cat: "Data Science", title: "Table Detection Model", desc: "Encoder-decoder deep learning model (TableNet architecture, VGG-19 backbone) for table detection with integrated OCR.", tech: ["Deep Learning", "Python", "OCR", "VGG-19"], gh: null, live: "https://colab.research.google.com/drive/1xpn7qXNKuUoMzCklZjbyLiv23v8SheIN?usp=sharing" },
];

const SKILLS = [
  { cat: "Core Concepts", tags: ["Computer Architecture", "AI", "DBMS", "Operating Systems", "Computer Networks", "OOP"] },
  { cat: "Languages", tags: ["C", "C++", "Java", "JavaScript", "Python", "TypeScript"] },
  { cat: "Web & Frameworks", tags: ["ReactJS", "Next.js", "Tailwind CSS", "HTML", "CSS", "Flask", "FastAPI", "Node.js", "Figma"] },
  { cat: "AI / ML", tags: ["PyTorch", "Deep Learning", "Computer Vision", "NLP", "Grad-CAM", "XAI", "Streamlit"] },
  { cat: "Data & Analytics", tags: ["SQL", "PowerBI", "Excel", "Tableau", "MySQL", "MongoDB"] },
  { cat: "Cloud & Infra", tags: ["AWS EC2", "IAM", "VPC", "S3", "RDS", "CloudFront", "GCP"] },
  { cat: "Hardware", tags: ["Raspberry Pi", "Arduino"] },
];

const EXP = [
  { period: "June 2025\n– July 2025", org: "Velocis Systems\nNoida, India", role: "Cloud Intern", bullets: ["Deployed and managed infrastructure across AWS and Google Cloud: EC2, IAM, VPC, RDS, CloudFront, Load Balancer.", "Supported enterprise-grade solutions in collaborative, fast-paced project environments."] },
  { period: "June 2023\n– Present", org: "Android Club\nVIT Chennai", role: "Operations Member", bullets: ["Organised and executed technical events; delivered dedicated UI/UX seminar session.", "Collaborated with project teams ensuring on-schedule task completion.", "Drove operational improvements through leadership and process refinement."] },
  { period: "Sep – Nov\n2023", org: "Microsoft Innovations Club\nVIT Chennai", role: "UI/UX Member", bullets: ["Redesigned event club interfaces applying advanced UI principles.", "Increased user access by 30%; reduced event registration time by 20%."] },
  { period: "Various", org: "Smart India\nHackathon", role: "Core Developer", bullets: ["Represented institution as core developer in national-level competition."] },
];

const RKW = ["Post-Quantum Cryptography", "SPHINCS+", "IPFS", "Verifiable Credentials", "Decentralized Notary", "Quantum-Resistant Security"];

const DOC_ID = "SP-CSE-2022-VIT-v4.0";
const TODAY = new Date().toISOString().split("T")[0];

export default function Portfolio() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = async (e) => {
    e.preventDefault(); setStatus("sending");
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ access_key: "d9743274-bd82-40a7-9d2b-b6b785c6c275", subject: "New Contact from Portfolio", from_name: "Portfolio Contact Form", ...form }) });
      if (r.ok) { setStatus("ok"); setForm({ name: "", email: "", message: "" }); } else setStatus("err");
    } catch { setStatus("err"); }
  };

  return (<>
    <style>{CSS}</style>
    <div className="doc">
      <div className="layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-logo">
            <div className="sb-monogram">S<span>.</span>P<span>.</span></div>
            <div className="sb-inst">SARTHAK PAPNEJA<br />B.TECH CSE · VIT CHENNAI<br />PORTFOLIO DOSSIER</div>
          </div>
          <nav className="sb-nav">
            <div className="sb-section-label">Navigation</div>
            <a href="#about" className="sb-link"><span className="sb-link-num">§ 1</span>Curriculum Vitae</a>
            <a href="#research" className="sb-link"><span className="sb-link-num">§ 2</span>Research</a>
            <a href="#projects" className="sb-link"><span className="sb-link-num">§ 3</span>Project Work</a>
            <a href="#skills" className="sb-link"><span className="sb-link-num">§ 4</span>Technical Skills</a>
            <a href="#experience" className="sb-link"><span className="sb-link-num">§ 5</span>Experience</a>
            <a href="#contact" className="sb-link"><span className="sb-link-num">§ 6</span>Contact</a>
            <div className="sb-section-label">Documents</div>
            <a href="https://www.linkedin.com/in/sarthak-papneja-485118232/" target="_blank" className="sb-link"><span className="sb-link-num">↗️</span>LinkedIn</a>
            <a href="https://github.com/sarthakpapneja" target="_blank" className="sb-link"><span className="sb-link-num">↗️</span>GitHub</a>
            <a href="https://www.researchgate.net/profile/Sarthak-Papneja" target="_blank" className="sb-link"><span className="sb-link-num">↗️</span>ResearchGate</a>
          </nav>
          <div className="sb-status">
            <span className="sb-status-dot" /><span className="sb-status-txt">Available · Class of 2026</span>
          </div>
          <a href="https://drive.google.com/file/d/1u3hQLi61BAbKneym4_QYbEXHYJYvHuio/view?usp=sharing" target="_blank" className="sb-res">↓ Download Résumé</a>
        </aside>

        {/* MAIN */}
        <main className="main">

          {/* PAGE HEADER */}
          <div className="page-hdr" id="top">
            <div className="ph-doc-num">DOC · {DOC_ID} · {TODAY}</div>
            <h1 className="ph-name">Sarthak<br /><em>Papneja</em></h1>
            <div className="ph-title">Aspiring Software Engineer — AI/ML · Cloud · Full-Stack Development</div>
            <div className="ph-meta">
              <div className="ph-cell">
                <div className="ph-cell-l">Institution</div>
                <div className="ph-cell-v">VIT Chennai</div>
              </div>
              <div className="ph-cell">
                <div className="ph-cell-l">Degree</div>
                <div className="ph-cell-v">B.Tech CSE</div>
              </div>
              <div className="ph-cell">
                <div className="ph-cell-l">CGPA</div>
                <div className="ph-cell-v" style={{ color: "var(--red)" }}>8.67 / 10</div>
              </div>
              <div className="ph-cell">
                <div className="ph-cell-l">Graduation</div>
                <div className="ph-cell-v">2026</div>
              </div>
            </div>
          </div>

          {/* § 1 — ABOUT */}
          <section className="section" id="about">
            <div className="sec-hdr">
              <div className="sec-num">§ 1</div>
              <div className="sec-right">
                <div className="sec-label">Curriculum Vitae</div>
                <div className="sec-title">Personal Statement & Profile</div>
              </div>
            </div>
            <div className="about-grid">
              <div className="about-body">
                <p>I am a Computer Science Engineering student at <strong>VIT University, Chennai</strong> (2022–2026) with a CGPA of <strong>8.67</strong>. My work lies at the intersection of applied AI, secure distributed systems, and cloud-native engineering.</p>
                <p>I have developed hands-on expertise in full-stack development, AWS cloud computing, data analytics, and AI/ML engineering — with a particular focus on <strong>Explainable AI</strong> and model accountability. I am additionally a published researcher in <strong>post-quantum cryptography</strong>, contributing original work on decentralised quantum-resistant notarisation frameworks.</p>
                <p>I am seeking a research-oriented Master's programme in AI/ML or Data Science at a leading German research university, where I can contribute to and grow within a rigorous academic and engineering environment.</p>
              </div>
              <div>
                <div className="data-table">
                  <div className="dt-header">STUDENT DATA RECORD</div>
                  <div className="dt-row"><div className="dt-k">Full Name</div><div className="dt-v">Sarthak Papneja</div></div>
                  <div className="dt-row"><div className="dt-k">Institution</div><div className="dt-v">VIT University, Chennai</div></div>
                  <div className="dt-row"><div className="dt-k">Programme</div><div className="dt-v">B.Tech Computer Science</div></div>
                  <div className="dt-row"><div className="dt-k">CGPA</div><div className="dt-v accent">8.67 / 10</div></div>
                  <div className="dt-row"><div className="dt-k">German Grade</div><div className="dt-v accent">≈ 1.80 (Bavarian)</div></div>
                  <div className="dt-row"><div className="dt-k">ECTS Credits</div><div className="dt-v blue">1 VIT Cr. = 1.5 ECTS</div></div>
                  <div className="dt-row"><div className="dt-k">APS Certificate</div><div className="dt-v blue">32486/25</div></div>
                  <div className="dt-row"><div className="dt-k">IELTS</div><div className="dt-v">8.0 Overall</div></div>
                  <div className="dt-row"><div className="dt-k">Enrolment Year</div><div className="dt-v">2022</div></div>
                  <div className="dt-row"><div className="dt-k">Graduation</div><div className="dt-v">Mid-2026</div></div>
                  <div className="dt-row"><div className="dt-k">Email</div><div className="dt-v" style={{ fontSize: "0.76rem" }}>sarthakpapneja01@gmail.com</div></div>
                  <div className="dt-row"><div className="dt-k">Status</div><div className="dt-v accent">Seeking MSc Admission</div></div>
                </div>
              </div>
            </div>
          </section>

          {/* § 2 — RESEARCH */}
          <section className="section" id="research">
            <div className="sec-hdr">
              <div className="sec-num">§ 2</div>
              <div className="sec-right">
                <div className="sec-label">Peer-Reviewed Publication</div>
                <div className="sec-title">Research Output</div>
              </div>
            </div>
            <div className="research-block">
              <div className="rb-head">
                <span className="rb-badge">PUBLISHED</span>
                <span className="rb-journal">International Journal of Versatile Research and Analysis (IJVRA) · Vol 4, Issue 1 · January 2026</span>
              </div>
              <div className="rb-body">
                <div className="rb-title">Q-Notary: A Decentralized, Quantum-Resistant Notary for Verifiable Collaborative Workflows</div>
                <div className="rb-authors">Sarthak Papneja · Romit Gupta · Dr. Neelanarayanan V</div>
                <div className="rb-meta-row">
                  <div className="rb-meta-item">IJVRA · Vol 4, Issue 1</div>
                  <div className="rb-meta-item">January 2026</div>
                  <div className="rb-meta-item">DOI: 10.13140/RG.2.2.35802.20169</div>
                </div>
                <div className="rb-abstract">Long-lived digital records are at risk from advances in quantum computing that threaten classical signature schemes. We present Q-Notary, a decentralised, post-quantum secure notary framework integrating SPHINCS+, IPFS, and W3C Verifiable Credentials for portable, tamper-evident notarisations — along with a Verifiable Workflow Chain for collaborative multi-party approvals.</div>
                <div className="rb-kws">{RKW.map(k => <span key={k} className="rb-kw">{k}</span>)}</div>
                <a href="https://www.researchgate.net/publication/399985730_Q-Notary_A_Decentralized_Quantum-Resistant_Notary_for_Verifiable_Collaborative_Workflows" target="_blank" className="btn btn-red">↗️ View on ResearchGate</a>
              </div>
            </div>
          </section>

          {/* § 3 — PROJECTS */}
          <section className="section" id="projects">
            <div className="sec-hdr">
              <div className="sec-num">§ 3</div>
              <div className="sec-right">
                <div className="sec-label">Engineering Portfolio · 9 Projects</div>
                <div className="sec-title">Selected Project Work</div>
              </div>
            </div>
            <div className="proj-list">
              {PROJECTS.map(p => (
                <div key={p.n} className="proj">
                  <div className="proj-n">{p.n}</div>
                  <div className="proj-content">
                    <div className="proj-cat">{p.cat}</div>
                    <div className="proj-title">{p.title}</div>
                    <p className="proj-desc">{p.desc}</p>
                    <div className="tech">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                    <div className="plinks">
                      {p.gh && <a href={p.gh} target="_blank" className="plink">GitHub Repository →</a>}
                      {p.live && <a href={p.live} target="_blank" className="plink">Live / Demo →</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* § 4 — SKILLS */}
          <section className="section" id="skills">
            <div className="sec-hdr">
              <div className="sec-num">§ 4</div>
              <div className="sec-right">
                <div className="sec-label">Competency Matrix</div>
                <div className="sec-title">Technical Skills</div>
              </div>
            </div>
            <div className="skills-table">
              {SKILLS.map(s => (
                <div key={s.cat} className="sk-row">
                  <div className="sk-cat">{s.cat}</div>
                  <div className="sk-tags">{s.tags.map(t => <span key={t} className="sk-tag">{t}</span>)}</div>
                </div>
              ))}
            </div>
          </section>

          {/* § 5 — EXPERIENCE */}
          <section className="section" id="experience">
            <div className="sec-hdr">
              <div className="sec-num">§ 5</div>
              <div className="sec-right">
                <div className="sec-label">Professional & Extracurricular</div>
                <div className="sec-title">Work Experience</div>
              </div>
            </div>
            <div className="exp-list">
              {EXP.map(e => (
                <div key={e.org} className="exp-item">
                  <div className="exp-left">
                    <div className="exp-period" style={{ whiteSpace: "pre-line" }}>{e.period}</div>
                    <div className="exp-org" style={{ whiteSpace: "pre-line" }}>{e.org}</div>
                  </div>
                  <div className="exp-right">
                    <div className="exp-role">{e.role}</div>
                    <ul className="exp-ul">{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* § 6 — CONTACT */}
          <section className="section" id="contact">
            <div className="sec-hdr">
              <div className="sec-num">§ 6</div>
              <div className="sec-right">
                <div className="sec-label">Enquiries & Correspondence</div>
                <div className="sec-title">Contact</div>
              </div>
            </div>
            <div className="contact-grid">
              <div className="contact-left">
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "18px" }}>Send a Message</div>
                <form className="cf" onSubmit={submit}>
                  <div className="cf-row">
                    <label className="cf-label">Full Name</label>
                    <input className="fi" placeholder="Your name" value={form.name} onChange={e => upd("name", e.target.value)} required />
                  </div>
                  <div className="cf-row">
                    <label className="cf-label">Email Address</label>
                    <input className="fi" type="email" placeholder="your@email.com" value={form.email} onChange={e => upd("email", e.target.value)} required />
                  </div>
                  <div className="cf-row">
                    <label className="cf-label">Message</label>
                    <textarea className="fta" placeholder="Your message..." value={form.message} onChange={e => upd("message", e.target.value)} required />
                  </div>
                  <button type="submit" className="fsub" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send Message →"}</button>
                  {status === "ok" && <p className="fst-ok">// Message received. Will respond promptly.</p>}
                  {status === "err" && <p className="fst-err">// Error. Please email directly.</p>}
                </form>
              </div>
              <div className="contact-right">
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0" }}>Direct Contacts</div>
                <div className="contact-links">
                  <a href="mailto:sarthakpapneja01@gmail.com" className="cl-item">
                    <div className="cl-type">Email</div>
                    <div className="cl-val">sarthakpapneja01@gmail.com</div>
                  </a>
                  <a href="https://www.linkedin.com/in/sarthak-papneja-485118232/" target="_blank" className="cl-item">
                    <div className="cl-type">LinkedIn</div>
                    <div className="cl-val">sarthak-papneja-485118232</div>
                  </a>
                  <a href="https://github.com/sarthakpapneja" target="_blank" className="cl-item">
                    <div className="cl-type">GitHub</div>
                    <div className="cl-val">github.com/sarthakpapneja</div>
                  </a>
                  <a href="https://www.researchgate.net/profile/Sarthak-Papneja" target="_blank" className="cl-item">
                    <div className="cl-type">ResearchGate</div>
                    <div className="cl-val">Sarthak Papneja</div>
                  </a>
                  <a href="https://drive.google.com/file/d/1u3hQLi61BAbKneym4_QYbEXHYJYvHuio/view?usp=sharing" target="_blank" className="cl-item">
                    <div className="cl-type">Résumé</div>
                    <div className="cl-val">Download PDF →</div>
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>

      <footer className="foot">
        <div className="foot-left">
          DOC · {DOC_ID} · {TODAY}<br />
          <span>Sarthak Papneja</span> · B.Tech CSE · VIT Chennai · sarthakpapneja01@gmail.com
        </div>
        <div className="foot-right">SP.</div>
      </footer>
    </div>
  </>);
}
