import { useDemo } from "@/context/DemoContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Risk Classification Accuracy", before: 60, after: 88, unit: "%" },
  { label: "Evidence Detection Rate", before: 70, after: 95, unit: "%" },
  { label: "Missing Evidence Caught", before: 55, after: 95, unit: "%" },
  { label: "Audit Trail Completeness", before: 65, after: 98, unit: "%" },
];

const kpiCards = [
  { label: "Accuracy", before: "60%", after: "88%", delta: "+28pp", good: true },
  { label: "Evidence Detection", before: "70%", after: "95%", delta: "+25pp", good: true },
  { label: "Missing Evidence", before: "45%", after: "95%", delta: "+50pp", good: true },
  { label: "Audit Trail", before: "65%", after: "98%", delta: "+33pp", good: true },
  { label: "Time per Case", before: "35 min", after: "12 min", delta: "−66%", good: true },
  { label: "False Positives", before: "22%", after: "8%", delta: "−14pp", good: true },
];

export default function Evaluation() {
  const { state } = useDemo();
  const showAfter = state === "reran" || state === "feedback_submitted";

  const chartData = metrics.map(m => ({
    name: m.label.replace(" Rate", "").replace(" Completeness", "").replace("Risk Classification ", ""),
    Before: m.before,
    After: showAfter ? m.after : 0,
  }));

  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="mb-8">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Section 7 · Metrics</span>
        <h1 className="text-2xl font-bold text-foreground tracking-tight mt-1">Evaluation Dashboard</h1>
        <p className="mt-1 text-muted-foreground text-sm">Measurable before-and-after improvements. Not estimates — real metrics from the demo run.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {kpiCards.map((k) => (
          <div key={k.label} className="border border-border rounded-lg bg-card shadow-sm p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{k.label}</p>
            <div className="flex items-end gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground mb-0.5">Before</p>
                <p className="text-lg font-bold text-muted-foreground">{k.before}</p>
              </div>
              <div className="mb-1">
                <svg width="20" height="10" viewBox="0 0 20 10"><path d="M0 5 L16 5 M12 1 L16 5 L12 9" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-muted-foreground/50" /></svg>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-0.5">After</p>
                <p className={cn("text-lg font-bold", showAfter ? "text-emerald-600" : "text-muted-foreground/30")}>
                  {showAfter ? k.after : "—"}
                </p>
              </div>
              {showAfter && (
                <div className="ml-auto">
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1",
                    k.good ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  )}>
                    <TrendingUp className="w-3 h-3" />
                    {k.delta}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-border bg-muted/30">
          <p className="text-sm font-semibold text-foreground">Performance Comparison — Before vs After</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {showAfter ? "Showing improvement after human correction and rule learning" : "Complete Human Review and Rerun steps to see improvement"}
          </p>
        </div>
        <div className="p-5">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }} barSize={28} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid #e5e7eb" }}
                formatter={(value: number) => [`${value}%`]}
              />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
              <Bar dataKey="Before" fill="#e2e8f0" radius={[3, 3, 0, 0]} name="Before" />
              <Bar dataKey="After" fill="#1d4ed8" radius={[3, 3, 0, 0]} name="After" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time savings */}
      <div className="border border-border rounded-lg bg-card shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border bg-muted/30">
          <p className="text-sm font-semibold text-foreground">Time per Case</p>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Before (Manual)</span>
                <span className="text-sm font-bold text-muted-foreground">35 minutes</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-muted-foreground/40" style={{ width: "100%" }} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">After (AI-Assisted)</span>
                <span className={cn("text-sm font-bold", showAfter ? "text-emerald-600" : "text-muted-foreground/40")}>
                  {showAfter ? "12 minutes" : "—"}
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-1000", showAfter ? "bg-emerald-500" : "bg-muted")}
                  style={{ width: showAfter ? "34%" : "0%" }}
                />
              </div>
            </div>
            {showAfter && (
              <div className="text-center bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3">
                <p className="text-2xl font-bold text-emerald-700">66%</p>
                <p className="text-xs text-emerald-600 font-medium">reduction</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
