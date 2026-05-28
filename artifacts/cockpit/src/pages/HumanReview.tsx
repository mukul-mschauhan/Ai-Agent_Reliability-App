import { useDemo } from "@/context/DemoContext";
import { CheckCircle2, Loader2, AlertTriangle, UserCheck, BookOpen } from "lucide-react";

export default function HumanReview() {
  const { state, submitFeedback, isSubmitting } = useDemo();
  const hasFeedback = state === "feedback_submitted" || state === "reran";

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Section 5 · Human Correction</span>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1">Human Review</h1>
        <p className="mt-1 text-muted-foreground text-sm">The expert reviews the agent output and provides a correction that becomes a permanent rule.</p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Context panel */}
        <div className="col-span-2 space-y-4">
          {/* Agent output summary */}
          <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <p className="text-sm font-semibold text-foreground">Agent Suggested</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <span className="text-sm font-bold text-amber-600">Medium Risk</span>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Confidence</span>
                  <span className="text-xs font-semibold text-amber-600">68%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: "68%" }} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Invoice exceeds PO. Unable to determine combined severity.
              </p>
            </div>
          </div>

          {/* Expert context */}
          <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Reviewer</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">SR</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Shreya Reddy</p>
                  <p className="text-xs text-muted-foreground">Senior Audit Manager</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">12 years audit experience · CFO Advisory practice</p>
            </div>
          </div>

          {/* Case flags */}
          <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <p className="text-sm font-semibold text-foreground">Active Flags</p>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs text-foreground">Invoice over PO by ₹1,60,000</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs text-foreground">Delivery proof (GRN) missing</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs text-foreground">No approved PO amendment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Correction form */}
        <div className="col-span-3">
          {!hasFeedback ? (
            <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-muted/30">
                <p className="text-sm font-semibold text-foreground">Expert Correction Form</p>
                <p className="text-xs text-muted-foreground mt-0.5">Review agent output and provide correction with rationale</p>
              </div>
              <div className="p-5 space-y-5">
                {/* Correct classification */}
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">Correct Risk Classification</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Low Risk", "Medium Risk", "High Risk"].map((r) => (
                      <div
                        key={r}
                        className={`px-3 py-2 rounded-md border text-xs font-semibold text-center cursor-default transition-colors ${
                          r === "High Risk"
                            ? "bg-red-50 border-red-300 text-red-700"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {r}
                        {r === "High Risk" && <span className="ml-1 text-[9px] bg-red-200 text-red-700 px-1 rounded">Selected</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expert reasoning */}
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">Expert Reasoning</label>
                  <div className="rounded-md border border-border bg-muted/20 p-3 text-xs text-foreground leading-relaxed">
                    "This should be HIGH RISK. Invoice exceeds PO by ₹1.6L AND delivery proof is missing. Both are policy violations under AP-07. Co-occurrence of these two conditions mandates automatic High Risk classification and CFO escalation."
                  </div>
                </div>

                {/* Suggested rule */}
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                    <BookOpen className="w-3.5 h-3.5 inline mr-1 text-primary" />
                    Suggested Rule for Learning
                  </label>
                  <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
                    <p className="text-xs font-mono text-foreground leading-relaxed">
                      <span className="text-primary font-bold">IF</span> invoice_amount {">"} po_amount{" "}
                      <span className="text-primary font-bold">AND</span> delivery_proof = MISSING{" "}
                      <span className="text-amber-600 font-bold">→</span>{" "}
                      <span className="font-bold">Classify: HIGH RISK</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1.5">Policy basis: AP-07 §3.2 — Dual violation threshold</p>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={submitFeedback}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4" /> Submit Feedback</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Success state */}
              <div className="border border-emerald-200 rounded-lg bg-emerald-50 p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <p className="text-base font-bold text-emerald-800 mb-1">Feedback Captured</p>
                <p className="text-sm text-emerald-700">New rule added to agent reliability layer.</p>
              </div>

              {/* Rule added */}
              <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border bg-muted/30 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Rule Added to Agent</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">Rule ID</span>
                    <span className="text-xs font-bold text-foreground font-mono">R-004</span>
                  </div>
                  <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
                    <p className="text-xs font-mono text-foreground leading-relaxed">
                      <span className="text-primary font-bold">IF</span> invoice_amount {">"} po_amount{" "}
                      <span className="text-primary font-bold">AND</span> delivery_proof = MISSING{" "}
                      <span className="text-amber-600 font-bold">→</span>{" "}
                      <span className="font-bold">Classify: HIGH RISK</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Added by</p>
                      <p className="font-medium text-foreground">Shreya Reddy</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Policy basis</p>
                      <p className="font-medium text-foreground">AP-07 §3.2</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Effective</p>
                      <p className="font-medium text-foreground">Immediately</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Scope</p>
                      <p className="font-medium text-foreground">All future cases</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50">
                <p className="text-xs text-blue-700 leading-relaxed">
                  <span className="font-semibold">Next step:</span> Return to Run Agent and click "Rerun After Feedback" to see the agent apply this rule automatically.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
