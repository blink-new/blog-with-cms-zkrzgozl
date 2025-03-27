
import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

export function Navigation() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b border-muted-foreground/10">
      <div className="max-w-5xl mx-auto px-4">
        <nav className="flex items-center justify-between h-14">
          <Link 
            to="/" 
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            Blog
          </Link>

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 -mr-2 hover:text-primary rounded-md transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}