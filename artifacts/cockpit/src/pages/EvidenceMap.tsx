import { CheckCircle2, XCircle, AlertCircle, FileText, ShoppingCart, Package, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const evidenceItems = [
  {
    claim: "Invoice amount is ₹14,10,000",
    status: "supported" as const,
    source: "INV-7782",
    sourceType: "Invoice Document",
    icon: FileText,
    sourceDetail: "Page 1, Line 12 — Total Amount Due",
    confidence: 97,
    excerpt: "TOTAL AMOUNT DUE: INR 14,10,000/- (Rupees Fourteen Lakhs Ten Thousand Only)",
  },
  {
    claim: "Approved PO value is ₹12,50,000",
    status: "supported" as const,
    source: "PO-9912",
    sourceType: "Purchase Order",
    icon: ShoppingCart,
    sourceDetail: "Procurement System Record — Approved 02 Nov 2024",
    confidence: 96,
    excerpt: "Approved Order Value: INR 12,50,000. Status: Approved. Authorized By: VP Procurement.",
  },
  {
    claim: "Delivery proof (GRN) exists",
    status: "missing" as const,
    source: "—",
    sourceType: "Goods Receipt Note",
    icon: Package,
    sourceDetail: "Searched: WMS, Document Repository, Email Archive",
    confidence: 94,
    excerpt: "No goods receipt note found for this vendor and invoice period. Three systems searched.",
  },
  {
    claim: "Vendor is on approved vendor list",
    status: "supported" as const,
    source: "VendorDB",
    sourceType: "Vendor Registry",
    icon: Building2,
    sourceDetail: "Vendor ID: APX-2019-004 — Active since 2019",
    confidence: 99,
    excerpt: "Apex Logistics Pvt Ltd — Status: Active. Risk Rating: Low. Last audit: Mar 2024.",
  },
];

const statusConfig = {
  supported: {
    icon: CheckCircle2,
    label: "Evidence Supported",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
    badgeBg: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  missing: {
    icon: XCircle,
    label: "Evidence Missing",
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    badgeBg: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  partial: {
    icon: AlertCircle,
    label: "Partial Evidence",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    badgeBg: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
};

export default function EvidenceMap() {
  const supported = evidenceItems.filter(e => e.status === "supported").length;
  const missing = evidenceItems.filter(e => e.status === "missing").length;

  return (
    <div className="px-8 py-8 max-w-4xl">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Section 4 · Grounding</span>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1">Evidence Map</h1>
        <p className="mt-1 text-muted-foreground text-sm">Every claim the agent made is grounded to a source. Missing evidence is explicitly called out — no hallucinations.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-emerald-200 rounded-lg p-4 bg-emerald-50">
          <p className="text-2xl font-bold text-emerald-700">{supported}</p>
          <p className="text-xs font-semibold text-emerald-600 mt-0.5">Claims Supported</p>
          <p className="text-xs text-emerald-500">Grounded to source documents</p>
        </div>
        <div className="border border-red-200 rounded-lg p-4 bg-red-50">
          <p className="text-2xl font-bold text-red-700">{missing}</p>
          <p className="text-xs font-semibold text-red-600 mt-0.5">Evidence Missing</p>
          <p className="text-xs text-red-500">Explicitly flagged — not ignored</p>
        </div>
        <div className="border border-border rounded-lg p-4 bg-card">
          <p className="text-2xl font-bold text-foreground">0</p>
          <p className="text-xs font-semibold text-foreground mt-0.5">Hallucinations</p>
          <p className="text-xs text-muted-foreground">All claims verifiable</p>
        </div>
      </div>

      {/* Principle callout */}
      <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 mb-6">
        <p className="text-xs font-semibold text-primary mb-1">Grounding Principle</p>
        <p className="text-xs text-foreground leading-relaxed">
          The agent cannot assert a fact without citing a source. If no source exists, the evidence field is marked Missing and the claim confidence is automatically reduced. This eliminates silent hallucinations.
        </p>
      </div>

      {/* Evidence items */}
      <div className="space-y-4">
        {evidenceItems.map((item) => {
          const config = statusConfig[item.status];
          const StatusIcon = config.icon;
          const ItemIcon = item.icon;

          return (
            <div key={item.claim} className={cn("border rounded-lg overflow-hidden bg-card shadow-sm", item.status === "missing" ? "border-red-200" : "border-border")}>
              {/* Claim header */}
              <div className={cn("px-5 py-3 flex items-start gap-3 border-b", item.status === "missing" ? "border-red-200 bg-red-50/30" : "border-border bg-muted/20")}>
                <StatusIcon className={cn("w-4.5 h-4.5 flex-shrink-0 mt-0.5", config.color)} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.claim}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", config.badgeBg)}>
                    {config.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.confidence}% conf.</span>
                </div>
              </div>

              {/* Evidence detail */}
              <div className="px-5 py-3.5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Source</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-muted flex items-center justify-center flex-shrink-0">
                      <ItemIcon className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div>
                      <p className={cn("text-xs font-semibold", item.status === "missing" ? "text-red-600" : "text-primary")}>{item.source}</p>
                      <p className="text-[10px] text-muted-foreground">{item.sourceType}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">{item.sourceDetail}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                    {item.status === "missing" ? "Search Result" : "Extracted Text"}
                  </p>
                  <div className={cn("rounded p-2.5 border text-[11px] font-mono leading-relaxed", item.status === "missing" ? "bg-red-50 border-red-100 text-red-700" : "bg-muted/40 border-border text-muted-foreground")}>
                    {item.excerpt}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust note */}
      <div className="mt-6 p-4 rounded-lg border border-border bg-muted/30 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Why this matters:</span> The missing delivery proof is not buried in a log — it is explicitly surfaced as a critical evidence gap. Human reviewers immediately see what the agent could not confirm, enabling faster, more informed decisions.
        </p>
      </div>
    </div>
  );
}
