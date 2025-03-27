
import { Link } from 'react-router-dom'
import { Search, Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

export function Navigation() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-serif font-bold hover:text-primary transition-colors"
          >
            Blog
          </Link>

          <div className="flex items-center space-x-4">
            <Link 
              to="/search" 
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}