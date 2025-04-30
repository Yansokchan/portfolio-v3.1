import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import { Tracing } from "./components/ui/tracing";
import SplashScreen from "./components/SplashScreen";
import { useState } from "react";
import Ribbons from "./components/Ribbons";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="fixed inset-0 z-[-1] pointer-events-none h-screen w-screen">
          <Ribbons
            baseThickness={20}
            colors={["#60A5FA"]}
            speedMultiplier={0.8}
            maxAge={200}
            enableFade={true}
            enableShaderEffect={true}
            baseSpring={0.08}
            baseFriction={0.8}
            pointCount={25}
          />
        </div>
        <BrowserRouter>
          <div className="relative">
            {isLoading ? (
              <SplashScreen onComplete={() => setIsLoading(false)} />
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <Tracing className="fixed-tracing">
                      <Index />
                    </Tracing>
                  }
                />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
