
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Navigation } from "./components/navigation"
import { Layout } from "./components/layout"
import HomePage from "./pages/home"
import BlogPost from "./pages/blog-post"
import CategoryPage from "./pages/category"
import SearchPage from "./pages/search"
import PostPage from "./pages/post"
import AdminPage from "./pages/admin"
import { AdminLayout } from "./components/admin/layout"
import Dashboard from "./pages/admin/dashboard"
import PostEditor from "./pages/admin/post-editor"
import CategoryManager from "./pages/admin/category-manager"
import MediaLibrary from "./pages/admin/media-library"

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/post/:slug" element={<PostPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="posts" element={<PostEditor />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="media" element={<MediaLibrary />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  )
}