import { TrendingUp, Shield, Clock, IndianRupee, Users, BarChart3 } from "lucide-react";

const impactCards = [
  {
    icon: Users,
    title: "Productivity",
    headline: "3× More Cases",
    description: "Same team handles three times the case volume with no additional headcount. Junior auditors handle more cases; seniors focus on exceptions.",
    color: "text-blue-700 bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    stat: "3×",
    statLabel: "Case throughput",
  },
  {
    icon: Shield,
    title: "Risk & Compliance",
    headline: "98% Audit Trail",
    description: "Better audit trail completeness. Fewer missed exceptions. Every decision is documented, traceable, and defensible — from first flag to final approval.",
    color: "text-violet-700 bg-violet-50 border-violet-200",
    iconBg: "bg-violet-100",
    stat: "98%",
    statLabel: "Trail completeness",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    headline: "Permanently Better",
    description: "Each correction makes the agent smarter. The system improves with every review cycle — no model retraining, no infrastructure cost, no waiting.",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    iconBg: "bg-emerald-100",
    stat: "+28pp",
    statLabel: "Accuracy gain",
  },
];

const financialRows = [
  { metric: "Cases reviewed per auditor per month", before: "80", after: "240", delta: "+200%" },
  { metric: "Average time per case", before: "35 min", after: "12 min", delta: "−66%" },
  { metric: "Cost per case (₹)", before: "₹1,950", after: "₹665", delta: "−66%" },
  { metric: "Savings per 1,000 cases", before: "—", after: "₹12.85 Lakhs", delta: "Net saving" },
  { metric: "Missed high-risk cases", before: "~12%", after: "~2%", delta: "−83%" },
  { metric: "Audit trail completeness", before: "65%", after: "98%", delta: "+51%" },
];

export default function BusinessImpact() {
  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Section 8 · Business Value</span>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1">Business Impact</h1>
        <p className="mt-1 text-muted-foreground text-sm">What this means for the business — in productivity, risk management, and financial terms.</p>
      </div>

      {/* Three impact cards */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {impactCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={`border rounded-lg p-5 ${card.color}`}>
              <div className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center mb-4`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">{card.title}</p>
              <p className="text-base font-bold mb-2">{card.headline}</p>
              <p className="text-xs leading-relaxed opacity-80 mb-4">{card.description}</p>
              <div className="pt-3 border-t border-current/20">
                <p className="text-2xl font-bold">{card.stat}</p>
                <p className="text-xs opacity-70">{card.statLabel}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Savings highlight */}
      <div className="border border-primary/20 rounded-lg bg-primary/5 p-5 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <IndianRupee className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">₹19+ Lakhs</p>
            <p className="text-sm text-muted-foreground">Saved per 1,000 cases processed</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">Based on 66% time reduction</p>
          <p className="text-xs text-muted-foreground">Average auditor cost: ₹800/hour</p>
          <p className="text-xs font-semibold text-primary mt-1">Conservative estimate</p>
        </div>
      </div>

      {/* Financial table */}
      <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-border bg-muted/30">
          <p className="text-sm font-semibold text-foreground">Financial Impact Summary</p>
          <p className="text-xs text-muted-foreground mt-0.5">Audit operations — before vs after AI-assisted review</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-5 py-2.5 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Metric</th>
                <th className="px-4 py-2.5 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Before</th>
                <th className="px-4 py-2.5 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">After</th>
                <th className="px-4 py-2.5 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {financialRows.map((row) => (
                <tr key={row.metric} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3 text-xs font-medium text-foreground">{row.metric}</td>
                  <td className="px-4 py-3 text-xs text-center text-muted-foreground">{row.before}</td>
                  <td className="px-4 py-3 text-xs text-center font-semibold text-foreground">{row.after}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      {row.delta}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote */}
      <div className="border border-border rounded-lg bg-muted/20 p-5">
        <p className="text-sm text-foreground font-medium leading-relaxed italic">
          "The value isn't just speed. It's <span className="font-bold not-italic text-primary">speed</span> plus <span className="font-bold not-italic text-primary">reliability</span> plus <span className="font-bold not-italic text-primary">governance</span> plus <span className="font-bold not-italic text-primary">measurable improvement</span>. Each correction makes the agent better. Permanently."
        </p>
        <div className="mt-3 flex items-center gap-2">
          <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">AI Agent Reliability Cockpit — Demo Summary</p>
        </div>
      </div>
    </div>
  );
}
