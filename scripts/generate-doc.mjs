import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";

const outputPath = "/home/runner/workspace/cockpit-demo-brief.pdf";
const doc = new PDFDocument({
  margin: 0,
  size: "A4",
  info: { Title: "AI Agent Reliability Cockpit — Demo Brief" },
  autoFirstPage: false,
});
const stream = createWriteStream(outputPath);
doc.pipe(stream);

// ─── Constants ────────────────────────────────────────────────────────────────
const PW = 595.28;
const PH = 841.89;
const ML = 56;
const MR = 56;
const TW = PW - ML - MR; // 483.28
const BLUE = "#1d4ed8";
const DARK = "#0f172a";
const SLATE = "#1e293b";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";
const LIGHT = "#f8fafc";
const BLUE_LIGHT = "#eff6ff";
const GREEN = "#059669";
const AMBER = "#d97706";
const WHITE = "#ffffff";
const NAVY = "#0f172a";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function newPage() {
  doc.addPage({ margin: 0, size: "A4" });
  return ML; // returns initial y
}

function rule(y, x1 = ML, x2 = PW - MR, color = BORDER) {
  doc.save().moveTo(x1, y).lineTo(x2, y)
    .strokeColor(color).lineWidth(0.5).stroke().restore();
  return y + 1;
}

// Returns new y after drawing the label band
function sectionBand(y, text) {
  const h = 20;
  doc.rect(ML, y, TW, h).fill(BLUE_LIGHT);
  doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(7)
    .text(text.toUpperCase(), ML + 8, y + 7, { characterSpacing: 1, lineBreak: false });
  return y + h + 10;
}

function heading1(y, text) {
  doc.fillColor(DARK).font("Helvetica-Bold").fontSize(22)
    .text(text, ML, y, { width: TW, lineBreak: false });
  return y + 30;
}

function heading2(y, text) {
  doc.fillColor(DARK).font("Helvetica-Bold").fontSize(13)
    .text(text, ML, y, { width: TW, lineBreak: false });
  return y + 20;
}

// Multi-line body text — returns y after text
function bodyText(y, text, opts = {}) {
  const color = opts.color || MUTED;
  const x = opts.x !== undefined ? opts.x : ML;
  const width = opts.width !== undefined ? opts.width : TW - (x - ML);
  const size = opts.size || 9.5;
  doc.fillColor(color).font(opts.bold ? "Helvetica-Bold" : "Helvetica")
    .fontSize(size).text(text, x, y, { width, lineGap: 3, align: opts.align || "left" });
  return doc.y + (opts.after || 6);
}

// Pill/badge
function badge(x, y, text, fg, bg) {
  const tw = doc.font("Helvetica-Bold").fontSize(7.5).widthOfString(text);
  const pw = tw + 12, ph = 15;
  doc.rect(x, y, pw, ph).fill(bg);
  doc.fillColor(fg).font("Helvetica-Bold").fontSize(7.5)
    .text(text, x + 6, y + 4, { lineBreak: false });
  return pw;
}

// ─── COVER ────────────────────────────────────────────────────────────────────
newPage();
doc.rect(0, 0, PW, PH).fill(NAVY);
doc.rect(0, 0, 6, PH).fill(BLUE);

// Confidential label
doc.fillColor("#475569").font("Helvetica").fontSize(7.5)
  .text("CONFIDENTIAL — INTERNAL USE ONLY", ML, 44, { characterSpacing: 1.2, lineBreak: false });

// Main title
let y = 180;
doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(42)
  .text("AI Agent", ML, y, { lineBreak: false });
y += 52;
doc.text("Reliability", ML, y, { lineBreak: false });
y += 52;
doc.text("Cockpit", ML, y, { lineBreak: false });
y += 68;

doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(14)
  .text("Demo Brief & Business Case", ML, y, { lineBreak: false });
y += 22;

doc.fillColor("#94a3b8").font("Helvetica").fontSize(10)
  .text("What it is · What it proves · What it solves", ML, y, { lineBreak: false });
y += 50;

