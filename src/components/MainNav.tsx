
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/admin"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        to="/admin/posts"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Posts
      </Link>
      <Link
        to="/admin/media"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Media
      </Link>
      <Link
        to="/admin/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}