
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-20 -mt-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">
              Discover Insights in Technology and Development
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore the latest articles on web development, programming best practices, and tech insights.
            </p>
            <Link 
              to="/search" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              Browse all articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="container mx-auto px-4 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-serif font-bold">Latest Posts</h2>
          <Link 
            to="/search" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View all
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Link
                  to={`/category/${post.category.slug}`}
                  className="absolute top-4 left-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium hover:bg-background transition-colors"
                >
                  {post.category.name}
                </Link>
              </div>
              
              <div className="flex flex-col gap-3 p-6">
                <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <time className="text-sm text-muted-foreground mt-auto">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'long',
                  }).format(new Date(post.createdAt))}
                </time>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}