
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Blog
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <Link to="/admin/dashboard" className="hover:text-primary">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}