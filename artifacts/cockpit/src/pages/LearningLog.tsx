import { useDemo } from "@/context/DemoContext";
import { BookOpen, Clock, User, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const existingRules = [
  {
    id: "R-001",
    rule: "IF vendor NOT on approved list → Classify: HIGH RISK",
    source: "Manual configuration",
    author: "System",
    date: "15 Jan 2024",
    triggeredCount: 23,
    policyBasis: "Procurement Policy §1.1",
    color: "border-border",
  },
  {
    id: "R-002",
    rule: "IF invoice_amount > po_amount BY more than 20% → Classify: HIGH RISK",
    source: "Feedback",
    author: "Amit Sharma",
    date: "03 Mar 2024",
    triggeredCount: 8,
    policyBasis: "AP-07 §2.1",
    color: "border-border",
  },
  {
    id: "R-003",
    rule: "IF duplicate_invoice = TRUE AND amount > ₹5,00,000 → Classify: HIGH RISK",
    source: "Feedback",
    author: "Priya Nair",
    date: "28 Apr 2024",
    triggeredCount: 4,
    policyBasis: "Internal Control IC-12",
    color: "border-border",
  },
];

export default function LearningLog() {
  const { state } = useDemo();
  const hasNewRule = state === "feedback_submitted" || state === "reran";

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Section 6 · Learning</span>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1">Learning Log</h1>
        <p className="mt-1 text-muted-foreground text-sm">Every correction becomes a permanent rule. The agent won't make the same mistake twice.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Rules", value: hasNewRule ? "4" : "3", color: "text-foreground" },
          { label: "From Feedback", value: hasNewRule ? "3" : "2", color: "text-primary" },
          { label: "Cases Impacted", value: hasNewRule ? "35+" : "35", color: "text-emerald-600" },
          { label: "Retraining Cost", value: "₹0", color: "text-foreground" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-4 bg-card shadow-sm">
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs font-medium text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Principle */}
      <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 mb-6">
        <div className="flex items-start gap-2">
          <BookOpen className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-primary mb-1">How Learning Works</p>
            <p className="text-xs text-foreground leading-relaxed">
              When an expert submits a correction, the feedback is parsed into an IF-THEN rule and added to the agent's reliability layer. Rules are version-controlled, attributed to their author, and effective immediately. No model retraining. No infrastructure changes. No waiting.
            </p>
          </div>
        </div>
      </div>

      {/* New rule — highlighted */}
      {hasNewRule && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Just Added</p>
          </div>
          <div className="border-2 border-emerald-300 rounded-lg bg-emerald-50/50 overflow-hidden shadow-sm">
            <div className="px-5 py-3 border-b border-emerald-200 bg-emerald-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-800">Rule R-004</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-700 font-semibold">NEW</span>
              </div>
              <span className="text-xs text-emerald-600 font-medium">From feedback · Just now</span>
            </div>
            <div className="p-5 space-y-3">
              <div className="rounded-md border border-primary/20 bg-white p-3">
                <p className="text-xs font-mono text-foreground leading-relaxed">
                  <span className="text-primary font-bold">IF</span> invoice_amount {">"} po_amount{" "}
                  <span className="text-primary font-bold">AND</span> delivery_proof = MISSING{" "}
                  <span className="text-amber-600 font-bold">→</span>{" "}
                  <span className="font-bold">Classify: HIGH RISK</span>
                </p>
              </div>
              <div className="grid grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Author</p>
                    <p className="font-semibold text-foreground">Shreya Reddy</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Added</p>
                    <p className="font-semibold text-foreground">Just now</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Policy</p>
                  <p className="font-semibold text-foreground">AP-07 §3.2</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Source</p>
                  <p className="font-semibold text-foreground">Human Feedback</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                This agent will never misclassify this pattern again.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Existing rules */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Prior Rules</p>
        <div className="space-y-3">
          {existingRules.map((rule) => (
            <div key={rule.id} className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground font-mono">{rule.id}</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded font-semibold",
                    rule.source === "Feedback" ? "bg-blue-100 text-blue-700" : "bg-muted text-muted-foreground"
                  )}>
                    {rule.source}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">Triggered {rule.triggeredCount}× since added</span>
              </div>
              <div className="px-5 py-3.5 space-y-2">
                <div className="rounded-md border border-border bg-muted/20 p-2.5">
                  <p className="text-xs font-mono text-foreground">{rule.rule}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{rule.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{rule.date}</span>
                  <span>{rule.policyBasis}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!hasNewRule && (
        <div className="mt-6 p-4 rounded-lg border border-amber-200 bg-amber-50 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">
            Complete the Human Review step to see a new rule added to this log in real-time.
          </p>
        </div>
      )}
    </div>
  );
}