// Divider
doc.moveTo(ML, y).lineTo(ML + 80, y).strokeColor(BLUE).lineWidth(2).stroke();
y += 24;

doc.fillColor("#94a3b8").font("Helvetica").fontSize(9)
  .text("Audience: C-Suite · Audit Leaders · Compliance Officers", ML, y, { lineBreak: false });
y += 14;
doc.text("Audit & Compliance Use Case · May 2026", ML, y, { lineBreak: false });

// Bottom bar
doc.rect(0, PH - 40, PW, 40).fill("#0d1526");
doc.fillColor("#475569").font("Helvetica").fontSize(8)
  .text("Internal use only — not for distribution", ML, PH - 26, { lineBreak: false });
doc.fillColor("#475569").text("1", PW - MR, PH - 26, { lineBreak: false, align: "right" });

// ─── PAGE 2 — EXECUTIVE SUMMARY ──────────────────────────────────────────────
y = newPage();

y = sectionBand(y, "Executive Summary");
y = heading1(y, "What this demo achieves");
y += 4;

y = bodyText(y, "The AI Agent Reliability Cockpit is a 10-minute interactive demonstration built for board-level and audit leadership audiences. It proves — through a live, scripted workflow — that AI agents in enterprise audit can be made controllable, transparent, and measurably improvable without model retraining, additional data science resources, or black-box infrastructure.", { color: DARK });
y += 4;
y = bodyText(y, "The demo directly addresses the single biggest obstacle to enterprise AI adoption in regulated industries: the absence of trust. It does this not through assertions, but through observable evidence — showing every step the agent takes, every source it cites, every correction a human makes, and every metric that moves as a result.", { color: DARK });
y += 12;

rule(y); y += 12;

y = sectionBand(y, "Core Proposition");
y = heading2(y, "In one sentence");
y += 4;

// Quote box
const quoteH = 56;
doc.rect(ML, y, TW, quoteH).fill(BLUE_LIGHT);
doc.rect(ML, y, 4, quoteH).fill(BLUE);
y += 14;
doc.fillColor(SLATE).font("Helvetica-Bold").fontSize(11.5)
  .text(
    '"The same agent gets smarter through human feedback — without retraining,\nwithout new infrastructure, without waiting."',
    ML + 14, y, { width: TW - 20, lineGap: 4 }
  );
y += quoteH - 8;
y += 14;

y = bodyText(y, "This proposition is demonstrated live, with a real audit case — a vendor invoice for ₹14.1 lakhs against a PO for ₹12.5 lakhs, with missing delivery proof — showing the agent's output before and after a single human correction. The audience sees the improvement happen in real time.", { color: DARK });

y += 12;
rule(y); y += 12;

y = sectionBand(y, "The Problem This Solves");
y = heading2(y, "Why AI adoption stalls in audit & compliance");
y += 6;

const problems = [
  ["Black-box decisions", "Agents return a risk classification with no explanation of how they arrived at it. Audit teams cannot sign off on unexplained findings, making the AI unusable in a governance context."],
  ["Hallucination risk", "Agents assert facts not grounded in source documents. In audit, an unsupported claim creates liability. The industry needs zero-tolerance for unverified assertions."],
  ["No learning mechanism", "When an agent makes an error, the correction lives in a spreadsheet or email thread. The agent repeats the same mistake on the next case. There is no closed feedback loop."],
];

for (const [title, desc] of problems) {
  const blockH = 60;
  doc.rect(ML, y, TW, blockH).fill(LIGHT);
  doc.rect(ML, y, 3, blockH).fill(BLUE);
  doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10)
    .text(title, ML + 12, y + 8, { width: TW - 20, lineBreak: false });
  doc.fillColor(MUTED).font("Helvetica").fontSize(9)
    .text(desc, ML + 12, y + 24, { width: TW - 20, lineGap: 2 });
  y += blockH + 6;
}

// Page number
doc.fillColor(MUTED).font("Helvetica").fontSize(8)
  .text("2", PW - MR, PH - 30, { lineBreak: false });

// ─── PAGE 3 — THE SOLUTION ───────────────────────────────────────────────────
y = newPage();

