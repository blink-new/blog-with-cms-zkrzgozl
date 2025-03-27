
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { AdminLayout } from './components/admin/layout'
import Dashboard from './pages/admin/dashboard'
import PostEditor from './pages/admin/post-editor'
import MediaLibrary from './pages/admin/media-library'
import CategoryManager from './pages/admin/category-manager'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="post-editor" element={<PostEditor />} />
            <Route path="media-library" element={<MediaLibrary />} />
            <Route path="category-manager" element={<CategoryManager />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App