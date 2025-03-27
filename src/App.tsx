
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home';
import Dashboard from './pages/admin/dashboard';
import PostEditor from './pages/admin/post-editor';
import MediaLibrary from './pages/admin/media-library';
import Layout from './components/layout';
import { BlogPost } from './pages/blog-post';
import { AdminPage } from './pages/admin';
import { CategoryPage } from './pages/category';
import { SearchPage } from './pages/search';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Blog routes */}
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/posts/new" element={<PostEditor />} />
            <Route path="/admin/media" element={<MediaLibrary />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}