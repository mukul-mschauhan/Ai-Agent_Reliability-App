# AI Agent Reliability Cockpit

An interactive demo that proves AI agents in enterprise audit can be **controlled, transparent, and measurably improvable** — without model retraining or black-box infrastructure.

Built for C-Suite, Audit Leaders, and Compliance Officers.

---

## What it demonstrates

| Step | Page | What the audience sees |
|------|------|------------------------|
| 1 | Overview | Four pillars of reliable AI + the improvement loop |
| 2 | Run Agent | Real audit case — agent returns Medium Risk at 68% confidence |
| 3 | Trace Viewer | Every step the agent took, with tool names, inputs, outputs, confidence |
| 4 | Evidence Map | Every claim grounded to a source — missing evidence flagged explicitly |
| 5 | Human Review | Expert overrides to High Risk, proposes a rule |
| 6 | Learning Log | Rule captured instantly — no retraining |
| 7 | Agent Rerun | Same case → High Risk at 91% confidence, rule cited |
| 8 | Evaluation Dashboard | Before/after: Accuracy +28pp, Time −66% |
| 9 | Business Impact + Architecture | ₹19L+ savings per 1,000 cases, operating model |

The demo is **fully stateful** — running the agent, submitting feedback, and rerunning all flow through shared React context. "Reset Demo" restores the initial state for repeat runs.

---

## Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS v4
- **Charts:** Recharts
- **Routing:** Wouter
- **Monorepo:** pnpm workspaces (Node.js 24)
- **Backend:** Express 5 (API server — not used by the demo itself, included as workspace scaffolding)

---

## Project structure

```
.
├── artifacts/
│   ├── cockpit/          # The demo app (React + Vite)
│   │   └── src/
│   │       ├── pages/    # One file per demo page (9 pages)
│   │       ├── context/  # DemoContext — shared stateful demo flow
│   │       └── components/  # Layout, sidebar
│   ├── api-server/       # Express API server (workspace scaffolding)
│   └── mockup-sandbox/   # Component preview server (workspace tooling)
├── lib/                  # Shared TypeScript libraries
├── scripts/              # Utility scripts
├── pnpm-workspace.yaml   # Workspace config + catalog pins
├── tsconfig.base.json    # Shared strict TS config
└── tsconfig.json         # Solution file (libs only)
```

---

## Getting started

### Prerequisites

- Node.js 24+
- pnpm 9+

### Install

```bash
pnpm install
```

### Run the demo app

```bash
pnpm --filter @workspace/cockpit run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run the API server (optional)

```bash
pnpm --filter @workspace/api-server run dev
```

### Typecheck everything

```bash
pnpm run typecheck
```

---

## Demo flow

The demo uses a shared `DemoContext` with four states:

```
initial → ran_initial → feedback_submitted → reran
```

1. **Run Agent page** — click "Run Initial Agent" → transitions to `ran_initial`
2. **Human Review page** — click "Submit Feedback" → transitions to `feedback_submitted`
3. **Run Agent page** — "Rerun After Feedback" button unlocks → click → transitions to `reran`
4. All other pages (Trace Viewer, Evidence Map, Learning Log, Evaluation, etc.) react to the current state

Click **Reset Demo** on the Run Agent page to return to `initial`.

---

## Audience variations

| Audience | Focus |
|----------|-------|
| C-Suite / CFO | Business Impact → Evaluation Dashboard → skip Architecture |
| Audit Leaders | Evidence Map → Learning Log → Audit Trail metric |
| Compliance Officers | Trace Viewer → Architecture governance layers |
| Technical | Trace Viewer (tool calls, confidence scores, IF-THEN rule syntax) |
| 5-minute version | Run Agent → Trace Viewer → Human Review → Rerun → Metrics |

---

## Key talking points

1. **"Traceability is the foundation."** — Trace Viewer shows what it did. Evidence Map shows where it got information.
2. **"Explainability is proof."** — We don't just say High Risk. We explain why.
3. **"Review is control."** — The human decides. The agent suggests.
4. **"Learning is improvement."** — Each correction becomes a rule for future cases.
5. **"Metrics are accountability."** — We measure. We improve. We report.

---

## License

Internal demo — not for public distribution.
