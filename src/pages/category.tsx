
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

// Temporary mock data
const categories = {
  react: {
    name: 'React',
    description: 'All about React development',
    posts: [
      {
        id: '1',
        title: 'Getting Started with React',
        excerpt: 'Learn the basics of React and how to build your first component.',
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80',
        createdAt: '2024-02-19T12:00:00Z',
      },
      {
        id: '3',
        title: 'React Hooks in Depth',
        excerpt: 'Master React Hooks and functional components.',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
        createdAt: '2024-02-17T12:00:00Z',
      },
    ]
  },
  typescript: {
    name: 'TypeScript',
    description: 'TypeScript tutorials and best practices',
    posts: [
      {
        id: '2',
        title: 'Advanced TypeScript Patterns',
        excerpt: 'Explore advanced TypeScript patterns and best practices.',
        coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
        createdAt: '2024-02-18T12:00:00Z',
      }
    ]
  }
}

export function CategoryPage() {
  const { slug } = useParams()
  const category = slug ? categories[slug as keyof typeof categories] : null

  if (!category) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-serif font-bold">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.posts.map(post => (
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
    </div>
  )
}