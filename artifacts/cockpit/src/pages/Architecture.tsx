import { User, Bot, Eye, BookOpen, BarChart3, Shield, CheckCircle2, ArrowDown } from "lucide-react";

const layers = [
  {
    icon: User,
    title: "User / Auditor",
    description: "Submits case data for review",
    color: "bg-slate-50 border-slate-200 text-slate-700",
    iconBg: "bg-slate-100",
  },
  {
    icon: Bot,
    title: "AI Agent Layer",
    description: "Analyzes case using tools: InvoiceExtractor, PORetriever, EvidenceChecker, RiskClassifier",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconBg: "bg-blue-100",
  },
  {
    icon: Eye,
    title: "Transparency Layer",
    description: "Trace Viewer records every step · Evidence Map grounds every claim",
    color: "bg-violet-50 border-violet-200 text-violet-700",
    iconBg: "bg-violet-100",
  },
  {
    icon: User,
    title: "Human Review Layer",
    description: "Expert reviews output · Has veto power · Provides correction with rationale",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconBg: "bg-amber-100",
  },
  {
    icon: BookOpen,
    title: "Learning Layer",
    description: "Correction becomes a permanent IF-THEN rule · Applies to all future cases immediately",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    iconBg: "bg-emerald-100",
  },
  {
    icon: BarChart3,
    title: "Evaluation Layer",
    description: "Metrics tracked over time · Accuracy, evidence detection, throughput, audit completeness",
    color: "bg-rose-50 border-rose-200 text-rose-700",
    iconBg: "bg-rose-100",
  },
];

const principles = [
  { icon: CheckCircle2, text: "Every decision is traceable", color: "text-blue-600" },
  { icon: CheckCircle2, text: "Human has final authority", color: "text-amber-600" },
  { icon: CheckCircle2, text: "Every correction improves the system", color: "text-emerald-600" },
  { icon: CheckCircle2, text: "Every metric is visible", color: "text-violet-600" },
  { icon: CheckCircle2, text: "No black boxes anywhere", color: "text-foreground" },
  { icon: CheckCircle2, text: "Fully auditable at all times", color: "text-rose-600" },
];

export default function Architecture() {
  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Section 9 · The Operating Model</span>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1">Architecture</h1>
        <p className="mt-1 text-muted-foreground text-sm">This isn't a black box. This is a managed operating model — with full human control and audit trails at every layer.</p>
      </div>

      <div className="grid grid-cols-5 gap-8">
        {/* Architecture diagram */}
        <div className="col-span-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">System Layers</h2>
          <div className="space-y-2">
            {layers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <div key={layer.title}>
                  <div className={`border rounded-lg p-4 flex items-start gap-3 ${layer.color}`}>
                    <div className={`w-8 h-8 rounded-lg ${layer.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-0.5">{layer.title}</p>
                      <p className="text-xs opacity-75 leading-relaxed">{layer.description}</p>
                    </div>
                    <div className="ml-auto flex-shrink-0">
                      <span className="text-[10px] font-bold opacity-50">{i + 1}</span>
                    </div>
                  </div>
                  {i < layers.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Feedback loop */}
          <div className="mt-3 p-3 rounded-lg border border-primary/20 bg-primary/5 text-center">
            <p className="text-xs font-semibold text-primary">↑ Feedback loop: Corrections flow back to the Agent Layer as rules</p>
          </div>
        </div>

        {/* Right panel */}
        <div className="col-span-2 space-y-6">
          {/* Governance principles */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Governance Principles</h2>
            <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {principles.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.text} className="px-4 py-3 flex items-center gap-2.5">
                      <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", p.color)} />
                      <p className="text-xs text-foreground font-medium">{p.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* What it's not */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Design Philosophy</h2>
            <div className="space-y-2">
              {[
                { wrong: "Autonomous AI decision-making", right: "AI-assisted human decisions" },
                { wrong: "Replace human auditors", right: "Augment human judgment" },
                { wrong: "Trust AI blindly", right: "Verify every claim" },
                { wrong: "Hope it improves", right: "Measure and prove improvement" },
              ].map((item) => (
                <div key={item.wrong} className="border border-border rounded-lg bg-card p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-bold text-red-500 uppercase">Not</span>
                    <p className="text-[11px] text-muted-foreground line-through">{item.wrong}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    <p className="text-[11px] font-semibold text-foreground">{item.right}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scalability */}
          <div className="border border-border rounded-lg bg-card shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Scalability</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Skills are domain-independent. Rules are configurable. The feedback mechanism is reusable. The governance layer is portable.
            </p>
            <p className="text-xs font-semibold text-primary mt-2">Build once. Deploy across clients.</p>
          </div>
        </div>
      </div>

      {/* Closing statement */}
      <div className="mt-8 border border-border rounded-lg bg-muted/20 p-6">
        <p className="text-sm font-medium text-foreground leading-relaxed">
          "The future of enterprise work isn't about replacing humans with AI. It's about giving humans better tools. Faster analysis. Stronger evidence. Better visibility. Measurable improvement."
        </p>
        <p className="text-sm font-bold text-foreground mt-3">
          "That's what this represents: <span className="text-primary">controlled</span>, <span className="text-primary">traceable</span>, <span className="text-primary">auditable</span>, <span className="text-primary">improving</span> digital work."
        </p>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
