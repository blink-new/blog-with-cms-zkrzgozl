
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Navigation } from "./components/navigation"

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </ThemeProvider>
  )
}