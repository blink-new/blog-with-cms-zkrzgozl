
import { useState } from 'react'
import { Link } from 'react-router-dom'

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
    <div className="space-y-12">
      <section className="space-y-6">
        <h1 className="text-4xl font-serif font-bold">Latest Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-lg border p-4 space-y-4 transition-all hover:shadow-lg"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="space-y-2">
                <Link
                  to={`/category/${post.category.slug}`}
                  className="text-sm text-primary hover:underline"
                >
                  {post.category.name}
                </Link>
                <h2 className="text-2xl font-serif font-bold group-hover:text-primary">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <time className="text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </time>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}