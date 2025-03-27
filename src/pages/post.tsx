
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

// Using the same mock data - in a real app, this would come from an API
const posts = [
  {
    id: '1',
    title: 'Getting Started with React',
    excerpt: 'Learn the basics of React and how to build your first component.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80',
    categoryId: '1',
    category: { name: 'React', slug: 'react' },
    createdAt: '2024-02-19T12:00:00Z',
    content: `
      React is a popular JavaScript library for building user interfaces. In this guide, we'll cover the fundamentals and help you create your first component.

      ## Prerequisites
      Before we begin, make sure you have Node.js installed on your machine.

      ## Creating Your First Component
      Let's start by creating a simple component:

      \`\`\`jsx
      function Welcome({ name }) {
        return <h1>Hello, {name}!</h1>;
      }
      \`\`\`

      ## Understanding Props
      Props are read-only properties that are passed to components. They help make your components reusable.

      ## State Management
      React components can have state, which allows them to keep track of changing data.
    `,
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    excerpt: 'Explore advanced TypeScript patterns and best practices.',
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
    categoryId: '2',
    category: { name: 'TypeScript', slug: 'typescript' },
    createdAt: '2024-02-18T12:00:00Z',
    content: 'Full TypeScript patterns article content here...',
  },
]

export function Post() {
  const { id } = useParams()
  const navigate = useNavigate()
  const post = posts.find(p => p.id === id)

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <header className="mb-8">
        <div className="flex items-center gap-3 text-sm mb-4">
          <span 
            onClick={() => navigate(`/category/${post.category.slug}`)}
            className="text-primary hover:text-primary/80 transition-colors cursor-pointer"
          >
            {post.category.name}
          </span>
          <span className="text-muted-foreground">
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
            }).format(new Date(post.createdAt))}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-muted-foreground">{post.excerpt}</p>
      </header>

      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-lg mb-8"
      />

      <div className="prose prose-invert max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}