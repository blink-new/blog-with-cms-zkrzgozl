
import { Outlet } from "react-router-dom"
import { Navigation } from "./navigation"
import { Footer } from "./footer"

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}