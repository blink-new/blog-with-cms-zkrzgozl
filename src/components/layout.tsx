
import { Outlet } from 'react-router-dom'
import { Navigation } from './navigation'
import { Footer } from './footer'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}