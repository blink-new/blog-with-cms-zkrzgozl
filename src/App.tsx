
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home';
import Dashboard from './pages/admin/dashboard';
import PostEditor from './pages/admin/post-editor';
import MediaLibrary from './pages/admin/media-library';
import Layout from './components/layout';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/posts/new" element={<PostEditor />} />
            <Route path="/admin/media" element={<MediaLibrary />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}