
import { Link, Outlet } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileEdit, 
  Image, 
  FolderTree,
  LogOut
} from 'lucide-react'

export function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/10">
        <div className="p-6">
          <Link to="/admin" className="text-2xl font-serif font-bold">
            Admin
          </Link>
        </div>
        <nav className="px-4 py-2 space-y-2">
          <Link
            to="/admin"
            className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-muted"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/posts/new"
            className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-muted"
          >
            <FileEdit className="h-5 w-5" />
            <span>New Post</span>
          </Link>
          <Link
            to="/admin/media"
            className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-muted"
          >
            <Image className="h-5 w-5" />
            <span>Media</span>
          </Link>
          <Link
            to="/admin/categories"
            className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-muted"
          >
            <FolderTree className="h-5 w-5" />
            <span>Categories</span>
          </Link>
          <hr className="my-4" />
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-muted w-full text-left text-red-500"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}