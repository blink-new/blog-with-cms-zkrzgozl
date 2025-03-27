
import { Link } from 'react-router-dom'
import { Search, Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

export function Navigation() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold">
            Blog
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/search" className="hover:text-primary">
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="hover:text-primary"
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