y = sectionBand(y, "The Solution");
y = heading1(y, "A managed operating model, not a chatbot");
y += 4;

y = bodyText(y, "The cockpit replaces the informal, untraceable, non-learning AI deployment pattern with a structured four-layer operating model. Each layer addresses one of the failure modes above. All four layers work together to produce a system that is auditable by design.", { color: DARK });
y += 12;

const layers = [
  ["Traceability", "Every agent action is logged as a numbered step with its tool name, input, output, and confidence score. The Trace Viewer surfaces this as a readable audit log. Nothing is hidden.", BLUE, "bg-blue"],
  ["Evidence Grounding", "Every claim the agent makes must cite a source document. Missing evidence is explicitly flagged — not silently ignored — with the systems that were searched and the outcome. The Evidence Map makes this visible.", "#7c3aed", "bg-violet"],
  ["Human Review", "Agents suggest. Humans decide. Every high-risk output is routed to a named expert who can accept, reject, or correct the classification. The correction is captured with written rationale.", AMBER, "bg-amber"],
  ["Continuous Learning", "Each expert correction is parsed into a permanent IF-THEN rule that applies immediately to all future cases. No retraining. No infrastructure change. No delay. The Learning Log maintains a full version-controlled history.", GREEN, "bg-green"],
];

for (const [title, desc, color] of layers) {
  const blockH = 72;
  doc.rect(ML, y, TW, blockH).fill(LIGHT);
  doc.rect(ML, y, 3, blockH).fill(color);
  // Number circle
  doc.circle(ML + 22, y + 18, 10).fill(color);
  doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(9)
    .text(String(layers.indexOf(layers.find(l => l[0] === title)) + 1), ML + 19, y + 14, { width: 8, align: "center", lineBreak: false });
  doc.fillColor(DARK).font("Helvetica-Bold").fontSize(11)
    .text(title, ML + 38, y + 10, { width: TW - 50, lineBreak: false });
  doc.fillColor(MUTED).font("Helvetica").fontSize(9.5)
    .text(desc, ML + 38, y + 26, { width: TW - 50, lineGap: 3 });
  y += blockH + 8;
}

y += 4;
rule(y); y += 12;

y = sectionBand(y, "The Improvement Loop");
y += 6;

const loopItems = [
  "User submits case",
  "Agent suggests (with trace & evidence)",
  "Human reviews — has veto power",
  "Correction becomes a learned rule",
  "Metrics improve — fully auditable",
  "↺  Loop repeats on next case",
];

const colW = TW / 3;
for (let i = 0; i < loopItems.length; i++) {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const bx = ML + col * colW;
  const by = y + row * 44;
  const isLast = i === loopItems.length - 1;
  doc.rect(bx + 2, by, colW - 4, 38).fill(isLast ? BLUE_LIGHT : LIGHT);
  doc.rect(bx + 2, by, 3, 38).fill(isLast ? BLUE : BORDER);
  doc.fillColor(isLast ? BLUE : DARK).font("Helvetica-Bold").fontSize(8.5)
    .text(String(isLast ? "" : i + 1), bx + 10, by + 8, { width: 14, lineBreak: false });
  doc.fillColor(isLast ? BLUE : SLATE).font(isLast ? "Helvetica-Bold" : "Helvetica").fontSize(9)
    .text(loopItems[i], bx + 28, by + 7, { width: colW - 36, lineGap: 2 });
}

y += 100;

doc.fillColor(MUTED).font("Helvetica").fontSize(8)
  .text("3", PW - MR, PH - 30, { lineBreak: false });

// ─── PAGE 4 — THE DEMO WALKTHROUGH ───────────────────────────────────────────
y = newPage();

y = sectionBand(y, "The Demo — Step by Step");
y = heading1(y, "What the audience sees");
y += 4;
y = bodyText(y, "The demo runs for ten minutes across nine distinct moments. Each moment is designed to land a specific point with a specific audience reaction.", { color: DARK });
y += 10;

