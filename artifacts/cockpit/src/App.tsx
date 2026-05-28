import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DemoProvider } from "@/context/DemoContext";
import Layout from "@/components/Layout";
import Overview from "@/pages/Overview";
import RunAgent from "@/pages/RunAgent";
import TraceViewer from "@/pages/TraceViewer";
import EvidenceMap from "@/pages/EvidenceMap";
import HumanReview from "@/pages/HumanReview";
import LearningLog from "@/pages/LearningLog";
import Evaluation from "@/pages/Evaluation";
import BusinessImpact from "@/pages/BusinessImpact";
import Architecture from "@/pages/Architecture";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Overview} />
        <Route path="/run-agent" component={RunAgent} />
        <Route path="/trace-viewer" component={TraceViewer} />
        <Route path="/evidence-map" component={EvidenceMap} />
        <Route path="/human-review" component={HumanReview} />
        <Route path="/learning-log" component={LearningLog} />
        <Route path="/evaluation" component={Evaluation} />
        <Route path="/business-impact" component={BusinessImpact} />
        <Route path="/architecture" component={Architecture} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DemoProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </DemoProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
