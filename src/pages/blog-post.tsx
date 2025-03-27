
import { useParams } from 'react-router-dom'

// Temporary mock data
const post = {
  id: '1',
  title: 'Getting Started with React',
  content: `
    React is a popular JavaScript library for building user interfaces. It was developed by Facebook and has become one of the most widely used frontend technologies.

    ## Why React?

    React makes it easy to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

    ## Key Concepts

    1. Components
    2. Props
    3. State
    4. Lifecycle Methods

    React's component-based architecture makes it easy to build reusable UI components that manage their own state.
  `,
  coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80',
  categoryId: '1',
  category: { name: 'React', slug: 'react' },
  createdAt: '2024-02-19T12:00:00Z',
}

export function BlogPost() {
  const { slug } = useParams()

  // In a real app, we would fetch the post based on the slug
  // const { data: post, isLoading } = useQuery(['post', slug], () => fetchPost(slug))

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <header className="space-y-4">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-primary">{post.category.name}</span>
            <span className="text-muted-foreground">•</span>
            <time className="text-sm text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </time>
          </div>
          <h1 className="text-4xl font-serif font-bold">{post.title}</h1>
        </div>
      </header>

      <div className="prose dark:prose-invert">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}