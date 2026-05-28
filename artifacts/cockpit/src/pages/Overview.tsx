import { Shield, FileSearch, UserCheck, TrendingUp, ArrowRight, RefreshCw } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Traceability",
    subtitle: "Full audit trail",
    description: "Every agent action is logged step-by-step. No black boxes — you see exactly what the AI did, in what order, and with what confidence.",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: FileSearch,
    title: "Evidence Grounding",
    subtitle: "No hallucinations",
    description: "Every claim the agent makes is linked to a source document. Missing evidence is explicitly flagged, not silently ignored.",
    color: "bg-violet-50 text-violet-700 border-violet-100",
    iconBg: "bg-violet-100",
  },
  {
    icon: UserCheck,
    title: "Human Review",
    subtitle: "Human has final say",
    description: "The agent suggests. The human decides. Every high-risk output goes through expert review before action is taken.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    subtitle: "Gets better over time",
    description: "Each human correction becomes a permanent rule. The agent learns from every review without retraining or infrastructure changes.",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    iconBg: "bg-amber-100",
  },
];

const loopSteps = [
  { label: "Submit Case", desc: "Auditor uploads case data" },
  { label: "Agent Suggests", desc: "With trace & evidence" },
  { label: "Human Reviews", desc: "Expert has veto power" },
  { label: "Correction Captured", desc: "Becomes a learned rule" },
  { label: "Metrics Improve", desc: "Fully auditable" },
];

export default function Overview() {
  return (
    <div className="px-8 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">Section 1 · Opener</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Agent Reliability Cockpit</h1>
        <p className="mt-1.5 text-muted-foreground text-sm max-w-2xl">
          Moving beyond chatbots to controlled, traceable digital workers — with visibility, human review, and measurable improvement.
        </p>
      </div>

      {/* Key message */}
      <div className="bg-primary/5 border border-primary/15 rounded-lg px-5 py-4 mb-8">
        <p className="text-sm text-foreground font-medium leading-relaxed">
          "The secret isn't smarter AI. It's <span className="text-primary font-semibold">better visibility</span>, <span className="text-primary font-semibold">human review</span>, and <span className="text-primary font-semibold">measurable improvement</span>. Watch as the same agent gets smarter through feedback — without model retraining or expensive infrastructure."
        </p>
      </div>

      {/* Four pillars */}
      <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">The Four Pillars</h2>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className={`border rounded-lg p-5 ${p.color}`}>
              <div className={`w-9 h-9 rounded-lg ${p.iconBg} flex items-center justify-center mb-3`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <p className="font-semibold text-sm mb-0.5">{p.title}</p>
              <p className="text-xs font-medium opacity-70 mb-2">{p.subtitle}</p>
              <p className="text-xs leading-relaxed opacity-80">{p.description}</p>
            </div>
          );
        })}
      </div>

      {/* Improvement loop */}
      <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">The Improvement Loop</h2>
      <div className="border border-border rounded-lg p-6 bg-card">
        <div className="flex items-center gap-0">
          {loopSteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-2">
                  {i + 1}
                </div>
                <p className="text-xs font-semibold text-foreground w-20">{step.label}</p>
                <p className="text-[10px] text-muted-foreground w-20 mt-0.5">{step.desc}</p>
              </div>
              {i < loopSteps.length - 1 && (
                <div className="flex flex-col items-center px-2 mb-4">
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          {/* Loop arrow back */}
          <div className="flex items-center ml-2 mb-4">
            <div className="flex items-center gap-1 text-primary">
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold">Repeat</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">Each correction becomes a permanent rule</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-muted-foreground">No model retraining required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <span className="text-xs text-muted-foreground">Fully auditable at every step</span>
          </div>
        </div>
      </div>
    </div>
  );
}