const steps = [
  ["Overview", "The four pillars and the improvement loop diagram establish the conceptual framework in under 60 seconds. The audience understands what they are about to see before they see it."],
  ["Run Agent", "The case is shown: Invoice INV-7782 for ₹14,10,000 against PO-9912 for ₹12,50,000, with no delivery proof. The presenter clicks 'Run Initial Agent.' The agent returns Medium Risk at 68% confidence — correct data, wrong weighting."],
  ["Trace Viewer", "Five numbered steps appear. The audience sees exactly what the agent did: extracted invoice (97% confidence), retrieved PO (96%), calculated ₹1,60,000 variance (99%), found no GRN (94%), then classified Medium Risk at 68%. The gap is visible."],
  ["Evidence Map", "Every claim is shown with its source. Invoice amount: supported by INV-7782. PO value: supported by PO-9912. Delivery proof: missing — three systems searched. No hallucinations. Missing evidence is called out, not buried."],
  ["Human Review", "Expert Shreya Reddy (Senior Audit Manager) reviews and overrides to High Risk with written rationale. She proposes: 'If invoice exceeds PO AND delivery proof missing → High Risk.' The presenter clicks Submit Feedback."],
  ["Learning Log", "The new rule (R-004) appears instantly — timestamped, attributed, linked to AP-07 §3.2. The audience sees it take effect immediately, with no retraining."],
  ["Agent Rerun", "Same case, same data. Risk changes from Medium to High. Confidence rises from 68% to 91%. The reasoning now cites Rule R-004 explicitly. The agent is demonstrably smarter."],
  ["Evaluation Dashboard", "A before/after chart shows: Accuracy +28pp, Evidence Detection +25pp, Audit Trail Completeness +33pp, time per case reduced 66% (35 min → 12 min)."],
  ["Business Impact & Architecture", "₹19+ lakhs saved per 1,000 cases. 3× throughput. 98% audit trail completeness. The architecture slide closes by showing the full operating model as a governance framework."],
];

for (let i = 0; i < steps.length; i++) {
  const [title, desc] = steps[i];
  const itemY = y;
  // Estimate height needed
  const textH = Math.max(50, doc.font("Helvetica").fontSize(9).heightOfString(desc, { width: TW - 52, lineGap: 2 }) + 16);
  const blockH = textH + 16;

  // Step number circle
  doc.circle(ML + 11, itemY + 14, 11).fill(BLUE);
  doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(9)
    .text(String(i + 1), ML + 7, itemY + 10, { width: 8, align: "center", lineBreak: false });

  // Title
  doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10)
    .text(title, ML + 30, itemY + 8, { width: TW - 38, lineBreak: false });

  // Description
  doc.fillColor(MUTED).font("Helvetica").fontSize(9)
    .text(desc, ML + 30, itemY + 23, { width: TW - 38, lineGap: 2 });

  y = doc.y + 10;

  // Connector line
  if (i < steps.length - 1) {
    doc.moveTo(ML + 11, itemY + 25).lineTo(ML + 11, y - 6)
      .strokeColor(BORDER).lineWidth(1).stroke();
  }
}

doc.fillColor(MUTED).font("Helvetica").fontSize(8)
  .text("4", PW - MR, PH - 30, { lineBreak: false });

// ─── PAGE 5 — METRICS ─────────────────────────────────────────────────────────
y = newPage();

y = sectionBand(y, "Quantified Outcomes");
y = heading1(y, "The numbers");
y += 4;
y = bodyText(y, "All metrics reflect the before/after effect of a single human correction captured as a rule during the live demo. They represent a conservative baseline, not an aspirational target.", { color: DARK });
y += 10;

// Table
const colsX = [ML, ML + 230, ML + 310, ML + 395];
const colsW = [230, 80, 85, 80];

// Header
doc.rect(ML, y, TW, 26).fill(BLUE);
const headers = ["METRIC", "BEFORE", "AFTER", "CHANGE"];
for (let i = 0; i < headers.length; i++) {
  doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(8)
    .text(headers[i], colsX[i] + 8, y + 9, { width: colsW[i], lineBreak: false });
}
y += 26;

