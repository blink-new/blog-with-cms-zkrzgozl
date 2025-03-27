
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, LayoutDashboard, FileText, Image, FolderTree } from 'lucide-react'
import { Button } from '../ui/button'
import { ModeToggle } from '../mode-toggle'

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Posts', href: '/admin/post-editor', icon: FileText },
    { name: 'Media', href: '/admin/media-library', icon: Image },
    { name: 'Categories', href: '/admin/category-manager', icon: FolderTree },
  ]

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 glass-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 glass-card border-r border-white/20
      `}>
        <div className="flex h-16 items-center justify-between px-4 py-5">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CMS Admin
          </h1>
          <ModeToggle />
        </div>
        <nav className="mt-5 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'glass bg-white/20 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  )
}