import { useDemo } from "@/context/DemoContext";
import { AlertTriangle, CheckCircle2, Loader2, RotateCcw, Play, RefreshCw, FileText, ShoppingCart, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RunAgent() {
  const { state, runInitialAgent, rerunAgent, resetDemo, isRunning } = useDemo();

  const hasRan = state === "ran_initial" || state === "feedback_submitted" || state === "reran";
  const hasReran = state === "reran";
  const canRerun = state === "feedback_submitted";

  const initialResult = {
    risk: "Medium Risk",
    riskColor: "text-amber-600 bg-amber-50 border-amber-200",
    dotColor: "bg-amber-500",
    confidence: 68,
    reason: "Invoice amount exceeds PO value. Unable to determine severity without additional policy context.",
  };

  const rerunResult = {
    risk: "High Risk",
    riskColor: "text-red-600 bg-red-50 border-red-200",
    dotColor: "bg-red-500",
    confidence: 91,
    reason: "Policy violation confirmed: Invoice exceeds PO by ₹1,60,000 AND delivery proof is missing. Both conditions met under Rule R-004: mandatory High Risk classification.",
  };

  const result = hasReran ? rerunResult : initialResult;

  return (
    <div className="px-8 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Section 2 · The Problem</span>
            <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1">Run Agent</h1>
            <p className="mt-1 text-muted-foreground text-sm">Submit an audit case and observe agent classification behavior.</p>
          </div>
          <button
            onClick={resetDemo}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-muted-foreground border border-border rounded-md hover:bg-muted/50 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Demo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Case panel */}
        <div className="col-span-3 space-y-5">
          <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
            <div className="px-5 py-3.5 border-b border-border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Case #AUD-2024-0891</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Vendor Invoice Review</span>
            </div>
            <div className="p-5 space-y-4">
              {/* Invoice */}
              <div className="flex items-start gap-3 p-3.5 rounded-lg border border-amber-100 bg-amber-50/50">
                <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-amber-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-semibold text-amber-800">Invoice · INV-7782</p>
                    <p className="text-xs text-amber-600 font-mono">Vendor: Apex Logistics Pvt Ltd</p>
                  </div>
                  <p className="text-lg font-bold text-amber-900">₹14,10,000</p>
                  <p className="text-xs text-amber-700 mt-0.5">Date: 14 Nov 2024 · Terms: Net 30</p>
                </div>
              </div>

              {/* PO */}
              <div className="flex items-start gap-3 p-3.5 rounded-lg border border-blue-100 bg-blue-50/50">
                <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-4 h-4 text-blue-700" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-semibold text-blue-800">Purchase Order · PO-9912</p>
                    <p className="text-xs text-blue-600 font-mono">Approved: Procurement Head</p>
                  </div>
                  <p className="text-lg font-bold text-blue-900">₹12,50,000</p>
                  <p className="text-xs text-blue-700 mt-0.5">Date: 02 Nov 2024 · Dept: Operations</p>
                </div>
              </div>

              {/* Discrepancy */}
              <div className="flex items-center gap-3 p-3.5 rounded-lg border border-red-100 bg-red-50/50">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-red-800">Invoice exceeds PO by ₹1,60,000 (12.8%)</p>
                  <p className="text-xs text-red-600 mt-0.5">No approved amendment on file</p>
                </div>
              </div>

              {/* Delivery proof */}
              <div className="flex items-center gap-3 p-3.5 rounded-lg border border-gray-200 bg-gray-50">
                <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-600">Delivery Proof</p>
                  <p className="text-xs text-red-500 mt-0.5 font-medium">Missing — GRN not submitted</p>
                </div>
              </div>

              {/* Policy rule */}
              <div className="p-3.5 rounded-lg border border-border bg-muted/20">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Active Policy Rule</p>
                <p className="text-xs text-foreground font-medium">
                  Any invoice exceeding the approved PO value, or lacking delivery confirmation, must be flagged as HIGH RISK and routed for CFO review.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Output panel */}
        <div className="col-span-2 space-y-4">
          {/* Action buttons */}
          <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border bg-muted/30">
              <p className="text-sm font-semibold text-foreground">Agent Actions</p>
            </div>
            <div className="p-5 space-y-3">
              {!hasRan && (
                <button
                  onClick={runInitialAgent}
                  disabled={isRunning}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {isRunning ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Running Agent...</>
                  ) : (
                    <><Play className="w-4 h-4" /> Run Initial Agent</>
                  )}
                </button>
              )}

              {hasRan && !hasReran && (
                <>
                  <div className="flex items-center gap-2 p-2.5 rounded border border-emerald-200 bg-emerald-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <p className="text-xs text-emerald-700 font-medium">Initial run complete</p>
                  </div>
                  <button
                    onClick={rerunAgent}
                    disabled={!canRerun || isRunning}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-md transition-colors",
                      canRerun
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                    )}
                  >
                    {isRunning ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Rerunning...</>
                    ) : (
                      <><RefreshCw className="w-4 h-4" /> Rerun After Feedback</>
                    )}
                  </button>
                  {!canRerun && (
                    <p className="text-[10px] text-muted-foreground text-center">Submit feedback in Human Review first</p>
                  )}
                </>
              )}

              {hasReran && (
                <div className="flex items-center gap-2 p-2.5 rounded border border-emerald-200 bg-emerald-50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <p className="text-xs text-emerald-700 font-medium">Rerun complete with learned rules</p>
                </div>
              )}
            </div>
          </div>

          {/* Result */}
          {hasRan && !isRunning && (
            <div className={cn("border rounded-lg bg-card shadow-sm overflow-hidden transition-all")}>
              <div className="px-5 py-3.5 border-b border-border bg-muted/30 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Agent Output</p>
                {hasReran && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">With Learned Rules</span>
                )}
              </div>
              <div className="p-5 space-y-4">
                {/* Risk badge */}
                <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold", result.riskColor)}>
                  <div className={cn("w-2 h-2 rounded-full", result.dotColor)}></div>
                  {result.risk}
                </div>

                {/* Confidence */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-medium text-muted-foreground">Confidence Score</p>
                    <p className={cn("text-sm font-bold", hasReran ? "text-emerald-600" : "text-amber-600")}>
                      {result.confidence}%
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-1000", hasReran ? "bg-emerald-500" : "bg-amber-400")}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  {!hasReran && (
                    <p className="text-[10px] text-amber-600 mt-1">Low confidence — agent uncertain about weighting</p>
                  )}
                </div>

                {/* Reason */}
                <div className="p-3 rounded-lg bg-muted/40 border border-border">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Agent Reasoning</p>
                  <p className="text-xs text-foreground leading-relaxed">{result.reason}</p>
                </div>

                {hasReran && (
                  <div className="flex items-start gap-2 p-2.5 rounded border border-blue-200 bg-blue-50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700">Rule R-004 applied from Learning Log</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {isRunning && (
            <div className="border border-border rounded-lg bg-card shadow-sm p-8 flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground">Processing case data...</p>
              <div className="w-full space-y-1.5">
                {["Extracting invoice data", "Retrieving PO record", "Comparing values", "Checking evidence"].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                    <p className="text-xs text-muted-foreground">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
