
import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'

export function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between h-14">
        <nav className="flex gap-6">
          <Link to="/" className="font-medium">Home</Link>
          <Link to="/admin" className="font-medium">Admin</Link>
        </nav>
        <ModeToggle />
      </div>
    </header>
  )
}