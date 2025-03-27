
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input } from '../components/ui/input'

// Temporary mock data
const posts = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and how to build your first component.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80',
    categoryId: '1',
    category: { name: 'React', slug: 'react' },
    createdAt: '2024-02-19T12:00:00Z',
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Explore advanced TypeScript patterns and best practices.',
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
    categoryId: '2',
    category: { name: 'TypeScript', slug: 'typescript' },
    createdAt: '2024-02-18T12:00:00Z',
  },
]

export function Home() {
  const [featuredPosts] = useState(posts)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Search Section */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-background/50 border-muted-foreground/20 pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Recent Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
        <div className="space-y-6">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group relative border border-muted-foreground/10 rounded-lg p-6 transition-all duration-300 hover:bg-muted/50"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-sm">
                  <Link
                    to={`/category/${post.category.slug}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {post.category.name}
                  </Link>
                  <span className="text-muted-foreground">
                    {new Intl.DateTimeFormat('en-US', {
                      dateStyle: 'medium',
                    }).format(new Date(post.createdAt))}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="absolute inset-0 rounded-lg transition-colors duration-300 group-hover:ring-1 group-hover:ring-primary/20" />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}