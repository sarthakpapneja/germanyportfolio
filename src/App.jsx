import { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=IM+Fell+English:ital@0;1&family=Playfair+Display+SC:wght@400;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{
  font-family:'IM Fell English',Georgia,serif;
  background:#e8dcc8;
  color:#1a1008;
  cursor:default;
}

:root{
  --paper:#f2e8d0;
  --paper2:#ede0c4;
  --ink:#1a1008;
  --red:#b80c00;
  --muted:#5a4a32;
  --rule:#3a2c18;
  --bg:#d4c5a8;
}

/* PAPER TEXTURE */
.gazette{
  min-height:100vh;
  background:var(--paper);
  position:relative;
}
.gazette::before{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
  opacity:1;
  mix-blend-mode:multiply;
}

/* MASTHEAD */
.masthead{
  background:var(--paper);
  border-bottom:4px solid var(--ink);
  padding:0 40px;
  position:sticky;top:0;z-index:200;
}
.mast-top{
  display:flex;justify-content:space-between;align-items:center;
  border-bottom:1px solid var(--rule);
  padding:8px 0;
  font-size:0.7rem;
  font-family:'IM Fell English',serif;
  color:var(--muted);
  font-style:italic;
}
.mast-weather{
  background:var(--red);color:#fff;
  padding:2px 10px;font-style:normal;
  font-family:'Playfair Display SC',serif;
  font-size:0.6rem;letter-spacing:0.1em;
}
.mast-nav{display:flex;gap:24px;}
.mast-nav a{
  font-family:'Playfair Display SC',serif;
  font-size:0.65rem;letter-spacing:0.08em;
  color:var(--ink);text-decoration:none;
  padding:4px 0;
  transition:color 0.2s;
}
.mast-nav a:hover{color:var(--red);}
.mast-main{padding:12px 0 10px;text-align:center;position:relative;}
.mast-title{
  font-family:'Playfair Display SC',serif;
  font-size:clamp(2.4rem,5vw,4.2rem);
  font-weight:700;
  color:var(--ink);
  letter-spacing:0.06em;
  line-height:1;
  margin-bottom:4px;
}
.mast-rule-double{
  border:none;
  border-top:3px double var(--rule);
  margin:6px 0;
}
.mast-sub{
  display:flex;justify-content:space-between;align-items:center;
  font-size:0.68rem;color:var(--muted);font-style:italic;
  padding:4px 0 0;
}
.mast-price{
  font-family:'Playfair Display SC',serif;
  font-size:0.62rem;letter-spacing:0.08em;
  font-style:normal;
  border:1px solid var(--rule);
  padding:2px 8px;
}

/* BODY */
.body{
  position:relative;z-index:1;
  max-width:1100px;margin:0 auto;
  padding:0 40px 80px;
}

/* SECTION HEADERS */
.sec-head{
  text-align:center;
  border-top:3px solid var(--ink);
  border-bottom:1px solid var(--rule);
  padding:7px 0;
  margin:48px 0 24px;
  position:relative;
}
.sec-head::before{
  content:'';position:absolute;top:3px;left:0;right:0;
  height:1px;background:var(--rule);
}
.sec-label{
  font-family:'Playfair Display SC',serif;
  font-size:0.72rem;letter-spacing:0.22em;
  color:var(--muted);
}
.sec-title{
  font-family:'Playfair Display',serif;
  font-size:1.9rem;font-weight:900;
  color:var(--ink);letter-spacing:0.02em;
  line-height:1.1;
}

/* FRONT PAGE HERO */
.front{padding-top:28px;}
.front-kicker{
  text-align:center;
  font-family:'Playfair Display SC',serif;
  font-size:0.68rem;letter-spacing:0.2em;
  color:var(--red);
  margin-bottom:8px;
  display:flex;align-items:center;gap:12px;justify-content:center;
}
.front-kicker::before,.front-kicker::after{content:'◆';font-size:0.5rem;}
.front-headline{
  text-align:center;
  font-family:'Playfair Display',serif;
  font-size:clamp(2.2rem,5vw,3.8rem);
  font-weight:900;
  color:var(--ink);
  line-height:1.06;
  margin-bottom:10px;
  letter-spacing:-0.01em;
}
.front-headline em{font-style:italic;color:var(--red);}
.front-deck{
  text-align:center;
  font-family:'Playfair Display',serif;
  font-size:1.1rem;
  font-style:italic;
  color:var(--muted);
  margin-bottom:16px;
  border-top:1px solid var(--rule);
  border-bottom:1px solid var(--rule);
  padding:8px 0;
}
.front-byline{
  text-align:center;
  font-family:'Playfair Display SC',serif;
  font-size:0.63rem;letter-spacing:0.14em;
  color:var(--muted);
  margin-bottom:24px;
}
.front-cols{
  display:grid;
  grid-template-columns:1fr 1px 1.4fr 1px 1fr;
  gap:24px;
  align-items:start;
}
.col-rule{width:1px;background:var(--rule);margin:0;}
.col{padding:0 4px;}
.col p{
  font-size:0.88rem;line-height:1.82;
  color:var(--ink);
  margin-bottom:12px;
  text-align:justify;
  hyphens:auto;
}
.col p strong{font-weight:700;}
.dropcap::first-letter{
  float:left;
  font-family:'Playfair Display',serif;
  font-size:4.2rem;
  font-weight:900;
  line-height:0.72;
  padding-right:8px;
  padding-top:6px;
  color:var(--ink);
}
.col-box{
  border:2px solid var(--ink);
  padding:14px;
  margin-bottom:14px;
  background:rgba(26,16,8,0.04);
}
.col-box-h{
  font-family:'Playfair Display SC',serif;
  font-size:0.64rem;letter-spacing:0.14em;
  color:var(--red);
  border-bottom:1px solid var(--rule);
  padding-bottom:6px;margin-bottom:10px;
  text-align:center;
}
.col-box-row{display:flex;justify-content:space-between;align-items:baseline;padding:4px 0;border-bottom:1px dotted rgba(58,44,24,0.3);}
.col-box-row:last-child{border-bottom:none;}
.col-box-k{font-family:'Playfair Display SC',serif;font-size:0.62rem;color:var(--muted);letter-spacing:0.08em;}
.col-box-v{font-size:0.82rem;font-weight:700;color:var(--ink);}
.breaking{
  background:var(--red);
  color:#fff;
  padding:8px 14px;
  margin-bottom:14px;
  font-family:'Playfair Display SC',serif;
  font-size:0.6rem;letter-spacing:0.14em;
  text-align:center;
}
.brief{margin-bottom:12px;}
.brief-h{
  font-family:'Playfair Display',serif;
  font-size:0.94rem;font-weight:700;
  color:var(--ink);margin-bottom:3px;
  border-bottom:1px solid rgba(58,44,24,0.25);
  padding-bottom:3px;
}
.brief-p{font-size:0.8rem;line-height:1.7;color:var(--muted);}

/* PROJECTS — NEWS STORIES */
.stories{
  display:grid;
  grid-template-columns:1fr 1px 1fr 1px 1fr;
  gap:24px;
  align-items:start;
}
.story-rule{width:1px;background:var(--rule);margin:0;}
.story{padding:0 4px;margin-bottom:24px;}
.story-num{font-family:'Playfair Display SC',serif;font-size:0.58rem;letter-spacing:0.16em;color:var(--red);margin-bottom:4px;}
.story-head{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:900;line-height:1.22;color:var(--ink);margin-bottom:5px;}
.story-byline{font-size:0.68rem;font-style:italic;color:var(--muted);margin-bottom:6px;border-bottom:1px solid rgba(58,44,24,0.2);padding-bottom:5px;}
.story-body{font-size:0.8rem;line-height:1.76;color:var(--ink);text-align:justify;margin-bottom:8px;}
.story-tech{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;}
.story-tech span{font-family:'Playfair Display SC',serif;font-size:0.54rem;letter-spacing:0.08em;color:var(--muted);border:1px solid rgba(58,44,24,0.3);padding:2px 6px;}
.story-links{display:flex;gap:12px;}
.story-link{font-family:'Playfair Display SC',serif;font-size:0.6rem;letter-spacing:0.08em;color:var(--red);text-decoration:none;transition:color 0.2s;}
.story-link:hover{color:var(--ink);text-decoration:underline;}

/* CLASSIFIEDS — SKILLS */
.classifieds{
  background:var(--paper2);
  border:2px solid var(--ink);
  padding:24px 28px;
}
.clf-masthead{
  text-align:center;
  font-family:'Playfair Display SC',serif;
  font-size:1.1rem;letter-spacing:0.2em;
  color:var(--ink);
  border-bottom:3px double var(--rule);
  padding-bottom:10px;margin-bottom:16px;
}
.clf-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:32px;
}
.clf-col{padding:0;border-right:1px solid var(--rule);padding-right:16px;}
.clf-col:first-child{padding-left:0;}
.clf-col:last-child{border-right:none;padding-right:0;}
.clf-cat{
  font-family:'Playfair Display SC',serif;
  font-size:0.66rem;letter-spacing:0.16em;
  color:var(--red);
  border-bottom:1px solid rgba(184,12,0,0.3);
  padding-bottom:5px;margin-bottom:10px;
  text-align:center;
}
.clf-item{
  font-size:0.78rem;line-height:1.6;color:var(--ink);
  padding:4px 0;
  border-bottom:1px dotted rgba(58,44,24,0.2);
  display:flex;align-items:baseline;gap:5px;
}
.clf-item:last-child{border-bottom:none;}
.clf-bullet{color:var(--red);font-size:0.7rem;flex-shrink:0;}

