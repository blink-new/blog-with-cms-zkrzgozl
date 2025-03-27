
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Navigation } from './components/navigation'
import { Footer } from './components/footer'
import { Home } from './pages/home'
import { Post } from './pages/post'
import { Admin } from './pages/admin'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="blog-theme">
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}