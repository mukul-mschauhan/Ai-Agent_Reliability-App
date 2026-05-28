import { CheckCircle2, AlertCircle, ChevronRight, Clock, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: 1,
    tool: "InvoiceExtractor",
    action: "Extract invoice amount",
    input: "Document: INV-7782.pdf",
    output: "₹14,10,000",
    confidence: 97,
    status: "success" as const,
    duration: "0.3s",
    detail: "Located amount field in structured invoice template. Cross-validated with total line items sum.",
  },
  {
    step: 2,
    tool: "PORetriever",
    action: "Retrieve approved PO value",
    input: "PO Reference: PO-9912",
    output: "₹12,50,000",
    confidence: 96,
    status: "success" as const,
    duration: "0.4s",
    detail: "Fetched from procurement system. PO status: Approved. Amendment count: 0.",
  },
  {
    step: 3,
    tool: "VarianceCalculator",
    action: "Compare invoice vs PO",
    input: "INV: ₹14,10,000 | PO: ₹12,50,000",
    output: "Variance: ₹1,60,000 (12.8% over)",
    confidence: 99,
    status: "success" as const,
    duration: "0.1s",
    detail: "Arithmetic comparison complete. Variance exceeds 10% threshold defined in audit policy AP-07.",
  },
  {
    step: 4,
    tool: "EvidenceChecker",
    action: "Verify delivery proof (GRN)",
    input: "Case #AUD-2024-0891",
    output: "GRN not found in system",
    confidence: 94,
    status: "warning" as const,
    duration: "0.5s",
    detail: "Searched warehouse management system and document repository. No goods receipt note on record for this invoice period.",
  },
  {
    step: 5,
    tool: "RiskClassifier",
    action: "Classify overall risk level",
    input: "Variance flag + missing GRN",
    output: "Medium Risk (68% confidence)",
    confidence: 68,
    status: "warning" as const,
    duration: "0.2s",
    detail: "Unable to determine combined severity of two co-occurring violations. Default weight model applied — may underestimate risk.",
  },
];

export default function TraceViewer() {
  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Section 3 · Transparency</span>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1">Trace Viewer</h1>
        <p className="mt-1 text-muted-foreground text-sm">Every step the agent took — no magic. Full audit trail of tool calls, inputs, outputs, and confidence scores.</p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Steps", value: "5", sub: "All completed" },
          { label: "Avg Confidence", value: "90.8%", sub: "Steps 1-4" },
          { label: "Final Confidence", value: "68%", sub: "Classification" },
          { label: "Total Duration", value: "1.5s", sub: "End-to-end" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-4 bg-card shadow-sm">
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs font-medium text-foreground mt-0.5">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Trace steps */}
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={step.step} className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
            {/* Step header */}
            <div className={cn(
              "px-5 py-3 flex items-center gap-3 border-b border-border",
              step.status === "warning" ? "bg-amber-50/50" : "bg-muted/20"
            )}>
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                step.status === "warning" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
              )}>
                {step.step}
              </div>
              <div className="flex-1 flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">{step.action}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">{step.tool}</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{step.duration}</span>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-semibold",
                  step.confidence >= 90 ? "text-emerald-600" : step.confidence >= 75 ? "text-amber-600" : "text-red-600"
                )}>
                  {step.confidence}%
                </div>
                {step.status === "warning"
                  ? <AlertCircle className="w-4 h-4 text-amber-500" />
                  : <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                }
              </div>
            </div>

            {/* Step body */}
            <div className="px-5 py-3.5 grid grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Input</p>
                <p className="text-xs text-foreground font-mono">{step.input}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Output</p>
                <p className={cn("text-xs font-semibold", step.status === "warning" ? "text-amber-700" : "text-emerald-700")}>
                  {step.output}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", step.confidence >= 90 ? "bg-emerald-500" : step.confidence >= 75 ? "bg-amber-400" : "bg-red-500")}
                      style={{ width: `${step.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-foreground w-8">{step.confidence}%</span>
                </div>
              </div>
              <div className="col-span-3 border-t border-border pt-2.5 mt-1">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Detail</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insight box */}
      <div className="mt-6 p-4 rounded-lg border border-amber-200 bg-amber-50">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800 mb-1">Key Insight</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              The agent correctly identified both violations (steps 3 and 4) with high confidence, but its risk classifier (step 5) lacked the rules to properly weight their combined severity. This is the gap human review addresses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
