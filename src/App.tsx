
import { ThemeProvider } from "./components/theme-provider"
import { Navigation } from "./components/navigation"

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        {/* Your other app content */}
      </div>
    </ThemeProvider>
  )
}