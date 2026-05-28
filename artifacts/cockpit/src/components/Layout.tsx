import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Play,
  GitBranch,
  FileSearch,
  UserCheck,
  BookOpen,
  BarChart3,
  TrendingUp,
  Network,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Overview", icon: LayoutDashboard, step: "1" },
  { path: "/run-agent", label: "Run Agent", icon: Play, step: "2" },
  { path: "/trace-viewer", label: "Trace Viewer", icon: GitBranch, step: "3" },
  { path: "/evidence-map", label: "Evidence Map", icon: FileSearch, step: "4" },
  { path: "/human-review", label: "Human Review", icon: UserCheck, step: "5" },
  { path: "/learning-log", label: "Learning Log", icon: BookOpen, step: "6" },
  { path: "/evaluation", label: "Evaluation Dashboard", icon: BarChart3, step: "7" },
  { path: "/business-impact", label: "Business Impact", icon: TrendingUp, step: "8" },
  { path: "/architecture", label: "Architecture", icon: Network, step: "9" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
                <circle cx="7" cy="7" r="2" fill="white" />
                <line x1="7" y1="1" x2="7" y2="3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="7" y1="11" x2="7" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="1" y1="7" x2="3" y2="7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="11" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-sidebar-foreground tracking-wider uppercase">AI Agent</p>
              <p className="text-[10px] text-muted-foreground leading-none">Reliability Cockpit</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Demo Flow</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-2 rounded text-[13px] font-medium transition-colors cursor-pointer",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <span className={cn(
                  "w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0",
                  isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  {item.step}
                </span>
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-sidebar-border">
          <p className="text-[10px] text-muted-foreground">Boardroom Demo · v1.0</p>
          <p className="text-[10px] text-muted-foreground">Audit & Compliance Use Case</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