/* EXP — EDITORIAL */
.editorial{display:grid;grid-template-columns:1.3fr 3px 1fr;gap:0;}
.ed-col{padding:0 4px;}
.ed-rule{width:1px;background:var(--rule);margin:0 20px;}
.exp-item{padding:14px 0;border-bottom:1px solid rgba(58,44,24,0.2);}
.exp-item:first-child{border-top:none;padding-top:0;}
.exp-role-h{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--ink);line-height:1.2;}
.exp-co{font-style:italic;color:var(--red);}
.exp-date{font-family:'Playfair Display SC',serif;font-size:0.6rem;letter-spacing:0.12em;color:var(--muted);margin:4px 0 8px;display:block;}
.exp-ul{list-style:none;padding:0;}
.exp-ul li{font-size:0.8rem;line-height:1.74;color:var(--ink);padding-left:14px;position:relative;margin-bottom:3px;text-align:justify;}
.exp-ul li::before{content:'—';position:absolute;left:0;color:var(--muted);}

/* RESEARCH */
.research-notice{
  border:3px double var(--ink);
  padding:24px;
  position:relative;
  background:rgba(26,16,8,0.03);
}
.rn-header{
  text-align:center;
  font-family:'Playfair Display SC',serif;
  font-size:0.7rem;letter-spacing:0.2em;
  color:var(--red);
  margin-bottom:12px;
  border-bottom:1px solid var(--rule);
  padding-bottom:8px;
}
.rn-title{
  font-family:'Playfair Display',serif;
  font-size:1.1rem;font-weight:700;
  color:var(--ink);line-height:1.44;
  margin-bottom:8px;text-align:center;
}
.rn-authors{font-size:0.82rem;font-style:italic;color:var(--muted);text-align:center;margin-bottom:10px;}
.rn-meta{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:14px;}
.rn-meta span{font-family:'Playfair Display SC',serif;font-size:0.58rem;letter-spacing:0.1em;color:var(--muted);border:1px solid rgba(58,44,24,0.3);padding:2px 8px;}
.rn-abs{font-size:0.84rem;line-height:1.86;color:var(--ink);text-align:justify;font-style:italic;border-left:3px solid var(--red);padding-left:14px;margin-bottom:14px;}
.rn-kws{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:16px;}
.rn-kw{font-family:'Playfair Display SC',serif;font-size:0.58rem;letter-spacing:0.08em;color:var(--red);border:1px solid rgba(184,12,0,0.3);padding:3px 8px;}

