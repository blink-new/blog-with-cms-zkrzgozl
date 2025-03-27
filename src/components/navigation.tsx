
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export function Navigation() {
  return (
    <nav className="border-b">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            Blog
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/search" className="text-sm hover:text-primary transition-colors">
              Search
            </Link>
            <Link to="/category" className="text-sm hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/tags" className="text-sm hover:text-primary transition-colors">
              Tags
            </Link>
            <Link to="/authors" className="text-sm hover:text-primary transition-colors">
              Authors
            </Link>
            <Link to="/newsletter" className="text-sm hover:text-primary transition-colors">
              Newsletter
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}