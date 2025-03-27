
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider'
import { Layout } from './components/layout'
import { Home } from './pages/home'
import { BlogPost } from './pages/blog-post'
import { Search } from './pages/search'
import { Category } from './pages/category'
import { AdminLayout } from './components/admin/layout'
import { Dashboard } from './pages/admin/dashboard'
import { PostEditor } from './pages/admin/post-editor'
import { MediaLibrary } from './pages/admin/media-library'
import { CategoryManager } from './pages/admin/category-manager'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="blog-theme">
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="post/:slug" element={<BlogPost />} />
              <Route path="search" element={<Search />} />
              <Route path="category/:slug" element={<Category />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="posts/new" element={<PostEditor />} />
              <Route path="posts/:id/edit" element={<PostEditor />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="categories" element={<CategoryManager />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App