const rows = [
  ["Risk Classification Accuracy", "60%", "88%", "+28pp"],
  ["Evidence Detection Rate", "70%", "95%", "+25pp"],
  ["Missing Evidence Caught", "45%", "95%", "+50pp"],
  ["Audit Trail Completeness", "65%", "98%", "+33pp"],
  ["Average Time per Case", "35 min", "12 min", "−66%"],
  ["False Positive Rate", "22%", "8%", "−14pp"],
  ["Agent Confidence (same case)", "68%", "91%", "+23pp"],
  ["Savings per 1,000 cases", "—", "₹19+ Lakhs", "Net gain"],
];

for (let i = 0; i < rows.length; i++) {
  const [label, before, after, delta] = rows[i];
  const rh = 26;
  const bg = i % 2 === 0 ? WHITE : LIGHT;
  doc.rect(ML, y, TW, rh).fill(bg);
  doc.rect(ML, y, TW, rh).stroke(BORDER).lineWidth(0.3);
  doc.fillColor(DARK).font("Helvetica").fontSize(9)
    .text(label, colsX[0] + 8, y + 8, { width: colsW[0] - 8, lineBreak: false });
  doc.fillColor(MUTED).font("Helvetica").fontSize(9)
    .text(before, colsX[1], y + 8, { width: colsW[1], align: "center", lineBreak: false });
  doc.fillColor(DARK).font("Helvetica-Bold").fontSize(9)
    .text(after, colsX[2], y + 8, { width: colsW[2], align: "center", lineBreak: false });
  doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(8.5)
    .text(delta, colsX[3], y + 9, { width: colsW[3], align: "center", lineBreak: false });
  y += rh;
}

y += 16;
rule(y); y += 12;

y = sectionBand(y, "Business Value");
y = heading2(y, "What the ROI looks like");
y += 8;

const valuePoints = [
  ["Productivity", "3× case throughput — same team, no additional headcount. Auditors process cases in 12 minutes vs. 35 minutes previously."],
  ["Risk Reduction", "98% audit trail completeness vs. 65% before. Fewer missed high-risk exceptions. Every decision is documented and defensible."],
  ["Compliance", "Full traceability means every finding can be explained to regulators, board audit committees, and external auditors without reconstruction."],
  ["Cost Savings", "₹19+ lakhs per 1,000 cases at ₹800/hour average senior auditor cost. Conservative estimate based purely on time reduction."],
  ["Permanence", "Each correction compounds. Rule R-004 applies to all future cases automatically — the system gets more accurate over time with zero recurring investment."],
];

const colsV = Math.ceil(valuePoints.length / 2);
const vColW = (TW - 8) / 2;

for (let i = 0; i < valuePoints.length; i++) {
  const [label, desc] = valuePoints[i];
  const col = i % 2;
  const row = Math.floor(i / 2);
  const bx = ML + col * (vColW + 8);
  const by = y + row * 56;
  doc.rect(bx, by, vColW, 50).fill(LIGHT);
  doc.rect(bx, by, 3, 50).fill(BLUE);
  doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(9)
    .text(label, bx + 10, by + 7, { width: vColW - 16, lineBreak: false });
  doc.fillColor(MUTED).font("Helvetica").fontSize(8.5)
    .text(desc, bx + 10, by + 21, { width: vColW - 16, lineGap: 2 });
}

y += Math.ceil(valuePoints.length / 2) * 56 + 10;

doc.fillColor(MUTED).font("Helvetica").fontSize(8)
  .text("5", PW - MR, PH - 30, { lineBreak: false });

// ─── PAGE 6 — AUDIENCE & OBJECTIONS ──────────────────────────────────────────
y = newPage();

y = sectionBand(y, "Audience Tailoring");
y = heading1(y, "Adapting the demo");
y += 4;
y = bodyText(y, "The demo can be tuned for different audiences by emphasising different pages. The full 10-minute version covers all nine sections. A 5-minute version skips Learning Log and Architecture.", { color: DARK });
y += 10;