/* LETTERS — CONTACT */
.letters-cols{
  display:grid;
  grid-template-columns:1.2fr 1px 1fr;
  gap:32px;
  align-items:start;
}
.letters-rule{width:1px;background:var(--rule);margin:0;}
.letters-intro{
  font-size:0.94rem;line-height:1.9;color:var(--ink);
  margin-bottom:20px;font-style:italic;text-align:justify;
}
.cf{display:flex;flex-direction:column;gap:13px;}
.cf-label{font-family:'Playfair Display SC',serif;font-size:0.62rem;letter-spacing:0.14em;color:var(--muted);margin-bottom:3px;display:block;}
.fi{
  font-family:'IM Fell English',serif;font-size:0.9rem;
  background:rgba(26,16,8,0.04);
  border:1px solid rgba(58,44,24,0.4);
  border-radius:0;
  padding:9px 12px;color:var(--ink);outline:none;
  transition:border-color 0.2s;width:100%;
}
.fi:focus{border-color:var(--red);}
.fta{
  font-family:'IM Fell English',serif;font-size:0.9rem;
  background:rgba(26,16,8,0.04);
  border:1px solid rgba(58,44,24,0.4);
  border-radius:0;
  padding:9px 12px;color:var(--ink);outline:none;
  transition:border-color 0.2s;width:100%;
  resize:vertical;min-height:110px;
}
.fta:focus{border-color:var(--red);}
.fsub{
  font-family:'Playfair Display SC',serif;font-size:0.7rem;
  letter-spacing:0.14em;
  background:var(--ink);color:var(--paper);
  border:1px solid var(--ink);
  padding:10px 26px;cursor:pointer;
  transition:all 0.2s;align-self:flex-start;
}
.fsub:hover{background:var(--red);border-color:var(--red);}
.fsub:disabled{opacity:0.5;cursor:not-allowed;}
.fst-ok{font-size:0.8rem;color:#2a6a2a;font-style:italic;font-family:'IM Fell English',serif;}
.fst-err{font-size:0.8rem;color:var(--red);font-style:italic;}
.notices{display:flex;flex-direction:column;gap:14px;}
.notice{border:1px solid rgba(58,44,24,0.35);padding:12px 14px;}
.notice-h{font-family:'Playfair Display SC',serif;font-size:0.62rem;letter-spacing:0.12em;color:var(--red);margin-bottom:5px;}
.notice-a{font-size:0.84rem;color:var(--ink);text-decoration:none;display:block;font-style:italic;transition:color 0.2s;}
.notice-a:hover{color:var(--red);}
.notice-sub{font-size:0.72rem;color:var(--muted);margin-top:2px;}

/* FOOTER */
.foot{
  text-align:center;
  border-top:4px double var(--rule);
  padding:24px 40px;
  background:var(--paper2);
  position:relative;z-index:1;
}
.foot-ornament{font-size:1.4rem;color:var(--muted);letter-spacing:0.3em;margin-bottom:8px;}
.foot p{font-family:'Playfair Display SC',serif;font-size:0.64rem;letter-spacing:0.14em;color:var(--muted);}
.foot span{color:var(--ink);}

/* ORNAMENTAL DIVIDER */
.ornament{text-align:center;color:var(--rule);font-size:0.9rem;letter-spacing:0.4em;margin:20px 0;opacity:0.5;}

@media(max-width:860px){
  .masthead{padding:0 18px;}
  .body{padding:0 18px 60px;}
  .front-cols{grid-template-columns:1fr;}
  .col-rule{display:none;}
  .stories{grid-template-columns:1fr;}
  .story-rule{display:none;}
  .clf-grid{grid-template-columns:1fr 1fr;}
  .editorial{grid-template-columns:1fr;}
  .ed-rule{display:none;}
  .letters-cols{grid-template-columns:1fr;}
  .letters-rule{display:none;}
  .mast-nav{display:none;}
  .mast-top{justify-content:center;flex-wrap:wrap;gap:8px;}
}
@media(max-width:520px){
  .mast-title{font-size:1.9rem;}
  .front-headline{font-size:1.9rem;}
  .clf-grid{grid-template-columns:1fr;}
}
`;

const PROJECTS = [
  { n: "DISPATCH I", cat: "AI / Medical Imaging", head: "Local Researcher Builds AI That Explains Its Own Diagnoses To Clinicians", body: "An explainable AI system for gastrointestinal disease classification and polyp segmentation has been developed, integrating Grad-CAM visualizations with a deep learning backbone. The system produces automated medical reports intelligible to practitioners.", tech: ["Python", "PyTorch", "Flask", "React", "Grad-CAM"], gh: "https://github.com/sarthakpapneja/Gastro-XAI", live: null },
  { n: "DISPATCH II", cat: "AI / ML Auditing", head: "New Auditing System Holds Machine Learning Models to Account", body: "A production-grade ML audit system evaluates models for Performance, Fairness, Drift, Overfitting, and Leakage simultaneously. Observers say the tool finally gives practitioners a reliable model health report.", tech: ["TypeScript", "React", "Python", "FastAPI", "AI/ML"], gh: "https://github.com/sarthakpapneja/ML-Auditor", live: null },
  { n: "DISPATCH III", cat: "AI / NLP", head: "Intelligent Engine Parses Résumés, Exposes Skill Deficiencies", body: "An intelligent resume parsing tool providing actionable insights, skill gap analysis, and ATS compatibility scoring has entered service. Job seekers report immediate benefit.", tech: ["TypeScript", "React", "Python", "NLP"], gh: "https://github.com/sarthakpapneja/resume-analyzer", live: null },
  { n: "DISPATCH IV", cat: "Full-Stack / FinTech", head: "Finance Tracker Brings Modern Ledger to the Common Household", body: "A MERN stack finance tracker offers transaction management, balance calculation, and data visualisation within a responsive dashboard interface.", tech: ["JavaScript", "React", "Node.js", "MongoDB", "Express"], gh: "https://github.com/sarthakpapneja/Finance-Track", live: null },
  { n: "DISPATCH V", cat: "AI / FinTech", head: "AI Assistant Relieves Burden of Regulatory Compliance Reporting", body: "An AI-powered assistant streamlines complex regulatory compliance and financial reporting workflows through intelligent automation, reducing manual overhead significantly.", tech: ["Python", "Flask", "AI/ML"], gh: "https://github.com/sarthakpapneja/Regulatory-Reporting-Assistant", live: null },
  { n: "DISPATCH VI", cat: "Computer Vision", head: "Vision System Tracks Road Vehicles with Remarkable Accuracy", body: "A Vehicle Management System leveraging computer vision delivers road monitoring, traffic analysis, and automated vehicle tracking to transportation authorities.", tech: ["Python", "Computer Vision", "Deep Learning"], gh: "https://github.com/sarthakpapneja/RoadVision-VMS", live: null },
  { n: "DISPATCH VII", cat: "Web Development", head: "School Receives Modern Website Worthy of Its Storied History", body: "A full-featured school website with dynamic content, event management, video integration, and modern responsive design has been delivered to the institution.", tech: ["JavaScript", "React", "Vite", "CSS"], gh: "https://github.com/sarthakpapneja/school-website-", live: "https://school-website-murex-seven.vercel.app/" },
  { n: "DISPATCH VIII", cat: "Database Systems", head: "Bank Security System Enforces Role-Based Discipline on All Accounts", body: "A comprehensive bank management application ensuring data segregation and integrity through Role-Based Access Control has been placed into service.", tech: ["Python", "MySQL", "RBAC"], gh: "https://github.com/sarthakpapneja/banksecuritysystem", live: null },
  { n: "DISPATCH IX", cat: "Data Science", head: "TableNet-Inspired Model Extracts Tabular Data from Printed Documents", body: "An encoder-decoder deep learning model for table detection integrates OCR for automated tabular data extraction, inspired by the TableNet architecture with a VGG-19 backbone.", tech: ["Deep Learning", "Python", "OCR", "VGG-19"], gh: null, live: "https://colab.research.google.com/drive/1xpn7qXNKuUoMzCklZjbyLiv23v8SheIN?usp=sharing" },
];

const SKILLS = [
  { cat: "Core Concepts", tags: ["Computer Architecture", "AI", "DBMS", "OS", "Computer Networks", "OOP"] },
  { cat: "Languages", tags: ["C", "C++", "Java", "JavaScript", "Python", "TypeScript"] },
  { cat: "Web & Tools", tags: ["ReactJS", "Next.js", "Tailwind CSS", "HTML", "CSS", "Figma", "Flask", "FastAPI", "Node.js"] },
  { cat: "AI & ML", tags: ["PyTorch", "Deep Learning", "Computer Vision", "NLP", "Grad-CAM", "XAI", "Streamlit"] },
  { cat: "Data Tools", tags: ["SQL", "PowerBI", "Excel", "Tableau", "MySQL", "MongoDB"] },
  { cat: "Cloud", tags: ["AWS — EC2", "IAM", "VPC", "S3", "RDS", "CloudFront"] },
];

const EXP = [
  { role: "Cloud Intern", co: "Velocis Systems, Noida", date: "June 2025 – July 2025", bullets: ["Worked with AWS and Google Cloud: EC2, IAM, VPC, RDS, CloudFront, Load Balancer.", "Supported enterprise-grade solutions in fast-paced project environments."] },
  { role: "Operations Member", co: "Android Club, VIT Chennai", date: "June 2023 – Present", bullets: ["Organised and executed club events; delivered a UI/UX session at a seminar.", "Collaborated with project teams to ensure timely task execution.", "Contributed operational improvements through leadership and process enhancements."] },
  { role: "UI/UX Member", co: "Microsoft Innovations Club, VIT Chennai", date: "September 2023 – November 2023", bullets: ["Optimised event interfaces using advanced UI principles.", "Boosted user access by 30% and sped event registrations by 20%."] },
  { role: "Core Developer", co: "Smart India Hackathon", date: "Various", bullets: ["Represented institution as core developer in national-level competition."] },
];

const RKW = ["Post-Quantum Cryptography", "SPHINCS+", "IPFS", "Verifiable Credentials", "Decentralized Notary", "Quantum-Resistant Security"];

const TODAY = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();

export default function Portfolio() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = async (e) => {
    e.preventDefault(); setStatus('sending');
    try {
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access_key: 'd9743274-bd82-40a7-9d2b-b6b785c6c275', subject: 'New Contact from Portfolio', from_name: 'Portfolio Contact Form', ...form }) });
      if (r.ok) { setStatus('ok'); setForm({ name: '', email: '', message: '' }); } else setStatus('err');
    } catch { setStatus('err'); }
  };

  // group skills into 3 columns
  const skillCols = [SKILLS.slice(0, 2), SKILLS.slice(2, 4), SKILLS.slice(4, 6)];
  // group projects into 3 columns of 3
  const projCols = [PROJECTS.slice(0, 3), PROJECTS.slice(3, 6), PROJECTS.slice(6, 9)];

  return (<>
    <style>{CSS}</style>
    <div className="gazette">

      {/* MASTHEAD */}
      <header className="masthead" id="top">
        <div className="mast-top">
          <div className="mast-weather">☀ AVAILABLE FOR HIRE · FORECAST: BRILLIANT</div>
          <div style={{ fontStyle: 'italic', fontSize: '0.68rem' }}>{TODAY}</div>
          <div className="mast-nav">
            <a href="#about">Dossier</a>
            <a href="#projects">Dispatches</a>
            <a href="#skills">Classifieds</a>
            <a href="#experience">Editorial</a>
            <a href="#contact">Letters</a>
            <a href="https://drive.google.com/file/d/1u3hQLi61BAbKneym4_QYbEXHYJYvHuio/view?usp=sharing" target="_blank" style={{ color: '#b80c00', fontStyle: 'normal' }}>Résumé</a>
          </div>
        </div>
        <div className="mast-main">
          <div className="mast-title">The Portfolio Gazette</div>
          <hr className="mast-rule-double" />
          <div className="mast-sub">
            <span style={{ fontStyle: 'normal', fontFamily: "'Playfair Display SC',serif", fontSize: '0.6rem', letterSpacing: '0.1em' }}>EST. 2022 · VIT CHENNAI EDITION</span>
            <span>All the intelligence fit to impress employers.</span>
            <span className="mast-price">YOUR ATTENTION ONLY · ISSUE NO. 8.67</span>
          </div>
        </div>
      </header>

      <div className="body">

        {/* FRONT PAGE */}
        <section className="front" id="about">
          <div className="front-kicker">Breaking News · Final Edition · Class of 2026</div>
          <h1 className="front-headline">Sarthak Papneja, <em>Aspiring</em><br />Software Engineer, Seeks New Mission</h1>
          <div className="front-deck">Builder of AI systems, cloud architectures & secure applications — published in post-quantum cryptography</div>
          <div className="front-byline">By Our Special Correspondent · VIT University, Chennai</div>

          <div className="front-cols">
            <div className="col">
              <div className="col-box">
                <div className="col-box-h">◆ Agent Profile ◆</div>
                <div className="col-box-row"><span className="col-box-k">Full Name</span><span className="col-box-v">Sarthak Papneja</span></div>
                <div className="col-box-row"><span className="col-box-k">Institution</span><span className="col-box-v">VIT Chennai</span></div>
                <div className="col-box-row"><span className="col-box-k">Degree</span><span className="col-box-v">B.Tech CSE</span></div>
                <div className="col-box-row"><span className="col-box-k">Standing</span><span className="col-box-v">CGPA 8.67</span></div>
                <div className="col-box-row"><span className="col-box-k">Graduating</span><span className="col-box-v">2026</span></div>
                <div className="col-box-row"><span className="col-box-k">Status</span><span className="col-box-v" style={{ color: '#b80c00' }}>Available</span></div>
              </div>
              <div className="breaking">◆ Seeking New Opportunities ◆</div>
              <div className="brief">
                <div className="brief-h">In Brief: Key Strengths</div>
                <p className="brief-p">AI/ML, Full-Stack Development, Cloud Architecture (AWS), Post-Quantum Cryptography Research.</p>
              </div>
              <div className="brief">
                <div className="brief-h">Contact the Subject</div>
                <p className="brief-p" style={{ color: '#b80c00', fontStyle: 'normal' }}>sarthakpapneja01@gmail.com</p>
              </div>
            </div>

            <div className="col-rule" />

            <div className="col">
              <p className="dropcap">I am a Computer Science Engineering student at <strong>VIT University, Chennai</strong> (2022–2026) with a CGPA of <strong>8.67</strong>. My passion lies in solving complex problems through technology, whether it be developing secure banking systems, creating AI models for data extraction, or building full-stack web applications of considerable ambition.</p>
              <p>I have acquired hands-on experience in full-stack development, cloud computing via AWS, data analytics, and AI/ML engineering. I am additionally a published researcher in the field of <strong>post-quantum cryptography</strong>, having contributed original work to the academic record on decentralised quantum-resistant systems.</p>
              <p>I enjoy working in fast-paced environments and collaborating closely with teams to deliver solutions of genuine impact. The editors of this gazette commend the subject to all prospective employers without reservation.</p>
              <div className="ornament">— ✦ —</div>
              <p style={{ fontStyle: 'italic', fontSize: '0.84rem', color: '#5a4a32' }}>"Building scalable solutions with a focus on AI-driven applications, secure systems, and cloud architecture — since the year of our Lord 2022."</p>
            </div>

            <div className="col-rule" />

            <div className="col">
              <div className="brief">
                <div className="brief-h">Latest Dispatches</div>
                <p className="brief-p">Nine major engineering projects completed to date — see full dispatches within.</p>
              </div>
              <div className="brief">
                <div className="brief-h">Research Published</div>
                <p className="brief-p">Q-Notary: Quantum-resistant decentralised notary framework. IJVRA Vol. 4, Jan. 2026.</p>
              </div>
              <div className="brief">
                <div className="brief-h">Cloud Operations</div>
                <p className="brief-p">Internship at Velocis Systems working across AWS and Google Cloud infrastructure.</p>
              </div>
              <div className="col-box" style={{ marginTop: '14px' }}>
                <div className="col-box-h">◆ Social Register ◆</div>
                <div className="col-box-row"><span className="col-box-k">LinkedIn</span><a href="https://www.linkedin.com/in/sarthak-papneja-485118232/" target="_blank" className="story-link" style={{ fontSize: '0.72rem' }}>View Profile →</a></div>
                <div className="col-box-row"><span className="col-box-k">GitHub</span><a href="https://github.com/sarthakpapneja" target="_blank" className="story-link" style={{ fontSize: '0.72rem' }}>View Code →</a></div>
                <div className="col-box-row"><span className="col-box-k">ResearchGate</span><a href="https://www.researchgate.net/profile/Sarthak-Papneja" target="_blank" className="story-link" style={{ fontSize: '0.72rem' }}>View Papers →</a></div>
                <div className="col-box-row"><span className="col-box-k">Résumé</span><a href="https://drive.google.com/file/d/1u3hQLi61BAbKneym4_QYbEXHYJYvHuio/view?usp=sharing" target="_blank" className="story-link" style={{ fontSize: '0.72rem' }}>Download →</a></div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="sec-head">
            <div className="sec-label">◆ Field Dispatches ◆</div>
            <div className="sec-title">Engineering Correspondent's Reports</div>
          </div>
          <div className="stories">
            {projCols.map((col, ci) => (
              <>
                {ci > 0 && <div key={`r${ci}`} className="story-rule" />}
                <div key={ci} style={{ padding: '0 4px' }}>
                  {col.map((p, i) => (
                    <div key={p.n} className="story" style={{ borderBottom: i < col.length - 1 ? '1px solid rgba(58,44,24,0.25)' : undefined, paddingBottom: i < col.length - 1 ? '20px' : undefined }}>
                      <div className="story-num">{p.n} · {p.cat}</div>
                      <div className="story-head">{p.head}</div>
                      <div className="story-byline">By S. Papneja, Staff Correspondent</div>
                      <p className="story-body">{p.body}</p>
                      <div className="story-tech">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                      <div className="story-links">
                        {p.gh && <a href={p.gh} target="_blank" className="story-link">View Source →</a>}
                        {p.live && <a href={p.live} target="_blank" className="story-link">View Live →</a>}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ))}
          </div>
        </section>

        {/* SKILLS — CLASSIFIEDS */}
        <section id="skills">
          <div className="sec-head">
            <div className="sec-label">◆ Situations Offered ◆</div>
            <div className="sec-title">Professional Classified Notices</div>
          </div>
          <div className="classifieds">
            <div className="clf-masthead">◆ SKILLS & CAPABILITIES — PROFESSIONAL SERVICES ◆</div>
            <div className="clf-grid">
              {skillCols.map((col, ci) => (
                <div key={ci} className="clf-col">
                  {col.map(s => (
                    <div key={s.cat} style={{ marginBottom: '18px' }}>
                      <div className="clf-cat">{s.cat}</div>
                      {s.tags.map(t => (
                        <div key={t} className="clf-item">
                          <span className="clf-bullet">◆</span>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE + RESEARCH */}
        <section id="experience">
          <div className="sec-head">
            <div className="sec-label">◆ Editorial & Academic Supplement ◆</div>
            <div className="sec-title">Field Operations & Published Intelligence</div>
          </div>
          <div className="editorial">
            <div className="ed-col">
              <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: '0.68rem', letterSpacing: '0.18em', color: '#b80c00', marginBottom: '16px', borderBottom: '1px solid rgba(58,44,24,0.2)', paddingBottom: '8px' }}>Our Correspondent Reports from the Field</div>
              {EXP.map(e => (
                <div key={e.co} className="exp-item">
                  <div className="exp-role-h">{e.role} — <span className="exp-co">{e.co}</span></div>
                  <span className="exp-date">{e.date}</span>
                  <ul className="exp-ul">{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="ed-rule" />
            <div className="ed-col">
              <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: '0.68rem', letterSpacing: '0.18em', color: '#b80c00', marginBottom: '16px', borderBottom: '1px solid rgba(58,44,24,0.2)', paddingBottom: '8px' }}>Academic Supplement · Peer-Reviewed Intelligence</div>
              <div className="research-notice">
                <div className="rn-header">◆ Notice of Publication ◆</div>
                <div className="rn-title">Q-Notary: A Decentralized, Quantum-Resistant Notary for Verifiable Collaborative Workflows</div>
                <div className="rn-authors">Sarthak Papneja · Romit Gupta · Dr. Neelanarayanan V</div>
                <div className="rn-meta">
                  <span>IJVRA · Vol 4, Issue 1</span>
                  <span>January 2026</span>
                  <span>DOI: 10.13140/RG.2.2.35802.20169</span>
                </div>
                <p className="rn-abs">Long-lived digital records face quantum computing threats. Q-Notary presents a decentralised, post-quantum secure notary framework integrating SPHINCS+, IPFS, and W3C Verifiable Credentials for tamper-evident notarizations and collaborative workflow approvals.</p>
                <div className="rn-kws">{RKW.map(k => <span key={k} className="rn-kw">{k}</span>)}</div>
                <a href="https://www.researchgate.net/publication/399985730_Q-Notary_A_Decentralized_Quantum-Resistant_Notary_for_Verifiable_Collaborative_Workflows" target="_blank" className="fsub" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '0.65rem' }}>Read Full Paper →</a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="sec-head">
            <div className="sec-label">◆ Letters to the Editor ◆</div>
            <div className="sec-title">Correspondence & Personal Notices</div>
          </div>
          <div className="letters-cols">
            <div>
              <p className="letters-intro">The editors invite all prospective employers, collaborators, and curious correspondents to submit their enquiries by the form below. The subject of this gazette is currently available for new engagements and will endeavour to reply with all reasonable despatch.</p>
              <form className="cf" onSubmit={submit}>
                <div><label className="cf-label">Your Good Name</label><input className="fi" placeholder="e.g. Mr. John Smith" value={form.name} onChange={e => upd('name', e.target.value)} required /></div>
                <div><label className="cf-label">Telegraph Address (Email)</label><input className="fi" type="email" placeholder="your@address.com" value={form.email} onChange={e => upd('email', e.target.value)} required /></div>
                <div><label className="cf-label">Your Correspondence</label><textarea className="fta" placeholder="Dear Mr. Papneja..." value={form.message} onChange={e => upd('message', e.target.value)} required /></div>
                <button type="submit" className="fsub" disabled={status === 'sending'}>{status === 'sending' ? 'Dispatching...' : 'Dispatch Letter →'}</button>
                {status === 'ok' && <p className="fst-ok">Your letter has been received. A reply shall follow presently.</p>}
                {status === 'err' && <p className="fst-err">Transmission failed. Please telegraph directly.</p>}
              </form>
            </div>
            <div className="letters-rule" />
            <div>
              <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: '0.68rem', letterSpacing: '0.18em', color: '#b80c00', marginBottom: '16px', borderBottom: '1px solid rgba(58,44,24,0.2)', paddingBottom: '8px' }}>Personal Notices & Social Register</div>
              <div className="notices">
                <div className="notice">
                  <div className="notice-h">Electronic Post</div>
                  <a href="mailto:sarthakpapneja01@gmail.com" className="notice-a">sarthakpapneja01@gmail.com</a>
                  <div className="notice-sub">Replies expected within one working day</div>
                </div>
                <div className="notice">
                  <div className="notice-h">Professional Register — LinkedIn</div>
                  <a href="https://www.linkedin.com/in/sarthak-papneja-485118232/" target="_blank" className="notice-a">View full professional record →</a>
                </div>
                <div className="notice">
                  <div className="notice-h">Code Repository — GitHub</div>
                  <a href="https://github.com/sarthakpapneja" target="_blank" className="notice-a">Inspect all published works →</a>
                </div>
                <div className="notice">
                  <div className="notice-h">Academic Record — ResearchGate</div>
                  <a href="https://www.researchgate.net/profile/Sarthak-Papneja" target="_blank" className="notice-a">Review published research →</a>
                </div>
                <div className="notice">
                  <div className="notice-h">Curriculum Vitae</div>
                  <a href="https://drive.google.com/file/d/1u3hQLi61BAbKneym4_QYbEXHYJYvHuio/view?usp=sharing" target="_blank" className="notice-a">Download full résumé →</a>
                  <div className="notice-sub">Available for immediate inspection</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <footer className="foot">
        <div className="foot-ornament">◆ ◇ ◆ ◇ ◆</div>
        <p>Designed & Typeset by <span>Sarthak Papneja</span> · The Portfolio Gazette · Est. 2022 · All Rights Reserved</p>
      </footer>
    </div>
  </>);
}
