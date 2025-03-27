
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-muted-foreground/10">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Blog. All rights reserved.
          </div>
          <nav className="flex items-center gap-6">
            <Link 
              to="/privacy-policy" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}