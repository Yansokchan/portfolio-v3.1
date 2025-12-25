import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import SplashScreen from "./components/SplashScreen";
import { isBot } from "@/lib/seo";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  // If it's a bot, skip loading (splash screen)
  const [isLoading, setIsLoading] = useState(!isBot());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="fixed inset-0 z-[1000] pointer-events-none h-screen w-screen">
          {/* <Ribbons
            baseThickness={20}
            colors={["#60A5FA"]}
            speedMultiplier={0.8}
            maxAge={200}
            enableFade={true}
            enableShaderEffect={true}
            baseSpring={0.08}
            baseFriction={0.8}
            pointCount={25}
          /> */}
        </div>
        <BrowserRouter>
          <div className="relative">
            {isLoading ? (
              <SplashScreen onComplete={() => setIsLoading(false)} />
            ) : (
              <Routes>
                <Route path="/" element={<Index />} />
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
