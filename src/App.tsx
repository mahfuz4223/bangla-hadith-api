import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HomePage } from "./components/HomePage";
import { ApiDocumentation } from "./components/ApiDocumentation";
import { AboutPage } from "./components/AboutPage";
import { HadithReader } from "./components/HadithReader";
import { FavoritesPage } from "./components/FavoritesPage";
import { SearchPage } from "./components/SearchPage";
import { SettingsPage } from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />}>
                <Route index element={<HomePage />} />
                <Route path="api" element={<ApiDocumentation />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="read" element={<HadithReader />} />
                <Route path="read/:bookSlug/:hadithNumber" element={<HadithReader />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
