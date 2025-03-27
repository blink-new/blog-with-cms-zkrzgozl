
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Navigation } from './components/navigation'
import { Footer } from './components/footer'
import { Home } from './pages/home'
import { Post } from './pages/post'

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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}