const audiences = [
  ["C-Suite / CFO", "Lead with Business Impact and ROI numbers. Show the Evaluation Dashboard. Emphasise '3× throughput' and '₹19L savings per 1,000 cases.' Skip Architecture."],
  ["Audit Leaders", "Emphasise Evidence Map and Audit Trail Completeness. The 98% completeness metric is the primary takeaway. Show the Learning Log to demonstrate permanence."],
  ["Compliance Officers", "Focus on Trace Viewer (every step logged) and Architecture governance layers. The phrase 'human has veto power' and 'every decision is auditable' lands well."],
  ["Technical Audience", "Spend more time on Trace Viewer — show tool names, confidence scores, and the IF-THEN rule syntax. Discuss the reliability layer architecture."],
  ["5-Minute Version", "Run Agent → Trace Viewer → Human Review → Rerun → Metrics. Skip Learning Log and Architecture entirely."],
];

for (const [audience, approach] of audiences) {
  const bH = 46;
  doc.rect(ML, y, 128, bH).fill(BLUE_LIGHT);
  doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(9)
    .text(audience, ML + 8, y + (bH / 2) - 6, { width: 112, lineBreak: false });
  doc.fillColor(MUTED).font("Helvetica").fontSize(9)
    .text(approach, ML + 140, y + 8, { width: TW - 148, lineGap: 2 });
  y += bH + 6;
}

y += 6;
rule(y); y += 12;

y = sectionBand(y, "Handling Objections");
y = heading2(y, "Anticipated questions from the audience");
y += 8;

const objections = [
  ['"Will it hallucinate?"', "Show the Evidence Map. Every claim is grounded. Missing evidence is flagged explicitly. Each hallucination that does occur becomes a rule to prevent it next time."],
  ['"Can I trust it?"', "Trust is about transparency, not perfection. The audience can see what the agent did (Trace Viewer), where it got information (Evidence Map), what improved it (Learning Log), and how it's performing (Evaluation Dashboard)."],
  ['"How long until it\'s perfect?"', '"We don\'t need perfect — we need measurable improvement." The demo shows +28pp on accuracy from a single correction. That curve is the point.'],
  ['"Can this scale?"', "Skills are domain-independent. Rules are configurable. The governance layer is portable. Build once, deploy across practice areas and client engagements."],
];

for (const [q, a] of objections) {
  const qH = Math.max(60, doc.font("Helvetica").fontSize(9).heightOfString(a, { width: TW - 24, lineGap: 2 }) + 36);
  doc.rect(ML, y, TW, qH).fill(LIGHT);
  doc.rect(ML, y, 3, qH).fill(BLUE);
  doc.fillColor(DARK).font("Helvetica-Bold").fontSize(10)
    .text(q, ML + 12, y + 10, { width: TW - 20, lineBreak: false });
  doc.fillColor(MUTED).font("Helvetica").fontSize(9)
    .text(a, ML + 12, y + 27, { width: TW - 24, lineGap: 2 });
  y += qH + 6;
}

y += 8;
rule(y); y += 10;

// Closing quote
const closeH = 80;
doc.rect(ML, y, TW, closeH).fill(NAVY);
doc.rect(ML, y, 3, closeH).fill(BLUE);
doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(11)
  .text(
    '"The future of enterprise work isn\'t about replacing humans with AI.\nIt\'s about giving humans better tools — faster analysis, stronger evidence,\nbetter visibility, measurable improvement."',
    ML + 14, y + 12, { width: TW - 24, lineGap: 4 }
  );
doc.fillColor(BLUE).font("Helvetica-Bold").fontSize(8.5)
  .text("— AI Agent Reliability Cockpit, Closing Statement", ML + 14, y + closeH - 20, { lineBreak: false });

doc.fillColor(MUTED).font("Helvetica").fontSize(8)
  .text("6", PW - MR, PH - 30, { lineBreak: false });
doc.fillColor(MUTED).font("Helvetica").fontSize(7.5)
  .text("AI Agent Reliability Cockpit — Demo Brief · Internal Use Only · May 2026", ML, PH - 30, {
    width: TW - 20, align: "left", lineBreak: false
  });

doc.end();

stream.on("finish", () => console.log("PDF generated:", outputPath));
stream.on("error", (e) => { console.error("Error:", e); process.exit(1); });
